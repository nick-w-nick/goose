"use strict";(self.webpackChunkgoose=self.webpackChunkgoose||[]).push([[701],{8876:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>d,contentTitle:()=>a,default:()=>u,frontMatter:()=>r,metadata:()=>o,toc:()=>l});const o=JSON.parse('{"id":"guides/managing-goose-sessions","title":"Managing Sessions","description":"A session is a single, continuous interaction between you and Goose, providing a space to ask questions and prompt action. In this guide, we\'ll cover how to start, exit, save, resume, and delete a session.","source":"@site/docs/guides/managing-goose-sessions.md","sourceDirName":"guides","slug":"/guides/managing-goose-sessions","permalink":"/goose/v1/docs/guides/managing-goose-sessions","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":1,"frontMatter":{"sidebar_position":1,"title":"Managing Sessions"},"sidebar":"tutorialSidebar","previous":{"title":"Guides","permalink":"/goose/v1/docs/category/guides"},"next":{"title":"CLI Commands","permalink":"/goose/v1/docs/guides/goose-cli-commands"}}');var i=n(4848),t=n(8453);const r={sidebar_position:1,title:"Managing Sessions"},a="Managing Goose Sessions",d={},l=[{value:"Starting a Session",id:"starting-a-session",level:2},{value:"Exiting a Session",id:"exiting-a-session",level:2},{value:"Resuming a Session",id:"resuming-a-session",level:2},{value:"Deleting Old Sessions",id:"deleting-old-sessions",level:2}];function c(e){const s={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",p:"p",pre:"pre",...(0,t.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(s.header,{children:(0,i.jsx)(s.h1,{id:"managing-goose-sessions",children:"Managing Goose Sessions"})}),"\n",(0,i.jsx)(s.p,{children:"A session is a single, continuous interaction between you and Goose, providing a space to ask questions and prompt action. In this guide, we'll cover how to start, exit, save, resume, and delete a session."}),"\n",(0,i.jsx)(s.h2,{id:"starting-a-session",children:"Starting a Session"}),"\n",(0,i.jsx)(s.p,{children:"To start a new session, run the following command within your terminal:"}),"\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{children:"goose session\n"})}),"\n",(0,i.jsxs)(s.p,{children:["By default, Goose will provide a random string as the name of your session. If you'd like to provide a specific name, this is where you'd do so. For example to name your session ",(0,i.jsx)(s.code,{children:"react-migration"}),", you would run:"]}),"\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{children:"goose session -n react-migration\n"})}),"\n",(0,i.jsx)(s.p,{children:"You'll know your session has started when your terminal looks similar to the following:"}),"\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{children:"starting session | provider: openai model: gpt-4o\nlogging to ~/.config/goose/sessions/react-migration.json1\n"})}),"\n",(0,i.jsx)(s.admonition,{type:"info",children:(0,i.jsxs)(s.p,{children:["If this is your first session, Goose will prompt you for an API key to access an LLM (Large Language Model) of your choice. For more information on setting up your API key, see the ",(0,i.jsx)(s.a,{href:"/docs/installation#set-up-a-provider",children:"Installation Guide"}),". Here is the list of ",(0,i.jsx)(s.a,{href:"/docs/configuration/providers",children:"supported LLMs"}),"."]})}),"\n",(0,i.jsx)(s.h2,{id:"exiting-a-session",children:"Exiting a Session"}),"\n",(0,i.jsxs)(s.p,{children:["To save and exit a session, hold down ",(0,i.jsx)(s.code,{children:"Ctrl"})," + ",(0,i.jsx)(s.code,{children:"C"}),". Alternatively, you can type ",(0,i.jsx)(s.code,{children:"exit"})," to save and exit the session."]}),"\n",(0,i.jsxs)(s.p,{children:["Your session will be stored locally in ",(0,i.jsx)(s.code,{children:"~/.config/goose/sessions"}),"."]}),"\n",(0,i.jsx)(s.h2,{id:"resuming-a-session",children:"Resuming a Session"}),"\n",(0,i.jsx)(s.p,{children:"To resume your latest session, you can run the following command:"}),"\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{children:"goose session -r\n"})}),"\n",(0,i.jsx)(s.p,{children:"To resume a specific session, you can first check the sessions you currently have by running:"}),"\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{children:"goose session --list \n"})}),"\n",(0,i.jsx)(s.p,{children:"This command will display a list of all saved sessions, showing a name, date, and time for each session. The output should look similar to the following:"}),"\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{children:"2024-11-12  14:12:28  managing-goose\n2024-11-12. 13:48:11  blog\n2024-11-12  13:27:21  react-migration\n2024-11-04  16:14:29  e6d7\n"})}),"\n",(0,i.jsx)(s.p,{children:"To resume a specific session, run the following command:"}),"\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{children:"goose session -r -n react-migration\n"})}),"\n",(0,i.jsx)(s.h2,{id:"deleting-old-sessions",children:"Deleting Old Sessions"}),"\n",(0,i.jsx)(s.p,{children:"Goose allows you to delete all previously saved sessions. However, it currently doesn't allow you to select specific sessions to delete. Be cautious when running this command as all sessions prior to the day the command was ran will be deleted."}),"\n",(0,i.jsx)(s.p,{children:"To delete previously saved sessions, you can run the following command:"}),"\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{children:"goose session --clear\n"})}),"\n",(0,i.jsx)(s.admonition,{type:"important",children:(0,i.jsx)(s.p,{children:"Once a session is deleted, it can not be retrieved."})})]})}function u(e={}){const{wrapper:s}={...(0,t.R)(),...e.components};return s?(0,i.jsx)(s,{...e,children:(0,i.jsx)(c,{...e})}):c(e)}},8453:(e,s,n)=>{n.d(s,{R:()=>r,x:()=>a});var o=n(6540);const i={},t=o.createContext(i);function r(e){const s=o.useContext(t);return o.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function a(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),o.createElement(t.Provider,{value:s},e.children)}}}]);