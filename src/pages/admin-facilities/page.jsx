import { useFetch } from '../../hooks/useFetch'
import { useMutate } from '../../hooks/useFetch'
import { useState } from 'react'
import { Building2, Plus, Pencil, Trash2, RefreshCw } from 'lucide-react'

export default function AdminFacilitiesPage() {
  const { data, loading, refetch } = useFetch('/facilities')
  const { mutate } = useMutate()
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ name: '', sport: '', location: '', description: '' })

  const facilities = data?.facilities || []

  const handleSave = async () => {
    try {
      if (editing) {
        await mutate('put', `/facilities/${editing.id}`, form)
      } else {
        await mutate('post', '/facilities', form)
      }
      setShowForm(false)
      setEditing(null)
      setForm({ name: '', sport: '', location: '', description: '' })
      refetch()
    } catch {}
  }

  const handleEdit = (f) => {
    setEditing(f)
    setForm({ name: f.name, sport: f.sport, location: f.location, description: f.description || '' })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this facility?')) return
    try { await mutate('delete', `/facilities/${id}`) } catch (e) { console.error('Delete failed:', e) }
    refetch()
  }

  const openCreate = () => {
    setEditing(null)
    setForm({ name: '', sport: '', location: '', description: '' })
    setShowForm(true)
  }

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <RefreshCw className="w-6 h-6 text-gray-400 animate-spin" />
    </div>
  )

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Building2 className="w-6 h-6 text-cyan-400" />
            Facilities
          </h1>
          <p className="text-gray-400 text-sm mt-1">Manage all sports facilities across the platform.</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-cyan-500/20 text-cyan-400 px-4 py-2 rounded-xl text-sm font-medium hover:bg-cyan-500/30 transition-colors">
          <Plus className="w-4 h-4" />
          Add Facility
        </button>
      </div>

      {showForm && (
        <div className="mb-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 max-w-lg">
          <h3 className="text-white font-semibold mb-4">{editing ? 'Edit Facility' : 'New Facility'}</h3>
          <div className="space-y-4">
            <input type="text" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white/20" />
            <input type="text" placeholder="Sport" value={form.sport} onChange={e => setForm({ ...form, sport: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white/20" />
            <input type="text" placeholder="Location" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white/20" />
            <textarea placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={2} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white/20 resize-none" />
            <div className="flex gap-3">
              <button onClick={handleSave} className="bg-cyan-500/20 text-cyan-400 px-4 py-2 rounded-xl text-sm font-medium hover:bg-cyan-500/30 transition-colors">Save</button>
              <button onClick={() => { setShowForm(false); setEditing(null) }} className="text-gray-400 px-4 py-2 rounded-xl text-sm hover:text-white transition-colors">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {facilities.length === 0 ? (
        <div className="border-2 border-dashed border-gray-800 bg-transparent rounded-2xl p-12 flex flex-col items-center justify-center">
          <Building2 className="text-gray-600 w-12 h-12 mb-4" />
          <p className="text-gray-400 text-center">No facilities yet.</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {facilities.map(f => (
            <div key={f.id} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 flex items-center justify-between transition-all duration-200 hover:border-white/20">
              <div>
                <h3 className="text-white font-medium">{f.name}</h3>
                <p className="text-sm text-gray-400">{f.sport} — {f.location}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(f)} className="text-gray-400 hover:text-white p-2 transition-colors"><Pencil className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(f.id)} className="text-gray-400 hover:text-red-400 p-2 transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
