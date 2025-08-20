import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { listDonors, updateDonor } from '../services/api.js'
import { Link, useSearchParams } from 'react-router-dom'
import Modal from '../components/Modal.jsx'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '../components/Toast.jsx'

const bloodGroups = ['ALL', 'O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-']

const schema = z.object({
    name: z.string().min(2, 'Name is too short'),
    age: z.coerce.number().int().min(18, 'Must be 18+').max(65, '65 max'),
    gender: z.enum(['Male', 'Female', 'Other']),
    bloodGroup: z.enum(['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-']),
    phone: z.string().regex(/^\d{10}$/, '10-digit phone only'),
    email: z.string().email(),
    city: z.string().min(2, 'City required'),
    lastDonationDate: z.string().optional().nullable(),
    available: z.boolean().default(true),
    notes: z.string().max(200).optional().nullable(),
})

const Wrapper = styled.div`
  .panel { background: ${({ theme }) => theme.card}; border: 1px solid ${({ theme }) => theme.border}; border-radius: var(--radius); padding: 16px; margin-bottom: 16px; }
  .filters { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
  @media (max-width: 900px) { .filters { grid-template-columns: 1fr 1fr; } }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 14px; }
  .card { background: ${({ theme }) => theme.card}; border:1px solid ${({ theme }) => theme.border}; border-radius: var(--radius); padding: 14px; display: grid; gap: 8px; cursor: pointer; }
  .card:hover { outline: 2px solid ${({ theme }) => theme.primary}; outline-offset: 2px; }
  .badge { display:inline-block; padding:6px 10px; border-radius:999px; background:${({ theme }) => theme.primary}; color:${({ theme }) => theme.primaryFg}; }
  .muted { color: ${({ theme }) => theme.muted}; }
  .btn { padding: 8px 12px; border-radius: 10px; border: 1px solid ${({ theme }) => theme.border}; background: ${({ theme }) => theme.card}; cursor: pointer; }

  /* Modal form styles */
  form { display:grid; gap:12px; }
  .row { display:grid; grid-template-columns: 1fr 1fr; gap:12px; }
  @media (max-width: 900px) { .row { grid-template-columns: 1fr; } }
  label { display:grid; gap:6px; }
  input, select, textarea { padding:10px 12px; border-radius:10px; border:1px solid ${({ theme }) => theme.border}; background: ${({ theme }) => theme.bg}; color: inherit; }
  .err { color:#ef4444; font-size: 12px; }
`

function useQueryState() {
    const [sp, setSp] = useSearchParams()
    const get = (k, def = '') => sp.get(k) ?? def
    const set = (next) => setSp(prev => {
        const o = new URLSearchParams(prev)
        Object.entries(next).forEach(([k, v]) => v === undefined ? o.delete(k) : o.set(k, v))
        return o
    })
    return [sp, get, set]
}

