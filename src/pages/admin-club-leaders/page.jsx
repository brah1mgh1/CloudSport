import { useFetch } from '../../hooks/useFetch'
import { UserCog, Mail, Users, Calendar, RefreshCw } from 'lucide-react'

export default function AdminClubLeadersPage() {
  const { data, loading } = useFetch('/users')

  const leaders = data?.users?.filter(u => u.role === 'leader') || []

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <RefreshCw className="w-6 h-6 text-gray-400 animate-spin" />
    </div>
  )

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <UserCog className="w-6 h-6 text-cyan-400" />
          Club Leaders
        </h1>
        <p className="text-gray-400 text-sm mt-1">View all club leaders registered on the platform.</p>
      </div>

      {leaders.length === 0 ? (
        <div className="border-2 border-dashed border-gray-800 bg-transparent rounded-2xl p-12 flex flex-col items-center justify-center">
          <UserCog className="text-gray-600 w-12 h-12 mb-4" />
          <p className="text-gray-400 text-center">No club leaders registered yet.</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {leaders.map(l => (
            <div key={l.id} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 flex items-center justify-between transition-all duration-200 hover:border-white/20">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                  <UserCog className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-white font-medium">{l.name}</h3>
                  <p className="text-xs text-gray-500 capitalize">Club Leader</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1.5"><Mail className="w-4 h-4" />{l.email}</span>
                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{l.createdAt ? new Date(l.createdAt).toLocaleDateString() : '—'}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
