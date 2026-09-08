import{r as m,j as e,d as p,u as A,L as D,a as S}from"./index-ZRECE9bq.js";import{l as L,u as B}from"./api-Bu0U2RRx.js";import{u as C,a as G,o as E,s as x,b as O,_ as w}from"./zod-os2CPXAg.js";import{n as F}from"./coerce-CKwym4FX.js";function M({open:a,title:c,onClose:n,children:h,footer:o}){return m.useEffect(()=>{if(!a)return;const r=l=>l.key==="Escape"&&(n==null?void 0:n());return document.addEventListener("keydown",r),()=>document.removeEventListener("keydown",r)},[a,n]),a?e.jsx(u.Overlay,{onClick:n,children:e.jsxs(u.Box,{onClick:r=>r.stopPropagation(),children:[e.jsxs(u.Header,{children:[e.jsx("h3",{children:c}),e.jsx(u.Close,{onClick:n,"aria-label":"Close",children:"×"})]}),e.jsx(u.Body,{children:h}),o&&e.jsx(u.Footer,{children:o})]})}):null}const u={Overlay:p.div`
    position: fixed; inset: 0; z-index: 1000;
    background: rgba(0,0,0,.5);
    display: flex; align-items: center; justify-content: center;
    padding: 16px;
  `,Box:p.div`
    background: ${({theme:a})=>a.card};
    color: ${({theme:a})=>a.fg};
    border: 1px solid ${({theme:a})=>a.border};
    width: min(680px, 100%);
    border-radius: 16px; box-shadow: var(--shadow);
    display: grid; grid-template-rows: auto 1fr auto;
  `,Header:p.div`
    padding: 14px 16px; border-bottom: 1px solid ${({theme:a})=>a.border};
    display: flex; align-items: center; justify-content: space-between;
    h3 { margin: 0; }
  `,Body:p.div`
    padding: 16px; max-height: 70vh; overflow: auto;
  `,Footer:p.div`
    padding: 12px 16px; border-top: 1px solid ${({theme:a})=>a.border};
    display: flex; justify-content: flex-end; gap: 10px;
  `,Close:p.button`
    border: 1px solid ${({theme:a})=>a.border};
    background: ${({theme:a})=>a.card};
    border-radius: 8px; padding: 4px 10px; cursor: pointer;
  `},$=["ALL","O+","O-","A+","A-","B+","B-","AB+","AB-"],q=E({name:x().min(2,"Name is too short"),age:F().int().min(18,"Must be 18+").max(65,"65 max"),gender:w(["Male","Female","Other"]),bloodGroup:w(["O+","O-","A+","A-","B+","B-","AB+","AB-"]),phone:x().regex(/^\d{10}$/,"10-digit phone only"),email:x().email(),city:x().min(2,"City required"),lastDonationDate:x().optional().nullable(),available:O().default(!0),notes:x().max(200).optional().nullable()}),P=p.div`
  .panel { background: ${({theme:a})=>a.card}; border: 1px solid ${({theme:a})=>a.border}; border-radius: var(--radius); padding: 16px; margin-bottom: 16px; }
  .filters { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
  @media (max-width: 900px) { .filters { grid-template-columns: 1fr 1fr; } }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 14px; }
  .card { background: ${({theme:a})=>a.card}; border:1px solid ${({theme:a})=>a.border}; border-radius: var(--radius); padding: 14px; display: grid; gap: 8px; cursor: pointer; }
  .card:hover { outline: 2px solid ${({theme:a})=>a.primary}; outline-offset: 2px; }
  .badge { display:inline-block; padding:6px 10px; border-radius:999px; background:${({theme:a})=>a.primary}; color:${({theme:a})=>a.primaryFg}; }
  .muted { color: ${({theme:a})=>a.muted}; }
  .btn { padding: 8px 12px; border-radius: 10px; border: 1px solid ${({theme:a})=>a.border}; background: ${({theme:a})=>a.card}; cursor: pointer; }

  /* Modal form styles */
  form { display:grid; gap:12px; }
  .row { display:grid; grid-template-columns: 1fr 1fr; gap:12px; }
  @media (max-width: 900px) { .row { grid-template-columns: 1fr; } }
  label { display:grid; gap:6px; }
  input, select, textarea { padding:10px 12px; border-radius:10px; border:1px solid ${({theme:a})=>a.border}; background: ${({theme:a})=>a.bg}; color: inherit; }
  .err { color:#ef4444; font-size: 12px; }
`;function R(){const[a,c]=S();return[a,(o,r="")=>a.get(o)??r,o=>c(r=>{const l=new URLSearchParams(r);return Object.entries(o).forEach(([g,d])=>d===void 0?l.delete(g):l.set(g,d)),l})]}function T(){const[a,c,n]=R(),[h,o]=m.useState([]),[r,l]=m.useState(null),{push:g}=A(),d=m.useMemo(()=>({q:c("q",""),bloodGroup:c("g","ALL"),city:c("c",""),available:c("a","ALL")}),[a]);m.useEffect(()=>{L(d).then(o)},[d]);const{register:t,handleSubmit:b,reset:j,formState:{errors:i,isSubmitting:v}}=C({resolver:G(q)});m.useEffect(()=>{r&&j({name:r.name,age:r.age,gender:r.gender,bloodGroup:r.bloodGroup,phone:r.phone,email:r.email,city:r.city,lastDonationDate:r.lastDonationDate||"",available:!!r.available,notes:r.notes||""})},[r,j]);const f=async s=>{if(!r)return;const y=await B(r.id,s);o(k=>k.map(N=>N.id===y.id?y:N)),g("Donor updated","success"),l(null)};return e.jsxs(P,{className:"container",children:[e.jsx("div",{className:"panel",children:e.jsxs("div",{className:"filters",children:[e.jsx("input",{placeholder:"Search name/phone/email",value:d.q,onChange:s=>n({q:s.target.value})}),e.jsx("select",{value:d.bloodGroup,onChange:s=>n({g:s.target.value}),children:$.map(s=>e.jsx("option",{value:s,children:s},s))}),e.jsx("input",{placeholder:"City",value:d.city,onChange:s=>n({c:s.target.value})}),e.jsxs("select",{value:d.available,onChange:s=>n({a:s.target.value}),children:[e.jsx("option",{value:"ALL",children:"Availability"}),e.jsx("option",{value:"YES",children:"Available"}),e.jsx("option",{value:"NO",children:"Unavailable"})]})]})}),e.jsx("div",{className:"grid",children:h.map(s=>e.jsxs("div",{className:"card",onClick:()=>l(s),children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsx("h3",{style:{margin:0},children:s.name}),e.jsx("span",{className:"badge",children:s.bloodGroup})]}),e.jsx("div",{className:"muted",children:s.city}),e.jsxs("div",{children:["📞 ",s.phone]}),e.jsxs("div",{children:["✉️ ",s.email]}),e.jsx("div",{className:"muted",children:s.available?"✅ Available":"⛔ Unavailable"})]},s.id))}),e.jsx("div",{style:{margin:"16px 0"},children:e.jsx(D,{className:"btn",to:"/register",children:"+ Register new donor"})}),e.jsx(M,{open:!!r,onClose:()=>l(null),title:r?`Donor: ${r.name}`:"Donor",footer:e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"btn",onClick:()=>l(null),children:"Close"}),e.jsx("button",{className:"btn",onClick:b(f),disabled:v,children:v?"Saving…":"Save changes"})]}),children:r&&e.jsxs("form",{onSubmit:b(f),children:[e.jsxs("div",{className:"row",children:[e.jsxs("label",{children:["Full Name",e.jsx("input",{...t("name")}),i.name&&e.jsx("span",{className:"err",children:i.name.message})]}),e.jsxs("label",{children:["Age",e.jsx("input",{type:"number",...t("age")}),i.age&&e.jsx("span",{className:"err",children:i.age.message})]})]}),e.jsxs("div",{className:"row",children:[e.jsxs("label",{children:["Gender",e.jsxs("select",{...t("gender"),children:[e.jsx("option",{children:"Male"}),e.jsx("option",{children:"Female"}),e.jsx("option",{children:"Other"})]}),i.gender&&e.jsx("span",{className:"err",children:i.gender.message})]}),e.jsxs("label",{children:["Blood Group",e.jsx("select",{...t("bloodGroup"),children:$.filter(s=>s!=="ALL").map(s=>e.jsx("option",{children:s},s))}),i.bloodGroup&&e.jsx("span",{className:"err",children:i.bloodGroup.message})]})]}),e.jsxs("div",{className:"row",children:[e.jsxs("label",{children:["Phone",e.jsx("input",{...t("phone")}),i.phone&&e.jsx("span",{className:"err",children:i.phone.message})]}),e.jsxs("label",{children:["Email",e.jsx("input",{...t("email")}),i.email&&e.jsx("span",{className:"err",children:i.email.message})]})]}),e.jsxs("div",{className:"row",children:[e.jsxs("label",{children:["City",e.jsx("input",{...t("city")}),i.city&&e.jsx("span",{className:"err",children:i.city.message})]}),e.jsxs("label",{children:["Last Donation Date",e.jsx("input",{type:"date",...t("lastDonationDate")})]})]}),e.jsxs("div",{className:"row",children:[e.jsxs("label",{style:{alignItems:"center",gridTemplateColumns:"20px 1fr"},children:[e.jsx("input",{type:"checkbox",...t("available")})," Available to donate"]}),e.jsxs("label",{children:["Notes",e.jsx("input",{...t("notes")})]})]})]})})]})}export{T as default};
