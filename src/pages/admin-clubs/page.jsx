import { useFetch } from '../../hooks/useFetch'
import { Buildings, Users, CalendarDays, RefreshCw } from 'lucide-react'

export default function AdminClubsPage() {
  const { data, loading } = useFetch('/clubs')

  const clubs = data?.clubs || []

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <RefreshCw className="w-6 h-6 text-gray-400 animate-spin" />
    </div>
  )

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <Buildings className="w-6 h-6 text-cyan-400" />
          Clubs
        </h1>
        <p className="text-gray-400 text-sm mt-1">View all clubs registered on the platform.</p>
      </div>

      {clubs.length === 0 ? (
        <div className="border-2 border-dashed border-gray-800 bg-transparent rounded-2xl p-12 flex flex-col items-center justify-center">
          <Buildings className="text-gray-600 w-12 h-12 mb-4" />
          <p className="text-gray-400 text-center">No clubs registered yet.</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {clubs.map(c => (
            <div key={c.id} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 transition-all duration-200 hover:border-white/20">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                    <Buildings className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{c.name}</h3>
                    <p className="text-xs text-gray-500">{c.sport || 'Multi-sport'}</p>
                  </div>
                </div>
              </div>
              {c.description && <p className="text-sm text-gray-400 mt-3 border-t border-white/5 pt-3">{c.description}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
