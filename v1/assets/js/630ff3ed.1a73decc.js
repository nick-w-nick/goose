"use strict";(self.webpackChunkgoose=self.webpackChunkgoose||[]).push([[378],{2776:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>d,default:()=>x,frontMatter:()=>l,metadata:()=>s,toc:()=>u});const s=JSON.parse('{"id":"getting-started/using-extensions","title":"Using Extensions","description":"Goose Extensions are add-ons that provide a way to extend the functionality of Goose by connecting with applications and tools you already use in your workflow. These extensions can be used to add new features, access data and resources, or integrate with other systems.","source":"@site/docs/getting-started/using-extensions.md","sourceDirName":"getting-started","slug":"/getting-started/using-extensions","permalink":"/goose/v1/docs/getting-started/using-extensions","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":1,"frontMatter":{"sidebar_position":1,"title":"Using Extensions"},"sidebar":"tutorialSidebar","previous":{"title":"Getting Started","permalink":"/goose/v1/docs/category/getting-started"},"next":{"title":"Applications of Goose","permalink":"/goose/v1/docs/getting-started/applications"}}');var o=t(4848),i=t(8453),r=t(5537),a=t(9329);const l={sidebar_position:1,title:"Using Extensions"},d="Using Extensions",c={},u=[{value:"Adding An Extension",id:"adding-an-extension",level:3},{value:"Toggle Extensions",id:"toggle-extensions",level:3},{value:"Additional Resources",id:"additional-resources",level:2}];function h(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.header,{children:(0,o.jsx)(n.h1,{id:"using-extensions",children:"Using Extensions"})}),"\n",(0,o.jsx)(n.p,{children:"Goose Extensions are add-ons that provide a way to extend the functionality of Goose by connecting with applications and tools you already use in your workflow. These extensions can be used to add new features, access data and resources, or integrate with other systems."}),"\n",(0,o.jsx)(n.h3,{id:"adding-an-extension",children:"Adding An Extension"}),"\n",(0,o.jsxs)(n.p,{children:["When you install Goose, a few built-in extensions are included. In addition, you can add external extensions that were developed on the ",(0,o.jsx)(n.a,{href:"https://www.anthropic.com/news/model-context-protocol",children:"Model Context Protocol (MCP)"}),"."]}),"\n",(0,o.jsxs)(r.A,{children:[(0,o.jsxs)(a.A,{value:"cli",label:"Goose CLI",default:!0,children:[(0,o.jsx)(n.p,{children:(0,o.jsx)(n.strong,{children:"To add an extension:"})}),(0,o.jsxs)(n.ol,{children:["\n",(0,o.jsx)(n.li,{children:"Run the following command:"}),"\n"]}),(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-sh",children:"goose configure\n"})}),(0,o.jsxs)(n.ol,{start:"2",children:["\n",(0,o.jsxs)(n.li,{children:["Select ",(0,o.jsx)(n.code,{children:"Add Extension"})," from the menu."]}),"\n",(0,o.jsxs)(n.li,{children:["Choose the type of extension you\u2019d like to add:","\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"Built-In Extension"}),": Use an extension that comes pre-installed with Goose."]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"Command-Line Extension"}),": Add a local command or script to run as an extension."]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"Remote Extension"}),": Connect to a remote system via SSE (Server-Sent Events)."]}),"\n"]}),"\n"]}),"\n",(0,o.jsx)(n.li,{children:"Follow the prompts based on the type of extension you selected."}),"\n"]}),(0,o.jsx)(n.p,{children:(0,o.jsx)(n.strong,{children:"Example: Adding Built-in Extension"})}),(0,o.jsx)(n.p,{children:"To select an option during configuration, hover over it and press Enter."}),(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-sh",children:"What would you like to configure?\n  Configure Providers\n  Toggle Extensions\n> Add Extension\n\n\nWhat type of extension would you like to add?\n> Built-in Extension\n  Command-line Extension\n  Remote Extension\n\nWhich Built-in extension would you like to enable?\n  Developer Tools\n  Non Developer\n> Jetbrains\n"})})]}),(0,o.jsxs)(a.A,{value:"ui",label:"Goose UI",children:[(0,o.jsx)(n.p,{children:(0,o.jsxs)(n.strong,{children:["Extensions can be installed directly from the ",(0,o.jsx)(n.a,{href:"https://silver-disco-nvm6v4e.pages.github.io/",children:"directory page"})," to the Goose UI as shown below."]})}),(0,o.jsx)(n.p,{children:(0,o.jsx)(n.img,{alt:"Install Extension",src:t(21).A+"",width:"1050",height:"646"})})]})]}),"\n",(0,o.jsx)(n.h3,{id:"toggle-extensions",children:"Toggle Extensions"}),"\n",(0,o.jsx)(n.p,{children:"You can manage extensions by enabling or disabling them based on your workflow needs. Both, the CLI and UI, allow you to toggle extensions on or off as necessary."}),"\n",(0,o.jsxs)(r.A,{children:[(0,o.jsxs)(a.A,{value:"cli",label:"Goose CLI",default:!0,children:[(0,o.jsx)(n.p,{children:(0,o.jsx)(n.strong,{children:"To enable or disable extensions that are already installed:"})}),(0,o.jsxs)(n.ol,{children:["\n",(0,o.jsx)(n.li,{children:"Run the following command to open up Goose's configurations:"}),"\n"]}),(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-sh",children:"goose configure\n"})}),(0,o.jsxs)(n.ol,{start:"2",children:["\n",(0,o.jsxs)(n.li,{children:["Select ",(0,o.jsx)(n.code,{children:"Toggle Extensions"})," from the menu."]}),"\n",(0,o.jsx)(n.li,{children:"A list of already installed extensions will populate."}),"\n",(0,o.jsxs)(n.li,{children:["Press the ",(0,o.jsx)(n.code,{children:"space bar"})," to toggle the extension ",(0,o.jsx)(n.code,{children:"enabled"})," or ",(0,o.jsx)(n.code,{children:"disabled"}),"."]}),"\n"]}),(0,o.jsx)(n.p,{children:(0,o.jsx)(n.strong,{children:"Example:"})}),(0,o.jsx)(n.p,{children:"To select an option during configuration, hover over it and press Enter."}),(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-sh",children:'What would you like to configure?\n  Configure Providers\n> Toggle Extensions\n  Add Extension\n\nEnable systems: (use "space" to toggle and "enter" to submit)\n[ ] Developer Tools \n[X] JetBrains\n'})})]}),(0,o.jsxs)(a.A,{value:"ui",label:"Goose UI",children:[(0,o.jsx)(n.p,{children:(0,o.jsx)(n.strong,{children:"To enable or disable extensions that are already installed:"})}),(0,o.jsxs)(n.ol,{children:["\n",(0,o.jsx)(n.li,{children:"Click the three dots in the top-right corner of the application."}),"\n",(0,o.jsxs)(n.li,{children:["Select ",(0,o.jsx)(n.code,{children:"Settings"})," from the menu, then click on the ",(0,o.jsx)(n.code,{children:"Extensions"})," section."]}),"\n",(0,o.jsx)(n.li,{children:"Use the toggle switch next to each extension to enable or disable it."}),"\n"]}),(0,o.jsx)(n.p,{children:(0,o.jsx)(n.img,{alt:"Install Extension",src:t(9058).A+"",width:"749",height:"289"})})]})]}),"\n",(0,o.jsx)(n.h2,{id:"additional-resources",children:"Additional Resources"}),"\n",(0,o.jsxs)(n.p,{children:["Visit the ",(0,o.jsx)(n.a,{href:"/docs/installation/#update-a-provider",children:"Installation Guide"})," for detailed instructions on how to update your LLM provider."]})]})}function x(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(h,{...e})}):h(e)}},9329:(e,n,t)=>{t.d(n,{A:()=>r});t(6540);var s=t(4164);const o={tabItem:"tabItem_Ymn6"};var i=t(4848);function r(e){let{children:n,hidden:t,className:r}=e;return(0,i.jsx)("div",{role:"tabpanel",className:(0,s.A)(o.tabItem,r),hidden:t,children:n})}},5537:(e,n,t)=>{t.d(n,{A:()=>w});var s=t(6540),o=t(4164),i=t(5627),r=t(6347),a=t(372),l=t(604),d=t(1861),c=t(8749);function u(e){return s.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,s.isValidElement)(e)&&function(e){const{props:n}=e;return!!n&&"object"==typeof n&&"value"in n}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function h(e){const{values:n,children:t}=e;return(0,s.useMemo)((()=>{const e=n??function(e){return u(e).map((e=>{let{props:{value:n,label:t,attributes:s,default:o}}=e;return{value:n,label:t,attributes:s,default:o}}))}(t);return function(e){const n=(0,d.XI)(e,((e,n)=>e.value===n.value));if(n.length>0)throw new Error(`Docusaurus error: Duplicate values "${n.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[n,t])}function x(e){let{value:n,tabValues:t}=e;return t.some((e=>e.value===n))}function g(e){let{queryString:n=!1,groupId:t}=e;const o=(0,r.W6)(),i=function(e){let{queryString:n=!1,groupId:t}=e;if("string"==typeof n)return n;if(!1===n)return null;if(!0===n&&!t)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return t??null}({queryString:n,groupId:t});return[(0,l.aZ)(i),(0,s.useCallback)((e=>{if(!i)return;const n=new URLSearchParams(o.location.search);n.set(i,e),o.replace({...o.location,search:n.toString()})}),[i,o])]}function p(e){const{defaultValue:n,queryString:t=!1,groupId:o}=e,i=h(e),[r,l]=(0,s.useState)((()=>function(e){let{defaultValue:n,tabValues:t}=e;if(0===t.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!x({value:n,tabValues:t}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${n}" but none of its children has the corresponding value. Available values are: ${t.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return n}const s=t.find((e=>e.default))??t[0];if(!s)throw new Error("Unexpected error: 0 tabValues");return s.value}({defaultValue:n,tabValues:i}))),[d,u]=g({queryString:t,groupId:o}),[p,f]=function(e){let{groupId:n}=e;const t=function(e){return e?`docusaurus.tab.${e}`:null}(n),[o,i]=(0,c.Dv)(t);return[o,(0,s.useCallback)((e=>{t&&i.set(e)}),[t,i])]}({groupId:o}),m=(()=>{const e=d??p;return x({value:e,tabValues:i})?e:null})();(0,a.A)((()=>{m&&l(m)}),[m]);return{selectedValue:r,selectValue:(0,s.useCallback)((e=>{if(!x({value:e,tabValues:i}))throw new Error(`Can't select invalid tab value=${e}`);l(e),u(e),f(e)}),[u,f,i]),tabValues:i}}var f=t(9136);const m={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var b=t(4848);function j(e){let{className:n,block:t,selectedValue:s,selectValue:r,tabValues:a}=e;const l=[],{blockElementScrollPositionUntilNextRender:d}=(0,i.a_)(),c=e=>{const n=e.currentTarget,t=l.indexOf(n),o=a[t].value;o!==s&&(d(n),r(o))},u=e=>{let n=null;switch(e.key){case"Enter":c(e);break;case"ArrowRight":{const t=l.indexOf(e.currentTarget)+1;n=l[t]??l[0];break}case"ArrowLeft":{const t=l.indexOf(e.currentTarget)-1;n=l[t]??l[l.length-1];break}}n?.focus()};return(0,b.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,o.A)("tabs",{"tabs--block":t},n),children:a.map((e=>{let{value:n,label:t,attributes:i}=e;return(0,b.jsx)("li",{role:"tab",tabIndex:s===n?0:-1,"aria-selected":s===n,ref:e=>{l.push(e)},onKeyDown:u,onClick:c,...i,className:(0,o.A)("tabs__item",m.tabItem,i?.className,{"tabs__item--active":s===n}),children:t??n},n)}))})}function v(e){let{lazy:n,children:t,selectedValue:i}=e;const r=(Array.isArray(t)?t:[t]).filter(Boolean);if(n){const e=r.find((e=>e.props.value===i));return e?(0,s.cloneElement)(e,{className:(0,o.A)("margin-top--md",e.props.className)}):null}return(0,b.jsx)("div",{className:"margin-top--md",children:r.map(((e,n)=>(0,s.cloneElement)(e,{key:n,hidden:e.props.value!==i})))})}function y(e){const n=p(e);return(0,b.jsxs)("div",{className:(0,o.A)("tabs-container",m.tabList),children:[(0,b.jsx)(j,{...n,...e}),(0,b.jsx)(v,{...n,...e})]})}function w(e){const n=(0,f.A)();return(0,b.jsx)(y,{...e,children:u(e.children)},String(n))}},21:(e,n,t)=>{t.d(n,{A:()=>s});const s=t.p+"assets/images/install-extension-ui-af312043d371e94c90255342e33e3399.png"},9058:(e,n,t)=>{t.d(n,{A:()=>s});const s=t.p+"assets/images/manage-extensions-ui-566a099ac6d76775e599085e06f02ba4.png"},8453:(e,n,t)=>{t.d(n,{R:()=>r,x:()=>a});var s=t(6540);const o={},i=s.createContext(o);function r(e){const n=s.useContext(i);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:r(e.components),s.createElement(i.Provider,{value:n},e.children)}}}]);