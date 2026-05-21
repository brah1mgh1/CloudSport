import { useFetch } from '../../hooks/useFetch'
import { CalendarDays, Clock, MapPin, Users, RefreshCw } from 'lucide-react'
import { formatDate, formatTime } from '../../utils/dateHelpers'

export default function AthleteGroupReservationsPage() {
  const { data, loading, error } = useFetch('/reservations')

  const reservations = data?.reservations || []

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <RefreshCw className="w-6 h-6 text-gray-400 animate-spin" />
    </div>
  )

  if (error) return (
    <div className="flex items-center justify-center h-64">
      <div className="text-red-400">Failed to load reservations.</div>
    </div>
  )

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <CalendarDays className="w-6 h-6 text-cyan-400" />
          Group Reservations
        </h1>
        <p className="text-gray-400 text-sm mt-1">View all reservations for your groups.</p>
      </div>

      {reservations.length === 0 ? (
        <div className="border-2 border-dashed border-gray-800 bg-transparent rounded-2xl p-12 flex flex-col items-center justify-center">
          <CalendarDays className="text-gray-600 w-12 h-12 mb-4" />
          <p className="text-gray-400 text-center">No reservations found for your groups.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {reservations.map(r => (
            <div key={r.id} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 transition-all duration-200 hover:border-white/20">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-white font-semibold">{r.Facility?.name || 'Facility'}</h3>
                  <p className="text-sm text-gray-400 mt-1">{r.Facility?.sport || 'General'}</p>
                </div>
                <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                  r.status === 'approved' ? 'bg-green-500/10 text-green-400' :
                  r.status === 'pending' ? 'bg-yellow-500/10 text-yellow-400' :
                  r.status === 'denied' ? 'bg-red-500/10 text-red-400' :
                  'bg-gray-500/10 text-gray-400'
                }`}>
                  {r.status}
                </span>
              </div>
              <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-400">
                <span className="flex items-center gap-1.5">
                  <CalendarDays className="w-4 h-4" />
                  {formatDate(r.date)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {formatTime(r.startTime)} - {formatTime(r.endTime)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="w-4 h-4" />
                  {r.leader?.name || 'Leader'}
                </span>
              </div>
              {r.purpose && (
                <p className="text-sm text-gray-500 mt-3 border-t border-white/5 pt-3">{r.purpose}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
