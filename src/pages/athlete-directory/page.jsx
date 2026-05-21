import { useFetch } from '../../hooks/useFetch'
import { useState } from 'react'
import { Users, Search, Mail, Calendar, RefreshCw } from 'lucide-react'

export default function AthleteDirectoryPage() {
  const { data, loading } = useFetch('/users')
  const [search, setSearch] = useState('')

  const athletes = data?.users?.filter(u => u.role === 'athlete') || []
  const filtered = athletes.filter(a =>
    a.name?.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <RefreshCw className="w-6 h-6 text-gray-400 animate-spin" />
    </div>
  )

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <Users className="w-6 h-6 text-cyan-400" />
          Athlete Directory
        </h1>
        <p className="text-gray-400 text-sm mt-1">Browse and find other athletes on the platform.</p>
      </div>

      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          type="text"
          placeholder="Search athletes..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white/20 transition-colors"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="border-2 border-dashed border-gray-800 bg-transparent rounded-2xl p-12 flex flex-col items-center justify-center">
          <Users className="text-gray-600 w-12 h-12 mb-4" />
          <p className="text-gray-400 text-center">No athletes found.</p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(a => (
            <div key={a.id} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 transition-all duration-200 hover:border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 font-semibold text-sm">
                  {a.name?.charAt(0) || '?'}
                </div>
                <div>
                  <h3 className="text-white font-medium text-sm">{a.name}</h3>
                  <p className="text-xs text-gray-500 flex items-center gap-1"><Mail className="w-3 h-3" />{a.email}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
