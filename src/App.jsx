import React, { createElement, lazy, Suspense } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { GlobalStyles } from './styles/GlobalStyles.js'
import { lightTheme, darkTheme } from './styles/theme.js'
import { useLocalStorage } from './utils/useLocalStorage.js'
import Navbar from './components/Navbar.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import { ToastProvider } from './components/Toast.jsx'
import { styled } from "styled-components";
import { ConfirmProvider } from './components/ConfirmDialog.jsx'
import {
    FaCodepen,
    FaFacebook,
    FaGithub,
    FaGlobe,
    FaLinkedin,
    FaPatreon,
    FaYoutube,
} from 'react-icons/fa6'
import { FiCoffee, FiHeart, FiMail } from 'react-icons/fi'

const footerLinks = [
    { label: 'Portfolio', href: 'https://www.ashishranjan.net/', icon: FaGlobe },
    { label: 'GitHub', href: 'https://github.com/a2rp', icon: FaGithub },
    { label: 'CodePen', href: 'https://codepen.io/ash1198', icon: FaCodepen },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/aashishranjan', icon: FaLinkedin },
    { label: 'Facebook', href: 'https://www.facebook.com/theash.ashish/', icon: FaFacebook },
    { label: 'YouTube', href: 'https://www.youtube.com/@ashishranjan-ashz?sub_confirmation=1', icon: FaYoutube },
    { label: 'Email', href: 'mailto:ash.ranjan09@gmail.com', icon: FiMail },
    { label: 'Support', href: 'https://a2rp-donation-page.netlify.app/', icon: FiHeart },
    { label: 'Buy Me A Coffee', href: 'https://buymeacoffee.com/a2rp', icon: FiCoffee },
    { label: 'Patreon', href: 'https://www.patreon.com/a2rp', icon: FaPatreon },
]

const Home = lazy(() => import('./pages/Home.jsx'))
const Donors = lazy(() => import('./pages/Donors.jsx'))
const RegisterDonor = lazy(() => import('./pages/RegisterDonor.jsx'))
const About = lazy(() => import('./pages/About.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))

function RouteLoader() {
    return <Styled.Loader role="status" aria-label="Loading page"><span /></Styled.Loader>
}

function AppRoutes() {
    const location = useLocation()
    return (
        <Suspense key={location.pathname} fallback={<RouteLoader />}>
            <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/donors" element={<Donors />} />
                <Route path="/register" element={<RegisterDonor />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Suspense>
    )
}

export default function App() {
    const [mode, setMode] = useLocalStorage('theme', 'dark')
    const theme = mode === 'dark' ? darkTheme : lightTheme

    return (
        <ThemeProvider theme={theme}>
            <ToastProvider>
                <GlobalStyles />
                <ConfirmProvider>
                    <Styled.Wrapper>
                        <ScrollToTop />
                        <Navbar mode={mode} setMode={setMode} />
                        <Styled.Main>
                            <AppRoutes />
                        </Styled.Main>
                        <Styled.Footer>
                            <Styled.FooterMain>
                                <Styled.Copyright>
                                    Copyright &copy; {new Date().getFullYear()} {' '}
                                    <a href="https://www.ashishranjan.net/" target="_blank" rel="noopener noreferrer">
                                        Ashish Ranjan
                                    </a>
                                </Styled.Copyright>
                                <Styled.Links aria-label="Social and support links">
                                    {footerLinks.map(({ label, href, icon }) => (
                                        <Styled.FooterLink
                                            key={label}
                                            href={href}
                                            target={href.startsWith('mailto:') ? undefined : '_blank'}
                                            rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                                            aria-label={label}
                                            title={label}
                                        >
                                            {createElement(icon, { 'aria-hidden': true })}
                                        </Styled.FooterLink>
                                    ))}
                                </Styled.Links>
                            </Styled.FooterMain>
                        </Styled.Footer>
                    </Styled.Wrapper>
                </ConfirmProvider>
            </ToastProvider>
        </ThemeProvider>
    )
}

const Styled = {
    Wrapper: styled.div`
        background-color: ${({ theme }) => theme.name === 'dark' ? 'rgba(11,18,32,.7)' : 'rgba(247,248,250,.7)'};
        min-height: 100vh;
    `,
    Main: styled.main`
        width: calc(100% - 280px);
        margin-left: 280px;
        padding: 92px 50px 32px;
        @media (width<900px) {
            width: 100%;
            margin-left: 0;
            padding: 84px 15px 24px;
        }
    `,
    Footer: styled.footer`
        width: calc(100% - 280px);
        margin-left: 280px;
        border-top: 1px solid ${({ theme }) => theme.border};
        background: ${({ theme }) => theme.bg};
        color: ${({ theme }) => theme.muted};
        @media (width < 900px) {
            width: 100%;
            margin-left: 0;
        }
    `,
    FooterMain: styled.div`
        width: 100%;
        max-width: 1440px;
        margin: 0 auto;
        padding: 16px 50px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        @media (width < 900px) {
            padding: 16px;
            flex-direction: column;
            align-items: flex-start;
        }
    `,
    Copyright: styled.p`
        margin: 0;
        font-size: .8rem;
        a {
            color: ${({ theme }) => theme.fg};
            font-weight: 700;
        }
    `,
    Links: styled.nav`
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
        gap: 8px;
    `,
    FooterLink: styled.a`
        width: 34px;
        height: 34px;
        display: grid;
        place-items: center;
        border: 1px solid ${({ theme }) => theme.border};
        border-radius: 9px;
        color: ${({ theme }) => theme.muted};
        transition: border-color .2s ease, box-shadow .2s ease, text-shadow .2s ease;
        svg { width: 16px; height: 16px; }
        &:hover {
            border-color: ${({ theme }) => theme.fg};
            box-shadow: 0 0 14px ${({ theme }) => theme.border};
            text-shadow: 0 0 8px ${({ theme }) => theme.fg};
        }
    `,
    Loader: styled.div`
        min-height: 60vh;
        display: grid;
        place-items: center;
        span {
            width: 36px;
            height: 36px;
            border: 3px solid ${({ theme }) => theme.border};
            border-top-color: ${({ theme }) => theme.fg};
            border-radius: 50%;
            animation: spin .7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
    `,
};

