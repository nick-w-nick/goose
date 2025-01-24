"use strict";(self.webpackChunkgoose=self.webpackChunkgoose||[]).push([[9013],{269:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>a,contentTitle:()=>l,default:()=>h,frontMatter:()=>t,metadata:()=>o,toc:()=>d});const o=JSON.parse('{"id":"troubleshooting","title":"Troubleshooting","description":"Goose, like any system, may run into occasional issues. This guide provides solutions for common problems.","source":"@site/docs/troubleshooting.md","sourceDirName":".","slug":"/troubleshooting","permalink":"/goose/v1/docs/troubleshooting","draft":false,"unlisted":false,"tags":[],"version":"current","frontMatter":{"title":"Troubleshooting"},"sidebar":"tutorialSidebar","previous":{"title":"Extensions Design Guide","permalink":"/goose/v1/docs/goose-architecture-overviews/extensions-design"}}');var r=n(4848),i=n(8453);const t={title:"Troubleshooting"},l="Troubleshooting",a={},d=[{value:"Goose Edits Files",id:"goose-edits-files",level:3},{value:"Interrupting Goose",id:"interrupting-goose",level:3},{value:"Stuck in a Loop or Unresponsive",id:"stuck-in-a-loop-or-unresponsive",level:3},{value:"Handling Rate Limit Errors",id:"handling-rate-limit-errors",level:3},{value:"API Errors",id:"api-errors",level:3},{value:"Need Further Help?",id:"need-further-help",level:3}];function c(e){const s={a:"a",admonition:"admonition",code:"code",h1:"h1",h3:"h3",header:"header",hr:"hr",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...(0,i.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(s.header,{children:(0,r.jsx)(s.h1,{id:"troubleshooting",children:"Troubleshooting"})}),"\n",(0,r.jsx)(s.p,{children:"Goose, like any system, may run into occasional issues. This guide provides solutions for common problems."}),"\n",(0,r.jsx)(s.h3,{id:"goose-edits-files",children:"Goose Edits Files"}),"\n",(0,r.jsx)(s.p,{children:"Goose can and will edit files as part of its workflow. To avoid losing personal changes, use version control to stage your personal edits. Leave Goose edits unstaged until reviewed. Consider separate commits for Goose's edits so you can easily revert them if needed."}),"\n",(0,r.jsx)(s.hr,{}),"\n",(0,r.jsx)(s.h3,{id:"interrupting-goose",children:"Interrupting Goose"}),"\n",(0,r.jsxs)(s.p,{children:["If Goose is heading in the wrong direction or gets stuck, you can interrupt it by pressing ",(0,r.jsx)(s.code,{children:"CTRL+C"}),". This will stop Goose and give you the opportunity to correct its actions or provide additional information."]}),"\n",(0,r.jsx)(s.hr,{}),"\n",(0,r.jsx)(s.h3,{id:"stuck-in-a-loop-or-unresponsive",children:"Stuck in a Loop or Unresponsive"}),"\n",(0,r.jsx)(s.p,{children:'In rare cases, Goose may enter a "death loop" or become unresponsive during a long session. This is often resolved by ending the current session, and starting a new session.'}),"\n",(0,r.jsxs)(s.ol,{children:["\n",(0,r.jsxs)(s.li,{children:["Hold down ",(0,r.jsx)(s.code,{children:"Ctrl + C"})," to cancel"]}),"\n",(0,r.jsx)(s.li,{children:"Start a new session:"}),"\n"]}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-sh",children:"goose session\n"})}),"\n",(0,r.jsx)(s.admonition,{type:"tip",children:(0,r.jsx)(s.p,{children:"For particularly large or complex tasks, consider breaking them into smaller sessions."})}),"\n",(0,r.jsx)(s.hr,{}),"\n",(0,r.jsx)(s.h3,{id:"handling-rate-limit-errors",children:"Handling Rate Limit Errors"}),"\n",(0,r.jsxs)(s.p,{children:["Goose may encounter a ",(0,r.jsx)(s.code,{children:"429 error"})," (rate limit exceeded) when interacting with LLM providers. The recommended solution is to use OpenRouter. See ",(0,r.jsx)(s.a,{href:"/docs/guides/handling-llm-rate-limits-with-goose",children:"Handling LLM Rate Limits"})," for more info."]}),"\n",(0,r.jsx)(s.hr,{}),"\n",(0,r.jsx)(s.h3,{id:"api-errors",children:"API Errors"}),"\n",(0,r.jsx)(s.p,{children:"Users may run into an error like the one below when there are issues with their LLM API tokens, such as running out of credits or incorrect configuration:"}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-sh",children:"Traceback (most recent call last):\n  File \"/Users/admin/.local/pipx/venvs/goose-ai/lib/python3.13/site-packages/exchange/providers/utils.py\",\nline 30, in raise_for_status\n    response.raise_for_status()\n    ~~~~~~~~~~~~~~~~~~~~~~~~~^^\n  File \"/Users/admin/.local/pipx/venvs/goose-ai/lib/python3.13/site-packages/httpx/_models.py\",\nline 829, in raise_for_status\n    raise HTTPStatusError(message, request=request, response=self)\nhttpx.HTTPStatusError: Client error '404 Not Found' for url\n'https://api.openai.com/v1/chat/completions'\n\n...\n"})}),"\n",(0,r.jsx)(s.p,{children:"This error typically occurs when LLM API credits are exhausted or your API key is invalid. To resolve this issue:"}),"\n",(0,r.jsxs)(s.ol,{children:["\n",(0,r.jsxs)(s.li,{children:["Check Your API Credits:","\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsx)(s.li,{children:"Log into your LLM provider's dashboard"}),"\n",(0,r.jsx)(s.li,{children:"Verify that you have enough credits. If not, refill them"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(s.li,{children:["Verify API Key:","\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsx)(s.li,{children:"Run the following command to reconfigure your API key:"}),"\n"]}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-sh",children:"goose configure\n"})}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(s.p,{children:["For detailed steps on updating your LLM provider, refer to the ",(0,r.jsx)(s.a,{href:"/docs/installation",children:"Installation"})," Guide."]}),"\n",(0,r.jsx)(s.hr,{}),"\n",(0,r.jsx)(s.h3,{id:"need-further-help",children:"Need Further Help?"}),"\n",(0,r.jsxs)(s.p,{children:["If you have questions, run into issues, or just need to brainstorm ideas join the ",(0,r.jsx)(s.a,{href:"https://discord.gg/block-opensource",children:"Discord Community"}),"!"]})]})}function h(e={}){const{wrapper:s}={...(0,i.R)(),...e.components};return s?(0,r.jsx)(s,{...e,children:(0,r.jsx)(c,{...e})}):c(e)}},8453:(e,s,n)=>{n.d(s,{R:()=>t,x:()=>l});var o=n(6540);const r={},i=o.createContext(r);function t(e){const s=o.useContext(i);return o.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function l(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:t(e.components),o.createElement(i.Provider,{value:s},e.children)}}}]);