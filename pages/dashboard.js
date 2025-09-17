import { useState } from 'react'

export default function Dashboard() {
  const [title, setTitle] = useState('Client intake')
  const [rawFields, setRawFields] = useState('name\nemail\ncompany')
  const [creating, setCreating] = useState(false)
  const [created, setCreated] = useState(null)
  const [error, setError] = useState('')

  const createForm = async () => {
    setError('')
    setCreating(true)
    try {
      const fields = rawFields.split('\n').map(s => s.trim()).filter(Boolean)
      const r = await fetch('/api/forms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, fields }),
      })
      const data = await r.json()
      if (!r.ok) throw new Error(data.error || 'Failed to create form')
      setCreated(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setCreating(false)
    }
  }

  const shareUrl = created ? `${typeof window !== 'undefined' ? window.location.origin : ''}/f/${created.public_id}` : ''

  return (
    <div style={{ padding: 24, fontFamily: 'system-ui, sans-serif' }}>
      <h1>Create a form</h1>

      <label>Title</label><br/>
      <input
        style={{ width: 360, padding: 8, marginTop: 4, marginBottom: 12 }}
        value={title} onChange={e=>setTitle(e.target.value)} placeholder="Client intake"
      /><br/>

      <label>Fields (one per line)</label><br/>
      <textarea
        style={{ width: 360, height: 140, padding: 8, marginTop: 4 }}
        value={rawFields} onChange={e=>setRawFields(e.target.value)}
      />

      {error && <p style={{ color: 'crimson' }}>{error}</p>}

      <div style={{ marginTop: 12 }}>
        <button onClick={createForm} disabled={creating}
          style={{ padding: '8px 14px', background: '#111', color: '#fff', borderRadius: 8 }}>
          {creating ? 'Creating…' : 'Create form'}
        </button>
      </div>

      {created && (
        <div style={{ marginTop: 20, paddingTop: 12, borderTop: '1px solid #e5e7eb' }}>
          <p>Form created ✅</p>
          <div><code>id: {created.id}</code></div>
          <div><code>share: /f/{created.public_id}</code></div>
          <div style={{ marginTop: 8 }}>
            <label>Embed (iframe)</label>
            <textarea readOnly style={{ width: 360, height: 80, padding: 8 }} value={`<iframe src="${shareUrl}" width="420" height="360" style="border:0;"></iframe>`} />
          </div>
          <p><a href={`/f/${created.public_id}`} target="_blank" rel="noreferrer">Open fill page →</a></p>
        </div>
      )}
    </div>
  )
}
