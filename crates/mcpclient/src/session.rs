use crate::errors::McpError;
use crate::transport::{ReadStream, WriteStream};
use crate::types::*;
use serde_json::{json, Value};
use std::collections::HashMap;
use std::sync::atomic::{AtomicU64, Ordering};
use std::sync::Arc;
use tokio::sync::{oneshot, Mutex};

pub struct Session {
    read_stream: Arc<Mutex<ReadStream>>,
    write_stream: WriteStream,
    next_id: AtomicU64,
    pending: Arc<Mutex<HashMap<u64, oneshot::Sender<JsonRpcResponse>>>>,
}

impl Session {
    pub async fn new(
        read_stream: ReadStream,
        write_stream: WriteStream,
    ) -> Result<Self, Box<dyn std::error::Error + Send>> {
        let read_stream = Arc::new(Mutex::new(read_stream));
        let pending: Arc<Mutex<HashMap<u64, oneshot::Sender<JsonRpcResponse>>>> =
            Arc::new(Mutex::new(HashMap::new()));
        let pending_clone = pending.clone();
        let read_stream_clone = read_stream.clone();

        // Start the message handling task
        tokio::spawn(async move {
            while let Some(message_result) = read_stream_clone.lock().await.recv().await {
                match message_result {
                    Ok(message) => {
                        match message {
                            JsonRpcMessage::Response(response) => {
                                let mut pending = pending_clone.lock().await;
                                if let Some(sender) =
                                    pending.remove(&response.id.unwrap_or_default())
                                {
                                    let _ = sender.send(response);
                                }
                            }
                            JsonRpcMessage::Notification(_) => {
                                // Handle notifications if needed
                            }
                            _ => {
                                println!("Unexpected message type: {:?}", message);
                            }
                        }
                    }
                    Err(e) => {
                        eprintln!("Error receiving message: {}", e);
                    }
                }
            }
        });

        Ok(Self {
            read_stream,
            write_stream,
            next_id: AtomicU64::new(1),
            pending,
        })
    }

    async fn send_request(
        &self,
        method: &str,
        params: Option<Value>,
    ) -> Result<JsonRpcResponse, Box<dyn std::error::Error + Send>> {
        let id = self.next_id.fetch_add(1, Ordering::SeqCst);

        let request = JsonRpcRequest {
            jsonrpc: "2.0".to_string(),
            id: Some(id),
            method: method.to_string(),
            params,
        };

        let (sender, receiver) = oneshot::channel();

        {
            let mut pending = self.pending.lock().await;
            pending.insert(id, sender);
        }

        self.write_stream
            .send(JsonRpcMessage::Request(request))
            .await
            .map_err(|e| Box::new(e) as Box<dyn std::error::Error + Send>)?;

        let response = receiver
            .await
            .map_err(|e| Box::new(e) as Box<dyn std::error::Error + Send>)?;
        Ok(response)
    }

    async fn send_notification(
        &self,
        method: &str,
        params: Option<Value>,
    ) -> Result<(), Box<dyn std::error::Error + Send>> {
        let notification = JsonRpcNotification {
            jsonrpc: "2.0".to_string(),
            method: method.to_string(),
            params,
        };

        self.write_stream
            .send(JsonRpcMessage::Notification(notification))
            .await
            .map_err(|e| Box::new(e) as Box<dyn std::error::Error + Send>)?;

        Ok(())
    }

    pub async fn initialize(
        &mut self,
    ) -> Result<InitializeResult, Box<dyn std::error::Error + Send>> {
        let params = json!({
            "protocolVersion": "2024-11-05",
            "capabilities": {
                "sampling": null,
                "experimental": null,
                "roots": {
                    "listChanged": true
                }
            },
            "clientInfo": {
                "name": "RustMCPClient",
                "version": "0.1.0"
            }
        });

        let response = self.send_request("initialize", Some(params)).await?;
        if let Some(error) = response.error {
            Err(Box::new(McpError::from(error)))
        } else if let Some(result) = response.result {
            let init_result: InitializeResult = serde_json::from_value(result)
                .map_err(|e| Box::new(e) as Box<dyn std::error::Error + Send>)?;
            // Send initialized notification
            self.send_notification("notifications/initialized", None)
                .await?;
            Ok(init_result)
        } else {
            Err(Box::new(McpError::new(ErrorData {
                code: -1,
                message: "No result in response".to_string(),
                data: None,
            })))
        }
    }

    pub async fn list_resources(
        &self,
    ) -> Result<ListResourcesResult, Box<dyn std::error::Error + Send>> {
        let params = json!({});
        let response = self.send_request("resources/list", Some(params)).await?;

        if let Some(error) = response.error {
            Err(Box::new(McpError::from(error)))
        } else if let Some(result) = response.result {
            let resources_result: ListResourcesResult = serde_json::from_value(result)
                .map_err(|e| Box::new(e) as Box<dyn std::error::Error + Send>)?;
            Ok(resources_result)
        } else {
            Err(Box::new(McpError::new(ErrorData {
                code: -1,
                message: "No result in response".to_string(),
                data: None,
            })))
        }
    }

    pub async fn read_resource(
        &self,
        uri: &str,
    ) -> Result<ReadResourceResult, Box<dyn std::error::Error + Send>> {
        let params = json!({
            "uri": uri,
        });
        let response = self.send_request("resources/read", Some(params)).await?;

        if let Some(error) = response.error {
            Err(Box::new(McpError::from(error)))
        } else if let Some(result) = response.result {
            let read_result: ReadResourceResult = serde_json::from_value(result)
                .map_err(|e| Box::new(e) as Box<dyn std::error::Error + Send>)?;
            Ok(read_result)
        } else {
            Err(Box::new(McpError::new(ErrorData {
                code: -1,
                message: "No result in response".to_string(),
                data: None,
            })))
        }
    }

    pub async fn list_tools(&self) -> Result<ListToolsResult, Box<dyn std::error::Error + Send>> {
        let params = json!({});
        let response = self.send_request("tools/list", Some(params)).await?;

        if let Some(error) = response.error {
            Err(Box::new(McpError::from(error)))
        } else if let Some(result) = response.result {
            let tools_result: ListToolsResult = serde_json::from_value(result)
                .map_err(|e| Box::new(e) as Box<dyn std::error::Error + Send>)?;
            Ok(tools_result)
        } else {
            Err(Box::new(McpError::new(ErrorData {
                code: -1,
                message: "No result in response".to_string(),
                data: None,
            })))
        }
    }

    pub async fn call_tool(
        &self,
        name: &str,
        arguments: Option<Value>,
    ) -> Result<CallToolResult, Box<dyn std::error::Error + Send>> {
        let params = json!({
            "name": name,
            "arguments": arguments.unwrap_or_else(|| json!({})),
        });
        let response = self.send_request("tools/call", Some(params)).await?;

        if let Some(error) = response.error {
            Err(Box::new(McpError::from(error)))
        } else if let Some(result) = response.result {
            let call_result: CallToolResult = serde_json::from_value(result)
                .map_err(|e| Box::new(e) as Box<dyn std::error::Error + Send>)?;
            Ok(call_result)
        } else {
            Err(Box::new(McpError::new(ErrorData {
                code: -1,
                message: "No result in response".to_string(),
                data: None,
            })))
        }
    }
}
