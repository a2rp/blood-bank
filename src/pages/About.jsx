import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const INFO = {
    name: 'Ashish Ranjan',
    title: 'React / MERN Developer',
    summary: `Full-stack dev (React • Node.js) who ships fast, stable, SEO-friendly apps with clean, maintainable code. Focus on UX, performance, and production-ready wiring.`,
    availability: 'Open to Full-time (preferred) or Contract · Immediate to short notice',
    location: 'Remote or Bengaluru (hybrid)',
    links: {
        portfolio: 'https://www.ashishranjan.net',
        github: 'https://github.com/a2rp',
        linkedin: 'https://www.linkedin.com/in/aashishranjan/',
        resume: 'https://a2rp.github.io/resume/',
        email: 'mailto:ash.ranjan09@gmail.com',
    },
    skills: [
        'React', 'Vite', 'Styled-components', 'React Router', 'React Hook Form',
        'Node.js', 'Express', 'MongoDB', 'REST APIs',
        'Stripe/Razorpay (payments)', 'CI/CD', 'GitHub Pages/Netlify/Render'
    ],
    highlights: [
        'KYC Verification UI – full flow with validation, previews, autosave',
        'Multiple production websites delivered end-to-end',
        'Designed scalable file/image uploads (Cloudinary preference)',
    ]
}

const Wrapper = styled.div`
  .card {
    background: ${({ theme }) => theme.card};
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: var(--radius);
    padding: 18px;
  }
  .muted { color: ${({ theme }) => theme.muted}; }

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
    border: 1px solid ${({ theme }) => theme.border};
    background: ${({ theme }) => theme.bg};
    border-radius: 999px;
    padding: 6px 10px;
    font-size: 13px;
  }

  .btns { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 12px; }
  .btn {
    padding: 10px 14px; border-radius: 10px;
    border: 1px solid ${({ theme }) => theme.border};
    background: ${({ theme }) => theme.card};
    cursor: pointer;
  }
  .btn.primary {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.primaryFg};
    border-color: transparent;
  }

  .section { display: grid; gap: 8px; }
  .two { display: grid; gap: 16px; }
  .list { margin: 0; padding-left: 18px; }
`

export default function About() {
    const L = INFO.links
    return (
        <Wrapper className="container">
            <div className="two">
                {/* About the app */}
                <div className="card section">
                    <h2 style={{ margin: 0 }}>About this app</h2>
                    <p className="muted">
                        Frontend-only demo of a Blood Bank app built with React + Vite + styled-components.
                        Data is stored locally in your browser (localStorage). It demonstrates clean routing,
                        validated forms (React Hook Form + Zod), theming (dark/light), custom toasts, and a
                        localStorage-backed API layer with seeded donors.
                    </p>
                    <div className="btns">
                        <Link className="btn primary" to="/donors">Find Donors</Link>
                        <Link className="btn" to="/register">Register as Donor</Link>
                        <Link className="btn" to="/contact">Contact</Link>
                    </div>
                </div>

                {/* About me */}
                <div className="card section">
                    <h2 style={{ margin: 0 }}>About the maintainer</h2>
                    <h3 style={{ margin: '2px 0 6px' }}>{INFO.name} — {INFO.title}</h3>
                    <p className="muted">{INFO.summary}</p>
                    <p className="muted">
                        <strong>Availability:</strong> {INFO.availability}<br />
                        <strong>Location:</strong> {INFO.location}<br />
                    </p>

                    <div>
                        <strong>Skills</strong>
                        <div className="chips">
                            {INFO.skills.map(s => <span key={s} className="chip">{s}</span>)}
                        </div>
                    </div>

                    <div style={{ marginTop: 10 }}>
                        <strong>Highlights</strong>
                        <ul className="list">
                            {INFO.highlights.map(h => <li key={h} className="muted">{h}</li>)}
                        </ul>
                    </div>

                    <div className="btns">
                        <a className="btn primary" href={L.resume} target="_blank" rel="noreferrer">View Resume</a>
                        <a className="btn" href={L.portfolio} target="_blank" rel="noreferrer">Portfolio</a>
                        <a className="btn" href={L.github} target="_blank" rel="noreferrer">GitHub</a>
                        <a className="btn" href={L.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
                        <a className="btn" href={L.email}>Email me</a>
                    </div>
                </div>

                {/* Split grid */}
                <div className="grid">
                    <div className="card section">
                        <h3 style={{ margin: 0 }}>How data works</h3>
                        <p className="muted">
                            Donors & messages are saved to <code>localStorage</code> under keys
                            <code> bb_donors_v1</code> and <code> bb_messages_v1</code>. Clear browser storage to reset.
                        </p>
                    </div>
                    <div className="card section">
                        <h3 style={{ margin: 0 }}>Roadmap</h3>
                        <ul className="list">
                            <li className="muted">Donor detail route + shareable link</li>
                            <li className="muted">Backup/restore (JSON import/export)</li>
                            <li className="muted">PWA offline support</li>
                            <li className="muted">Role-based admin area (when backend added)</li>
                        </ul>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}
