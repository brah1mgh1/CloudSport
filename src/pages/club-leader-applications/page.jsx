import { useFetch } from '../../hooks/useFetch'
import { useMutate } from '../../hooks/useFetch'
import { UserCheck, Check, X, RefreshCw, Users } from 'lucide-react'

export default function ClubLeaderApplicationsPage() {
  const { data, loading, refetch } = useFetch('/groups/requests')
  const { mutate } = useMutate()

  const requests = data?.requests || []

  const handleApprove = async (id: number) => {
    await mutate('PUT', `/groups/requests/${id}`, { status: 'approved' })
    refetch()
  }

  const handleReject = async (id: number) => {
    await mutate('PUT', `/groups/requests/${id}`, { status: 'rejected' })
    refetch()
  }

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <RefreshCw className="w-6 h-6 text-gray-400 animate-spin" />
    </div>
  )

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <UserCheck className="w-6 h-6 text-cyan-400" />
          Join Applications
        </h1>
        <p className="text-gray-400 text-sm mt-1">Review and manage requests from athletes to join your groups.</p>
      </div>

      {requests.length === 0 ? (
        <div className="border-2 border-dashed border-gray-800 bg-transparent rounded-2xl p-12 flex flex-col items-center justify-center">
          <UserCheck className="text-gray-600 w-12 h-12 mb-4" />
          <p className="text-gray-400 text-center">No pending applications.</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {requests.map(r => (
            <div key={r.id} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 flex items-center justify-between transition-all duration-200 hover:border-white/20">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-white font-medium">{r.user?.name || 'Athlete'}</h3>
                  <p className="text-xs text-gray-500">Wants to join {r.group?.name || 'a group'}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleApprove(r.id)} className="flex items-center gap-1.5 bg-green-500/10 text-green-400 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-green-500/20 transition-colors">
                  <Check className="w-3.5 h-3.5" />
                  Approve
                </button>
                <button onClick={() => handleReject(r.id)} className="flex items-center gap-1.5 bg-red-500/10 text-red-400 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-red-500/20 transition-colors">
                  <X className="w-3.5 h-3.5" />
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
