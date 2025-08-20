import React, { useEffect } from 'react'
import styled from 'styled-components'

export default function Modal({ open, title, onClose, children, footer }) {
    useEffect(() => {
        if (!open) return
        const onKey = (e) => e.key === 'Escape' && onClose?.()
        document.addEventListener('keydown', onKey)
        return () => document.removeEventListener('keydown', onKey)
    }, [open, onClose])

    if (!open) return null

    return (
        <Styled.Overlay onClick={onClose}>
            <Styled.Box onClick={(e) => e.stopPropagation()}>
                <Styled.Header>
                    <h3>{title}</h3>
                    <Styled.Close onClick={onClose} aria-label="Close">×</Styled.Close>
                </Styled.Header>
                <Styled.Body>{children}</Styled.Body>
                {footer && <Styled.Footer>{footer}</Styled.Footer>}
            </Styled.Box>
        </Styled.Overlay>
    )
}

const Styled = {
    Overlay: styled.div`
    position: fixed; inset: 0; z-index: 1000;
    background: rgba(0,0,0,.5);
    display: flex; align-items: center; justify-content: center;
    padding: 16px;
  `,
    Box: styled.div`
    background: ${({ theme }) => theme.card};
    color: ${({ theme }) => theme.fg};
    border: 1px solid ${({ theme }) => theme.border};
    width: min(680px, 100%);
    border-radius: 16px; box-shadow: var(--shadow);
    display: grid; grid-template-rows: auto 1fr auto;
  `,
    Header: styled.div`
    padding: 14px 16px; border-bottom: 1px solid ${({ theme }) => theme.border};
    display: flex; align-items: center; justify-content: space-between;
    h3 { margin: 0; }
  `,
    Body: styled.div`
    padding: 16px; max-height: 70vh; overflow: auto;
  `,
    Footer: styled.div`
    padding: 12px 16px; border-top: 1px solid ${({ theme }) => theme.border};
    display: flex; justify-content: flex-end; gap: 10px;
  `,
    Close: styled.button`
    border: 1px solid ${({ theme }) => theme.border};
    background: ${({ theme }) => theme.card};
    border-radius: 8px; padding: 4px 10px; cursor: pointer;
  `,
}
