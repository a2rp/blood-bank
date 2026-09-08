import{j as e,L as s,d as t}from"./index-ZRECE9bq.js";const r={name:"Ashish Ranjan",title:"React / MERN Developer",summary:"Full-stack dev (React • Node.js) who ships fast, stable, SEO-friendly apps with clean, maintainable code. Focus on UX, performance, and production-ready wiring.",availability:"Open to Full-time (preferred) or Contract · Immediate to short notice",location:"Remote or Bengaluru (hybrid)",links:{portfolio:"https://www.ashishranjan.net",github:"https://github.com/a2rp",linkedin:"https://www.linkedin.com/in/aashishranjan/",resume:"https://a2rp.github.io/resume/",email:"mailto:ash.ranjan09@gmail.com"},skills:["React","Vite","Styled-components","React Router","React Hook Form","Node.js","Express","MongoDB","REST APIs","Stripe/Razorpay (payments)","CI/CD","GitHub Pages/Netlify/Render"]},l=t.div`
  .card {
    background: ${({theme:a})=>a.card};
    border: 1px solid ${({theme:a})=>a.border};
    border-radius: var(--radius);
    padding: 18px;
  }
  .muted { color: ${({theme:a})=>a.muted}; }

  .grid {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: 16px;
  }
  @media (max-width: 1000px) {
    .grid { grid-template-columns: 1fr; }
  }

  .chips {
    display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px;
  }
  .chip {
    border: 1px solid ${({theme:a})=>a.border};
    background: ${({theme:a})=>a.bg};
    border-radius: 999px;
    padding: 6px 10px;
    font-size: 13px;
  }

  .btns { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 12px; }
  .btn {
    padding: 10px 14px; border-radius: 10px;
    border: 1px solid ${({theme:a})=>a.border};
    background: ${({theme:a})=>a.card};
    cursor: pointer;
  }
  .btn.primary {
    background: ${({theme:a})=>a.primary};
    color: ${({theme:a})=>a.primaryFg};
    border-color: transparent;
  }

  .section { display: grid; gap: 8px; }
  .two { display: grid; gap: 16px; }
  .list { margin: 0; padding-left: 18px; }
`;function o(){const a=r.links;return e.jsx(l,{className:"container",children:e.jsxs("div",{className:"two",children:[e.jsxs("div",{className:"card section",children:[e.jsx("h2",{style:{margin:0},children:"About this app"}),e.jsx("p",{className:"muted",children:"Frontend-only demo of a Blood Bank app built with React + Vite + styled-components. Data is stored locally in your browser (localStorage). It demonstrates clean routing, validated forms (React Hook Form + Zod), theming (dark/light), custom toasts, and a localStorage-backed API layer with seeded donors."}),e.jsxs("div",{className:"btns",children:[e.jsx(s,{className:"btn primary",to:"/donors",children:"Find Donors"}),e.jsx(s,{className:"btn",to:"/register",children:"Register as Donor"}),e.jsx(s,{className:"btn",to:"/contact",children:"Contact"})]})]}),e.jsxs("div",{className:"card section",children:[e.jsx("h2",{style:{margin:0},children:"About the developer"}),e.jsxs("h3",{style:{margin:"2px 0 6px"},children:[r.name," — ",r.title]}),e.jsx("p",{className:"muted",children:r.summary}),e.jsxs("p",{className:"muted",children:[e.jsx("strong",{children:"Availability:"})," ",r.availability,e.jsx("br",{}),e.jsx("strong",{children:"Location:"})," ",r.location,e.jsx("br",{})]}),e.jsxs("div",{children:[e.jsx("strong",{children:"Skills"}),e.jsx("div",{className:"chips",children:r.skills.map(i=>e.jsx("span",{className:"chip",children:i},i))})]}),e.jsxs("div",{className:"btns",children:[e.jsx("a",{className:"btn primary",href:a.resume,target:"_blank",rel:"noreferrer",children:"View Resume"}),e.jsx("a",{className:"btn",href:a.portfolio,target:"_blank",rel:"noreferrer",children:"Portfolio"}),e.jsx("a",{className:"btn",href:a.github,target:"_blank",rel:"noreferrer",children:"GitHub"}),e.jsx("a",{className:"btn",href:a.linkedin,target:"_blank",rel:"noreferrer",children:"LinkedIn"}),e.jsx("a",{className:"btn",href:a.email,children:"Email me"})]})]}),e.jsxs("div",{className:"grid",children:[e.jsxs("div",{className:"card section",children:[e.jsx("h3",{style:{margin:0},children:"How data works"}),e.jsxs("p",{className:"muted",children:["Donors & messages are saved to ",e.jsx("code",{children:"localStorage"})," under keys",e.jsx("code",{children:" bb_donors_v1"})," and ",e.jsx("code",{children:" bb_messages_v1"}),". Clear browser storage to reset."]})]}),e.jsxs("div",{className:"card section",children:[e.jsx("h3",{style:{margin:0},children:"Roadmap"}),e.jsxs("ul",{className:"list",children:[e.jsx("li",{className:"muted",children:"Donor detail route + shareable link"}),e.jsx("li",{className:"muted",children:"Backup/restore (JSON import/export)"}),e.jsx("li",{className:"muted",children:"PWA offline support"}),e.jsx("li",{className:"muted",children:"Role-based admin area (when backend added)"})]})]})]})]})})}export{o as default};
