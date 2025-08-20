import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { FaHeartPulse } from 'react-icons/fa6'

const Nav = styled.nav`
    position: sticky; top: 0; z-index: 100;
    backdrop-filter: blur(8px);
    background: ${({ theme }) => theme.name === 'dark' ? 'rgba(11,18,32,.7)' : 'rgba(247,248,250,.7)'};
    border-bottom: 1px solid ${({ theme }) => theme.border};
`
const Bar = styled.div`
    max-width: 1200px; margin: 0 auto; padding: 10px 24px;
    display: flex; align-items: center; gap: 16px; justify-content: space-between;
`
const Brand = styled.div`
    display: flex; align-items: center; gap: 10px;
    font-weight: 800; letter-spacing: .2px; font-size: 18px;
`
const Links = styled.div`
    display: flex; gap: 12px; align-items: center;
    a { padding: 3px 15px; border-radius: 6px; }
    a.active { background: ${({ theme }) => theme.primary}; color: ${({ theme }) => theme.primaryFg}; }
    a:hover { 
        background: ${({ theme }) => theme.name === 'dark' ? '#0f172a' : '#e5e7eb'}; 
        color: ${({ theme }) => theme.name === 'dark' ? '#fff' : '#000'};
        }
`
const Toggle = styled.button`
    border: 1px solid ${({ theme }) => theme.border};
    background: ${({ theme }) => theme.card};
    padding: 3px 15px; border-radius: 6px; cursor: pointer;
    &:hover { filter: brightness(1.05); }
`

export default function Navbar({ mode, setMode }) {
    return (
        <Nav>
            <Bar>
                <NavLink to="/"><Brand><FaHeartPulse /> Blood Bank</Brand></NavLink>
                <Links>
                    <NavLink to="/" end>Home</NavLink>
                    <NavLink to="/donors">Find Donors</NavLink>
                    <NavLink to="/register">Register</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/contact">Contact</NavLink>
                    <Toggle onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}>
                        {mode === 'dark' ? 'Light' : 'Dark'} mode
                    </Toggle>
                </Links>
            </Bar>
        </Nav>
    )
}
