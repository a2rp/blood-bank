import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { sendMessage, listMessages, deleteMessage, clearAllMessages } from '../services/api.js'
import { useToast } from '../components/Toast.jsx'
import { useConfirm } from '../components/ConfirmDialog.jsx'

const schema = z.object({
    name: z.string().min(2, 'Name too short'),
    email: z.string().email(),
    message: z.string().min(10, 'Tell us a bit more...'),
})

const Wrapper = styled.div`
  .card { background:${({ theme }) => theme.card}; border:1px solid ${({ theme }) => theme.border}; border-radius: var(--radius); padding: 16px; }
  form { display:grid; gap:12px; }
  label { display:grid; gap:6px; }
  input, textarea { padding:10px 12px; border-radius:10px; border:1px solid ${({ theme }) => theme.border}; background: ${({ theme }) => theme.bg}; }
  .err { color:#ef4444; font-size: 12px; }
  .btn { padding:10px 14px; border-radius:10px; border:1px solid ${({ theme }) => theme.border}; background:${({ theme }) => theme.card}; cursor:pointer; }
  .primary { background: ${({ theme }) => theme.primary}; color: ${({ theme }) => theme.primaryFg}; border-color: transparent; }

  /* Messages panel */
  .panel { margin-top: 18px; display: grid; gap: 12px; }
  .panelHead { display:flex; align-items:center; justify-content: space-between; gap: 12px; }
  .muted { color: ${({ theme }) => theme.muted}; }
  .row { display:grid; gap: 10px; }
  .msg {
    background:${({ theme }) => theme.card};
    border:1px solid ${({ theme }) => theme.border};
    border-radius: 12px; padding: 12px;
    display: grid; gap: 6px;
  }
  .msgTop { display:flex; align-items:center; justify-content: space-between; gap: 10px; }
  .chip { padding: 4px 8px; border-radius: 999px; border:1px solid ${({ theme }) => theme.border}; }
  .toolbar { display:flex; gap: 8px; }
`

export default function Contact() {
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({ resolver: zodResolver(schema) })
    const { push } = useToast()
    const [msgs, setMsgs] = useState([])
    const [loading, setLoading] = useState(true)

    async function refresh() {
        setLoading(true)
        const data = await listMessages()
        setMsgs(data)
        setLoading(false)
    }

    useEffect(() => { refresh() }, [])

    const onSubmit = async (values) => {
        await sendMessage(values)
        push('Message sent!', 'success')
        reset()
        refresh()
    }

    const confirm = useConfirm();

    const onDelete = async (id) => {
        const ok = await confirm({
            title: 'Delete this message?',
            message: 'This action cannot be undone.',
            confirmText: 'Delete',
            cancelText: 'Cancel',
        })
        if (!ok) return
        await deleteMessage(id)
        push('Deleted', 'success')
        refresh()
    }

    const onClearAll = async () => {
        const ok = await confirm({
            title: 'Clear all messages?',
            message: 'This will permanently remove all stored messages from this browser.',
            confirmText: 'Clear all',
            cancelText: 'Keep',
        })
        if (!ok) return
        await clearAllMessages()
        push('All messages cleared', 'success')
        refresh()
    }

    return (
        <Wrapper className="container">
            <div className="card">
                <h2>Contact Us</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label>Name
                        <input {...register('name')} placeholder="Your name" />
                        {errors.name && <span className="err">{errors.name.message}</span>}
                    </label>
                    <label>Email
                        <input {...register('email')} placeholder="you@example.com" />
                        {errors.email && <span className="err">{errors.email.message}</span>}
                    </label>
                    <label>Message
                        <textarea rows="5" {...register('message')} placeholder="How can we help?" />
                        {errors.message && <span className="err">{errors.message.message}</span>}
                    </label>
                    <button className="btn primary" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Sending...' : 'Send'}
                    </button>
                </form>

                {/* Messages panel */}
                <div className="panel">
                    <div className="panelHead">
                        <div className="muted">
                            {loading ? 'Loading messages…' : `${msgs.length} message${msgs.length !== 1 ? 's' : ''}`}
                        </div>
                        <div className="toolbar">
                            <button className="btn" onClick={refresh}>Refresh</button>
                            <button className="btn" onClick={onClearAll}>Clear all</button>
                        </div>
                    </div>

                    <div className="row">
                        {msgs.map(m => (
                            <div className="msg" key={m.id}>
                                <div className="msgTop">
                                    <strong>{m.name}</strong>
                                    <span className="chip">{new Date(m.at).toLocaleString()}</span>
                                </div>
                                <div className="muted">{m.email}</div>
                                <div>{m.message}</div>
                                <div className="toolbar">
                                    <button className="btn" onClick={() => onDelete(m.id)}>Delete</button>
                                </div>
                            </div>
                        ))}
                        {!loading && msgs.length === 0 && (
                            <div className="muted">No messages yet.</div>
                        )}
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}
