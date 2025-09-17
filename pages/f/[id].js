import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function FillPage() {
  const { query } = useRouter()
  const id = query.id

  const [form, setForm] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})

  useEffect(() => {
    if (!id) return
    ;(async () => {
      try {
        const r = await fetch(`/api/forms?id=${id}`)
        const ct = r.headers.get('content-type') || ''
        const data = ct.includes('application/json') ? await r.json() : null
        if (!r.ok) throw new Error(data?.error || `API error ${r.status}`)
        setForm(data)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    })()
  }, [id])

  if (loading) return <div style={{padding:20}}>Loading…</div>
  if (error)   return <div style={{padding:20, color:'crimson'}}>Error: {error}</div>
  if (!form)   return <div style={{padding:20}}>Form not found.</div>

  const fields = form?.schema?.fields || []
  const done   = step > fields.length

  const onNext = () => setStep(s => (s === 0 ? 1 : Math.min(fields.length + 1, s + 1)))
  const onChange = (f, v) => setAnswers(a => ({ ...a, [f]: v }))

  const exportCSV = () => {
    const rows = Object.entries(answers)
    const csv = ['field,answer', ...rows.map(([k,v]) => `"${k}","${(v??'').toString().replace(/"/g,'""')}"`)].join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${(form.title||'form').replace(/\s+/g,'_')}_responses.csv`
    a.click()
  }

  return (
    <div style={{ padding:20, fontFamily:'system-ui,sans-serif' }}>
      <h1>{form.title}</h1>

      {step === 0 ? (
        <>
          <p>I’ll guide you through this form. Ready?</p>
          <button onClick={onNext} style={{marginTop:12, padding:'8px 14px', background:'#111', color:'#fff', borderRadius:8}}>Start</button>
        </>
      ) : done ? (
        <>
          <p>All done — nice work.</p>
          <button onClick={exportCSV} style={{marginTop:12, padding:'8px 14px', border:'1px solid #e5e7eb', borderRadius:8}}>Export CSV</button>
        </>
      ) : (
        <>
          <div style={{marginTop:8, color:'#6b7280', fontSize:12}}>
            Step {step} of {fields.length}
          </div>
          <label style={{display:'block', fontWeight:600, marginTop:10}}>
            {fields[step-1]}
          </label>
          <input
            style={{width:360, padding:8, border:'1px solid #e5e7eb', borderRadius:8}}
            value={answers[fields[step-1]] || ''}
            onChange={e => onChange(fields[step-1], e.target.value)}
            autoFocus
          />
          <div style={{marginTop:12}}>
            <button onClick={onNext} style={{padding:'8px 14px', background:'#111', color:'#fff', borderRadius:8}}>
              {step < fields.length ? 'Next' : 'Finish'}
            </button>
          </div>
        </>
      )}
    </div>
  )
}
