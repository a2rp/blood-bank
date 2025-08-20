import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'
import styled, { keyframes } from 'styled-components'
const ToastContext = createContext(null)
export function useToast() { return useContext(ToastContext) }

const pop = keyframes`from { transform: translateY(10px); opacity: 0; } to { transform: translateY(0); opacity: 1; }`
const Tray = styled.div`position: fixed; right: 20px; bottom: 20px; z-index: 1000; display: grid; gap: 10px;`
const Item = styled.div`
  background: ${({ theme, $type }) => $type === 'error' ? '#ef4444' : ($type === 'success' ? '#22c55e' : theme.card)};
  color: ${({ theme, $type }) => $type ? '#fff' : theme.fg};
  border: 1px solid ${({ theme }) => theme.border};
  padding: 12px 14px; border-radius: 12px; min-width: 220px;
  box-shadow: var(--shadow); animation: ${pop} .16s ease-out;
`

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([])
    const push = useCallback((msg, type = 'info', timeout = 2400) => {
        const id = Math.random().toString(36).slice(2)
        setToasts(t => [...t, { id, msg, type }])
        if (timeout) setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), timeout)
    }, [])
    const value = useMemo(() => ({ push }), [push])
    return (
        <ToastContext.Provider value={value}>
            {children}
            <Tray>{toasts.map(t => <Item key={t.id} $type={t.type}>{t.msg}</Item>)}</Tray>
        </ToastContext.Provider>
    )
}
