import React, { createContext, useCallback, useContext, useRef, useState } from 'react'
import styled from 'styled-components'

const ConfirmCtx = createContext(null)
export function useConfirm() { return useContext(ConfirmCtx) }

export function ConfirmProvider({ children }) {
    const [open, setOpen] = useState(false)
    const [opts, setOpts] = useState({})
    const resolver = useRef(null)

    const confirm = useCallback((options = {}) => {
        setOpts(options)
        setOpen(true)
        return new Promise(resolve => { resolver.current = resolve })
    }, [])

    const resolve = useCallback((val) => {
        setOpen(false)
        const fn = resolver.current
        resolver.current = null
        if (fn) fn(val)
    }, [])

    return (
        <ConfirmCtx.Provider value={confirm}>
            {children}
            {open && (
                <Overlay onClick={() => resolve(false)}>
                    <Box onClick={(e) => e.stopPropagation()}>
                        <h3 style={{ margin: '0 0 6px' }}>{opts.title || 'Are you sure?'}</h3>
                        {opts.message && <p className="muted">{opts.message}</p>}
                        <Actions>
                            <Btn onClick={() => resolve(false)}>{opts.cancelText || 'Cancel'}</Btn>
                            <Btn className="danger" onClick={() => resolve(true)}>
                                {opts.confirmText || 'Confirm'}
                            </Btn>
                        </Actions>
                    </Box>
                </Overlay>
            )}
        </ConfirmCtx.Provider>
    )
}

const Overlay = styled.div`
  position: fixed; inset: 0; z-index: 1000;
  background: rgba(0,0,0,.5);
  display: flex; align-items: center; justify-content: center;
`

const Box = styled.div`
  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.fg};
  border: 1px solid ${({ theme }) => theme.border};
  width: min(520px, calc(100% - 32px));
  border-radius: 16px; padding: 18px; box-shadow: var(--shadow);
  .muted { color: ${({ theme }) => theme.muted}; margin: 0; }
`

const Actions = styled.div`
  display: flex; justify-content: flex-end; gap: 10px; margin-top: 16px;
`

const Btn = styled.button`
  padding: 10px 14px; border-radius: 10px; cursor: pointer;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.card};
  &.danger { background: #ef4444; color: #fff; border-color: transparent; }
`
