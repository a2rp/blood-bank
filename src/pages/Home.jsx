import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getStats } from '../services/api.js'
import { Link, NavLink } from 'react-router-dom'

const Wrapper = styled.div`
  .hero { padding: 64px 24px; background: linear-gradient(180deg, rgba(244,63,94,0.08), transparent 60%); }
  .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; }
  .card { background: ${({ theme }) => theme.card}; border: 1px solid ${({ theme }) => theme.border}; border-radius: var(--radius); padding: 18px; box-shadow: var(--shadow); }
  .badge { display: inline-block; padding: 3px 15px; border-radius: 6px; background: ${({ theme }) => theme.primary}; color: ${({ theme }) => theme.primaryFg}; font-weight: 700; }
  .cta { display: flex; gap: 12px; margin-top: 16px; }
  .btn { padding: 3px 15px; border-radius: 6px; border: 1px solid ${({ theme }) => theme.border}; background: ${({ theme }) => theme.card}; cursor: pointer; }
`

export default function Home() {
    const [stats, setStats] = useState({ total: 0, available: 0, groups: {} })
    useEffect(() => { getStats().then(setStats) }, [])
    return (
        <Wrapper>
            <div className="container hero">
                <span className="badge">Give blood, save lives</span>
                <h1 style={{ margin: '10px 0 6px' }}>Find and Register Blood Donors</h1>
                <p style={{ margin: '0 0 14px', color: 'var(--muted)' }}>Frontend-only demo app. Data is stored in your browser (localStorage).</p>
                <div className="cta">
                    <NavLink className="btn primary" to="/donors">Find Donors</NavLink>
                    <NavLink className="btn" to="/register">Register as Donor</NavLink>
                </div>
            </div>

            <div className="container">
                <div className="grid">
                    <div className="card"><h3>Total Donors</h3><p style={{ fontSize: 34, margin: '6px 0' }}>{stats.total}</p></div>
                    <div className="card"><h3>Available Now</h3><p style={{ fontSize: 34, margin: '6px 0' }}>{stats.available}</p></div>
                    <div className="card">
                        <h3>By Group</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))', gap: 8 }}>
                            {Object.entries(stats.groups).map(([g, n]) => (
                                <div key={g} className="card" style={{ padding: 12 }}>
                                    <div style={{ fontWeight: 800 }}>{g}</div><div>{n}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}
