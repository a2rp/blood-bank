import React, { lazy, Suspense } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { GlobalStyles } from './styles/GlobalStyles.js'
import { lightTheme, darkTheme } from './styles/theme.js'
import { useLocalStorage } from './utils/useLocalStorage.js'
import Navbar from './components/Navbar.jsx'
import { ToastProvider } from './components/Toast.jsx'
import { styled } from "styled-components";
import { ConfirmProvider } from './components/ConfirmDialog.jsx'

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
                        <Navbar mode={mode} setMode={setMode} />
                        <Styled.Main>
                            <AppRoutes />
                        </Styled.Main>
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

