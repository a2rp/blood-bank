import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { GlobalStyles } from './styles/GlobalStyles.js'
import { lightTheme, darkTheme } from './styles/theme.js'
import { useLocalStorage } from './utils/useLocalStorage.js'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Donors from './pages/Donors.jsx'
import RegisterDonor from './pages/RegisterDonor.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import { ToastProvider } from './components/Toast.jsx'
import { styled } from "styled-components";
import { ConfirmProvider } from './components/ConfirmDialog.jsx'

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
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/donors" element={<Donors />} />
                                <Route path="/register" element={<RegisterDonor />} />
                                <Route path="/about" element={<About />} />
                                <Route path="/contact" element={<Contact />} />
                                <Route path="*" element={<Navigate to="/" replace />} />
                            </Routes>
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
        /* border: 1px solid #f00; */
        max-width: 1440px;
        margin: auto;
        padding: 15px 50px;
        @media (width<900px) {
            padding: 15px;
        }
    `,
};

