import { useMutate } from '../../hooks/useFetch'
import { useState } from 'react'
import { useFetch } from '../../hooks/useFetch'
import { PlusCircle, Send } from 'lucide-react'

export default function ClubLeaderCreateEventPage() {
  const { data: clubsData } = useFetch('/clubs/my')
  const { mutate, loading: saving } = useMutate()
  const [form, setForm] = useState({
    title: '',
    description: '',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    clubId: '',
  })
  const [success, setSuccess] = useState(false)

  const clubs = clubsData?.clubs || []

  const handleSubmit = async (e) => {
    e.preventDefault()
    await mutate('POST', '/events', form)
    setSuccess(true)
    setForm({ title: '', description: '', date: '', startTime: '', endTime: '', location: '', clubId: '' })
    setTimeout(() => setSuccess(false), 3000)
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <PlusCircle className="w-6 h-6 text-cyan-400" />
          Create Event
        </h1>
        <p className="text-gray-400 text-sm mt-1">Schedule a new training session or event for your club.</p>
      </div>

      {success && (
        <div className="mb-6 bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3 text-green-400 text-sm">
          Event created successfully!
        </div>
      )}

      <div className="max-w-2xl">
        <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 space-y-5">
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Event Title</label>
            <input
              type="text"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white/20 transition-colors"
              placeholder="e.g. Weekend Training Session"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Description</label>
            <textarea
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white/20 transition-colors resize-none"
              placeholder="Describe the event..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Date</label>
              <input
                type="date"
                value={form.date}
                onChange={e => setForm({ ...form, date: e.target.value })}
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/20 transition-colors [color-scheme:dark]"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Club</label>
              <select
                value={form.clubId}
                onChange={e => setForm({ ...form, clubId: e.target.value })}
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/20 transition-colors"
              >
                <option value="" className="bg-[#0d0d14]">Select club...</option>
                {clubs.map(c => (
                  <option key={c.id} value={c.id} className="bg-[#0d0d14]">{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Start Time</label>
              <input
                type="time"
                value={form.startTime}
                onChange={e => setForm({ ...form, startTime: e.target.value })}
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/20 transition-colors [color-scheme:dark]"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">End Time</label>
              <input
                type="time"
                value={form.endTime}
                onChange={e => setForm({ ...form, endTime: e.target.value })}
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/20 transition-colors [color-scheme:dark]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Location</label>
            <input
              type="text"
              value={form.location}
              onChange={e => setForm({ ...form, location: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white/20 transition-colors"
              placeholder="e.g. Main Field, Court 3"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 bg-cyan-500/20 text-cyan-400 px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-cyan-500/30 transition-colors disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            {saving ? 'Creating...' : 'Create Event'}
          </button>
        </form>
      </div>
    </div>
  )
}
