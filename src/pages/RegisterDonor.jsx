import React from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { createDonor } from '../services/api.js'
import { useToast } from '../components/Toast.jsx'
import { useNavigate } from 'react-router-dom'

const bloodGroups = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-']

const schema = z.object({
    name: z.string().min(2, 'Name is too short'),
    age: z.coerce.number().int().min(18, 'Must be 18+').max(65, '65 max'),
    gender: z.enum(['Male', 'Female', 'Other']),
    bloodGroup: z.enum(['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-']),
    phone: z.string().regex(/^\d{10}$/, '10-digit phone only'),
    email: z.string().email(),
    city: z.string().min(2, 'City required'),
    lastDonationDate: z.string().optional(),
    available: z.boolean().default(true),
    notes: z.string().max(200).optional(),
})

const Wrapper = styled.div`
  .card { background:${({ theme }) => theme.card}; border:1px solid ${({ theme }) => theme.border}; border-radius: var(--radius); padding: 16px; }
  form { display:grid; gap:12px; }
  .row { display:grid; grid-template-columns: 1fr 1fr; gap:12px; }
  @media (max-width: 900px) { .row { grid-template-columns: 1fr; } }
  label { display:grid; gap:6px; }
  input, select, textarea { padding:10px 12px; border-radius:10px; border:1px solid ${({ theme }) => theme.border}; background: ${({ theme }) => theme.bg}; }
  .err { color:#ef4444; font-size: 12px; }
  .btns { display:flex; gap:12px; }
  .btn { padding: 3px 15px; border-radius: 6px; border:1px solid ${({ theme }) => theme.border}; background:${({ theme }) => theme.card}; cursor:pointer; }
  .primary { background: ${({ theme }) => theme.primary}; color: ${({ theme }) => theme.primaryFg}; border-color: transparent; }
`

export default function RegisterDonor() {
    const { push } = useToast()
    const nav = useNavigate()
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
        resolver: zodResolver(schema),
        defaultValues: { gender: 'Male', bloodGroup: 'O+', available: true }
    })

    const onSubmit = async (values) => {
        await createDonor(values)
        push('Donor registered!', 'success')
        reset()
        nav('/donors')
    }

    return (
        <Wrapper className="container">
            <div className="card">
                <h2 style={{ marginTop: 0 }}>Register as a Donor</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        <label>Full Name
                            <input placeholder="Your full name" {...register('name')} />
                            {errors.name && <span className="err">{errors.name.message}</span>}
                        </label>
                        <label>Age
                            <input type="number" placeholder="Age" {...register('age')} />
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
                                {bloodGroups.map(g => <option key={g}>{g}</option>)}
                            </select>
                            {errors.bloodGroup && <span className="err">{errors.bloodGroup.message}</span>}
                        </label>
                    </div>

                    <div className="row">
                        <label>Phone
                            <input placeholder="10-digit mobile" {...register('phone')} />
                            {errors.phone && <span className="err">{errors.phone.message}</span>}
                        </label>
                        <label>Email
                            <input placeholder="Email address" {...register('email')} />
                            {errors.email && <span className="err">{errors.email.message}</span>}
                        </label>
                    </div>

                    <div className="row">
                        <label>City
                            <input placeholder="City" {...register('city')} />
                            {errors.city && <span className="err">{errors.city.message}</span>}
                        </label>
                        <label>Last Donation Date (optional)
                            <input type="date" {...register('lastDonationDate')} />
                        </label>
                    </div>

                    <div className="row">
                        <label style={{ alignItems: 'center', gridTemplateColumns: '20px 1fr' }}>
                            <input type="checkbox" {...register('available')} /> Available to donate
                        </label>
                        <label>Notes
                            <input placeholder="Any notes (optional)" {...register('notes')} />
                        </label>
                    </div>

                    <div className="btns">
                        <button className="btn primary" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Saving...' : 'Submit'}</button>
                        <button className="btn" type="button" onClick={() => nav('/donors')}>Cancel</button>
                    </div>
                </form>
            </div>
        </Wrapper>
    )
}
