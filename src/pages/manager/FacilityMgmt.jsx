import { useState } from 'react'
import { useFetch, useMutate } from '../../hooks/useFetch'
import { Pencil, Trash2 } from 'lucide-react'
import Modal from '../../components/common/Modal'
import Button from '../../components/common/Button'
import DataTable from '../../components/common/DataTable'
import PageWrapper from '../../components/common/PageWrapper'

const emptyFacility = { name: '', description: '', capacity: '', pricePerHour: '', location: '', sportType: '', available: true }

export default function FacilityMgmt() {
  const { data, loading, refetch } = useFetch('/facilities')
  const { mutate } = useMutate()
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(emptyFacility)

  const facilities = data?.facilities || []

  const openCreate = () => {
    setForm(emptyFacility)
    setEditing(null)
    setModal(true)
  }

  const openEdit = (f) => {
    setForm({ ...f })
    setEditing(f.id)
    setModal(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editing) {
        await mutate('put', `/facilities/${editing}`, form)
      } else {
        await mutate('post', '/facilities', form)
      }
      setModal(false)
      refetch()
    } catch {}
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this facility?')) return
    try {
      await mutate('delete', `/facilities/${id}`)
      refetch()
    } catch {}
  }

  const update = (f, v) => setForm(p => ({ ...p, [f]: v }))

  if (loading) return <div className="loading flex justify-center items-center h-64 text-gray-400">Loading facilities...</div>

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Sport', accessor: 'sportType' },
    { header: 'Capacity', accessor: 'capacity' },
    { header: 'Price/Hr', cell: (row) => `$${row.pricePerHour}` },
    { 
      header: 'Status', 
      cell: (row) => (
        row.available ? (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
            Available
          </span>
        ) : (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
            Maintenance
          </span>
        )
      )
    },
    { 
      header: 'Actions', 
      cell: (row) => (
        <div className="flex items-center gap-4">
          <button onClick={() => openEdit(row)} className="text-gray-400 hover:text-cyan-400 transition-colors">
            <Pencil className="w-4 h-4" />
          </button>
          <button onClick={() => handleDelete(row.id)} className="text-gray-400 hover:text-red-400 transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ]

  return (
    <PageWrapper className="page-container">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full mb-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-1">Facility Management</h1>
          <p className="text-sm text-gray-400">Manage your complex facilities and their availability.</p>
        </div>
        <Button onClick={openCreate} className="bg-cyan-500 hover:bg-cyan-400 text-black">
          Add Facility
        </Button>
      </div>

      <DataTable 
        columns={columns} 
        data={facilities} 
        searchPlaceholder="Search facilities by name..." 
        searchField="name"
        itemsPerPage={10}
      />

      <Modal isOpen={modal} onClose={() => setModal(false)} title={editing ? 'Edit Facility' : 'Add Facility'}>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-2 gap-4">
            <div className="form-group">
              <label>Name</label>
              <input value={form.name} onChange={e => update('name', e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Price per Hour ($)</label>
              <input type="number" step="0.01" value={form.pricePerHour} onChange={e => update('pricePerHour', e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Capacity</label>
              <input type="number" value={form.capacity} onChange={e => update('capacity', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Sport Type</label>
              <input value={form.sportType} onChange={e => update('sportType', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Location</label>
              <input value={form.location} onChange={e => update('location', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Available</label>
              <select value={form.available} onChange={e => update('available', e.target.value === 'true')}>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
          </div>
          <div className="form-group mt-4">
            <label>Description</label>
            <textarea rows={3} value={form.description} onChange={e => update('description', e.target.value)} />
          </div>
          <div className="flex gap-3 justify-end mt-6">
            <Button type="button" variant="secondary" onClick={() => setModal(false)}>Cancel</Button>
            <Button type="submit">{editing ? 'Update' : 'Create'}</Button>
          </div>
        </form>
      </Modal>
    </PageWrapper>
  )
}
