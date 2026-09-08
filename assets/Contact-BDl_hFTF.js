import{u as f,r as t,c as N,j as e,d as y}from"./index-ZRECE9bq.js";import{u as v,a as w,o as $,s as d}from"./zod-os2CPXAg.js";import{a as k,s as C,d as S,b as T}from"./api-Bu0U2RRx.js";const M=$({name:d().min(2,"Name too short"),email:d().email(),message:d().min(10,"Tell us a bit more...")}),D=y.div`
  .card { background:${({theme:s})=>s.card}; border:1px solid ${({theme:s})=>s.border}; border-radius: var(--radius); padding: 16px; }
  form { display:grid; gap:12px; }
  label { display:grid; gap:6px; }
  input, textarea { padding:10px 12px; border-radius:10px; border:1px solid ${({theme:s})=>s.border}; background: ${({theme:s})=>s.bg}; }
  .err { color:#ef4444; font-size: 12px; }
  .btn { padding:10px 14px; border-radius:10px; border:1px solid ${({theme:s})=>s.border}; background:${({theme:s})=>s.card}; cursor:pointer; }
  .primary { background: ${({theme:s})=>s.primary}; color: ${({theme:s})=>s.primaryFg}; border-color: transparent; }

  /* Messages panel */
  .panel { margin-top: 18px; display: grid; gap: 12px; }
  .panelHead { display:flex; align-items:center; justify-content: space-between; gap: 12px; }
  .muted { color: ${({theme:s})=>s.muted}; }
  .row { display:grid; gap: 10px; }
  .msg {
    background:${({theme:s})=>s.card};
    border:1px solid ${({theme:s})=>s.border};
    border-radius: 12px; padding: 12px;
    display: grid; gap: 6px;
  }
  .msgTop { display:flex; align-items:center; justify-content: space-between; gap: 10px; }
  .chip { padding: 4px 8px; border-radius: 999px; border:1px solid ${({theme:s})=>s.border}; }
  .toolbar { display:flex; gap: 8px; }
`;function F(){const{register:s,handleSubmit:x,formState:{errors:r,isSubmitting:o},reset:g}=v({resolver:w(M)}),{push:i}=f(),[n,u]=t.useState([]),[c,m]=t.useState(!0);async function l(){m(!0);const a=await k();u(a),m(!1)}t.useEffect(()=>{l()},[]);const b=async a=>{await C(a),i("Message sent!","success"),g(),l()},p=N(),h=async a=>{await p({title:"Delete this message?",message:"This action cannot be undone.",confirmText:"Delete",cancelText:"Cancel"})&&(await S(a),i("Deleted","success"),l())},j=async()=>{await p({title:"Clear all messages?",message:"This will permanently remove all stored messages from this browser.",confirmText:"Clear all",cancelText:"Keep"})&&(await T(),i("All messages cleared","success"),l())};return e.jsx(D,{className:"container",children:e.jsxs("div",{className:"card",children:[e.jsx("h2",{children:"Contact Us"}),e.jsxs("form",{onSubmit:x(b),children:[e.jsxs("label",{children:["Name",e.jsx("input",{...s("name"),placeholder:"Your name"}),r.name&&e.jsx("span",{className:"err",children:r.name.message})]}),e.jsxs("label",{children:["Email",e.jsx("input",{...s("email"),placeholder:"you@example.com"}),r.email&&e.jsx("span",{className:"err",children:r.email.message})]}),e.jsxs("label",{children:["Message",e.jsx("textarea",{rows:"5",...s("message"),placeholder:"How can we help?"}),r.message&&e.jsx("span",{className:"err",children:r.message.message})]}),e.jsx("button",{className:"btn primary",type:"submit",disabled:o,children:o?"Sending...":"Send"})]}),e.jsxs("div",{className:"panel",children:[e.jsxs("div",{className:"panelHead",children:[e.jsx("div",{className:"muted",children:c?"Loading messages…":`${n.length} message${n.length!==1?"s":""}`}),e.jsxs("div",{className:"toolbar",children:[e.jsx("button",{className:"btn",onClick:l,children:"Refresh"}),e.jsx("button",{className:"btn",onClick:j,children:"Clear all"})]})]}),e.jsxs("div",{className:"row",children:[n.map(a=>e.jsxs("div",{className:"msg",children:[e.jsxs("div",{className:"msgTop",children:[e.jsx("strong",{children:a.name}),e.jsx("span",{className:"chip",children:new Date(a.at).toLocaleString()})]}),e.jsx("div",{className:"muted",children:a.email}),e.jsx("div",{children:a.message}),e.jsx("div",{className:"toolbar",children:e.jsx("button",{className:"btn",onClick:()=>h(a.id),children:"Delete"})})]},a.id)),!c&&n.length===0&&e.jsx("div",{className:"muted",children:"No messages yet."})]})]})]})})}export{F as default};
