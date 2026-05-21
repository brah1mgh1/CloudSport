import { useFetch } from '../../hooks/useFetch'
import { Shield, Mail, Calendar, RefreshCw } from 'lucide-react'

export default function AdminManagersPage() {
  const { data, loading } = useFetch('/users')

  const managers = data?.users?.filter(u => u.role === 'manager') || []

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <RefreshCw className="w-6 h-6 text-gray-400 animate-spin" />
    </div>
  )

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <Shield className="w-6 h-6 text-cyan-400" />
          Managers
        </h1>
        <p className="text-gray-400 text-sm mt-1">View all facility managers on the platform.</p>
      </div>

      {managers.length === 0 ? (
        <div className="border-2 border-dashed border-gray-800 bg-transparent rounded-2xl p-12 flex flex-col items-center justify-center">
          <Shield className="text-gray-600 w-12 h-12 mb-4" />
          <p className="text-gray-400 text-center">No managers registered yet.</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {managers.map(m => (
            <div key={m.id} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 flex items-center justify-between transition-all duration-200 hover:border-white/20">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <h3 className="text-white font-medium">{m.name}</h3>
                  <p className="text-xs text-gray-500 capitalize">Manager</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1.5"><Mail className="w-4 h-4" />{m.email}</span>
                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{m.createdAt ? new Date(m.createdAt).toLocaleDateString() : '—'}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
