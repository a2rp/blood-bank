import React, { useState } from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { FaHeartPulse } from 'react-icons/fa6'
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi'

const Nav = styled.nav`
    position: fixed; inset: 0 0 auto 0; z-index: 1000;
    width: 100%; box-sizing: border-box;
    backdrop-filter: blur(8px);
    background: ${({ theme }) => theme.name === 'dark' ? 'rgba(9,9,11,.86)' : 'rgba(244,244,245,.92)'};
    border-bottom: 1px solid ${({ theme }) => theme.border};
`
const Bar = styled.div`
    width: 100%; max-width: none; margin: 0; padding: 10px 24px;
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
        background: ${({ theme }) => theme.border};
        color: ${({ theme }) => theme.fg};
        }
`
const MenuButton = styled.button`
    display: none;
    padding: 10px;
    line-height: 1;
    @media (max-width: 900px) { display: inline-flex; }
`
const Sidebar = styled.aside`
    position: fixed; top: 62px; bottom: 0; left: 0; width: 280px;
    padding: 24px 16px; z-index: 900; overflow-y: auto;
    background: ${({ theme }) => theme.bg};
    border-right: 1px solid ${({ theme }) => theme.border};
    transform: translateX(0); transition: transform .2s ease;
    @media (max-width: 900px) { transform: translateX(${({ open }) => open ? '0' : '-100%'}); box-shadow: ${({ open }) => open ? '12px 0 30px rgba(0,0,0,.2)' : 'none'}; }
`
const SideLinks = styled.div`
    display: grid; gap: 8px;
    a { display: flex; padding: 12px 14px; border-radius: 10px; color: ${({ theme }) => theme.text}; }
    a.active { background: ${({ theme }) => theme.primary}; color: ${({ theme }) => theme.primaryFg}; }
    a:hover { background: ${({ theme }) => theme.card}; }
`
const Toggle = styled.button`
    border: 1px solid ${({ theme }) => theme.border};
    background: ${({ theme }) => theme.card};
    padding: 3px 15px; border-radius: 6px; cursor: pointer;
    &:hover { filter: brightness(1.05); }
`

export default function Navbar({ mode, setMode }) {
    const [open, setOpen] = useState(false)
    const links = [
        ['/', 'Home'], ['/donors', 'Find Donors'], ['/register', 'Register'],
        ['/about', 'About'], ['/contact', 'Contact'],
    ]
    return (
        <>
        <Nav>
            <Bar>
                <NavLink to="/"><Brand><FaHeartPulse /> Blood Bank</Brand></NavLink>
                <Links><Toggle onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')} aria-label="Toggle theme">
                    {mode === 'dark' ? <FiSun /> : <FiMoon />}<span className="mode-label">{mode === 'dark' ? 'Light' : 'Dark'}</span>
                </Toggle><MenuButton onClick={() => setOpen(v => !v)} aria-label={open ? 'Close menu' : 'Open menu'}>{open ? <FiX /> : <FiMenu />}</MenuButton></Links>
            </Bar>
        </Nav>
        <Sidebar open={open} aria-label="Main navigation"><SideLinks>{links.map(([to, label]) => <NavLink key={to} to={to} end={to === '/'} onClick={() => setOpen(false)}>{label}</NavLink>)}</SideLinks></Sidebar>
        </>
    )
}
