import { useFetch } from '../../hooks/useFetch'
import { useMutate } from '../../hooks/useFetch'
import { ClipboardCheck, Check, X, RefreshCw, CalendarDays, Clock, Users } from 'lucide-react'
import { formatDate, formatTime } from '../../utils/dateHelpers'

export default function AdminReservationApprovalsPage() {
  const { data, loading, refetch } = useFetch('/reservations/all')
  const { mutate } = useMutate()

  const reservations = data?.reservations || []
  const pending = reservations.filter(r => r.status === 'pending')

  const handleApprove = async (id: number) => {
    await mutate('PUT', `/reservations/${id}/approve`, {})
    refetch()
  }

  const handleDeny = async (id: number) => {
    await mutate('PUT', `/reservations/${id}/deny`, {})
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
          <ClipboardCheck className="w-6 h-6 text-cyan-400" />
          Reservation Approvals
        </h1>
        <p className="text-gray-400 text-sm mt-1">Review and approve/deny pending reservation requests.</p>
      </div>

      {pending.length === 0 ? (
        <div className="border-2 border-dashed border-gray-800 bg-transparent rounded-2xl p-12 flex flex-col items-center justify-center">
          <ClipboardCheck className="text-gray-600 w-12 h-12 mb-4" />
          <p className="text-gray-400 text-center">No pending reservations to review.</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {pending.map(r => (
            <div key={r.id} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 transition-all duration-200 hover:border-white/20">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-white font-medium">{r.Facility?.name || 'Facility'}</h3>
                  <p className="text-xs text-gray-500">by {r.leader?.name || 'Leader'}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleApprove(r.id)} className="flex items-center gap-1 bg-green-500/10 text-green-400 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-green-500/20 transition-colors">
                    <Check className="w-3.5 h-3.5" />
                    Approve
                  </button>
                  <button onClick={() => handleDeny(r.id)} className="flex items-center gap-1 bg-red-500/10 text-red-400 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-red-500/20 transition-colors">
                    <X className="w-3.5 h-3.5" />
                    Deny
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-400">
                <span className="flex items-center gap-1.5"><CalendarDays className="w-4 h-4" />{formatDate(r.date)}</span>
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{formatTime(r.startTime)} - {formatTime(r.endTime)}</span>
                <span className="flex items-center gap-1.5"><Users className="w-4 h-4" />{r.group?.name || 'No group'}</span>
              </div>
              {r.purpose && <p className="text-xs text-gray-500 mt-2 border-t border-white/5 pt-2">{r.purpose}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