export default function Donors() {
    const [sp, get, set] = useQueryState()
    const [data, setData] = useState([])
    const [selected, setSelected] = useState(null) // donor object
    const { push } = useToast()

    const state = useMemo(() => ({
        q: get('q', ''),
        bloodGroup: get('g', 'ALL'),
        city: get('c', ''),
        available: get('a', 'ALL'),
    }), [sp])

    useEffect(() => { listDonors(state).then(setData) }, [state])

    // --- Edit form (inside modal)
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(schema),
    })

    // when modal opens, hydrate form with selected donor
    useEffect(() => {
        if (!selected) return
        reset({
            name: selected.name,
            age: selected.age,
            gender: selected.gender,
            bloodGroup: selected.bloodGroup,
            phone: selected.phone,
            email: selected.email,
            city: selected.city,
            lastDonationDate: selected.lastDonationDate || '',
            available: !!selected.available,
            notes: selected.notes || '',
        })
    }, [selected, reset])

    const onSave = async (values) => {
        if (!selected) return
        const updated = await updateDonor(selected.id, values)
        // update list in place:
        setData(prev => prev.map(d => d.id === updated.id ? updated : d))
        push('Donor updated', 'success')
        setSelected(null)
    }

    return (
        <Wrapper className="container">
            <div className="panel">
                <div className="filters">
                    <input placeholder="Search name/phone/email" value={state.q} onChange={e => set({ q: e.target.value })} />
                    <select value={state.bloodGroup} onChange={e => set({ g: e.target.value })}>
                        {bloodGroups.map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                    <input placeholder="City" value={state.city} onChange={e => set({ c: e.target.value })} />
                    <select value={state.available} onChange={e => set({ a: e.target.value })}>
                        <option value="ALL">Availability</option>
                        <option value="YES">Available</option>
                        <option value="NO">Unavailable</option>
                    </select>
                </div>
            </div>

            <div className="grid">
                {data.map(d => (
                    <div className="card" key={d.id} onClick={() => setSelected(d)}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ margin: 0 }}>{d.name}</h3>
                            <span className="badge">{d.bloodGroup}</span>
                        </div>
                        <div className="muted">{d.city}</div>
                        <div>📞 {d.phone}</div>
                        <div>✉️ {d.email}</div>
                        <div className="muted">{d.available ? '✅ Available' : '⛔ Unavailable'}</div>
                    </div>
                ))}
            </div>

            <div style={{ margin: '16px 0' }}>
                <Link className="btn" to="/register">+ Register new donor</Link>
            </div>

            {/* Donor Details + Edit Modal */}
            <Modal
                open={!!selected}
                onClose={() => setSelected(null)}
                title={selected ? `Donor: ${selected.name}` : 'Donor'}
                footer={
                    <>
                        <button className="btn" onClick={() => setSelected(null)}>Close</button>
                        <button className="btn" onClick={handleSubmit(onSave)} disabled={isSubmitting}>
                            {isSubmitting ? 'Saving…' : 'Save changes'}
                        </button>
                    </>
                }
            >
                {selected && (
                    <form onSubmit={handleSubmit(onSave)}>
                        <div className="row">
                            <label>Full Name
                                <input {...register('name')} />
                                {errors.name && <span className="err">{errors.name.message}</span>}
                            </label>
                            <label>Age
                                <input type="number" {...register('age')} />
                                {errors.age && <span className="err">{errors.age.message}</span>}
                            </label>
                        </div>

                        <div className="row">
                            <label>Gender
                                <select {...register('gender')}>
                                    <option>Male</option><option>Female</option><option>Other</option>
                                </select>
                                {errors.gender && <span className="err">{errors.gender.message}</span>}
                            </label>
                            <label>Blood Group
                                <select {...register('bloodGroup')}>
                                    {bloodGroups.filter(g => g !== 'ALL').map(g => <option key={g}>{g}</option>)}
                                </select>
                                {errors.bloodGroup && <span className="err">{errors.bloodGroup.message}</span>}
                            </label>
                        </div>

                        <div className="row">
                            <label>Phone
                                <input {...register('phone')} />
                                {errors.phone && <span className="err">{errors.phone.message}</span>}
                            </label>
                            <label>Email
                                <input {...register('email')} />
                                {errors.email && <span className="err">{errors.email.message}</span>}
                            </label>
                        </div>

                        <div className="row">
                            <label>City
                                <input {...register('city')} />
                                {errors.city && <span className="err">{errors.city.message}</span>}
                            </label>
                            <label>Last Donation Date
                                <input type="date" {...register('lastDonationDate')} />
                            </label>
                        </div>

                        <div className="row">
                            <label style={{ alignItems: 'center', gridTemplateColumns: '20px 1fr' }}>
                                <input type="checkbox" {...register('available')} /> Available to donate
                            </label>
                            <label>Notes
                                <input {...register('notes')} />
                            </label>
                        </div>
                    </form>
                )}
            </Modal>
        </Wrapper>
    )
}
