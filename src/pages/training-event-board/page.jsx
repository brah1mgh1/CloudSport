import { useFetch } from '../../hooks/useFetch'
import { ScrollText, CalendarDays, Clock, MapPin, Users, RefreshCw } from 'lucide-react'
import { formatDate, formatTime } from '../../utils/dateHelpers'

export default function TrainingEventBoardPage() {
  const { data, loading } = useFetch('/events')

  const events = data?.events || []

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <RefreshCw className="w-6 h-6 text-gray-400 animate-spin" />
    </div>
  )

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <ScrollText className="w-6 h-6 text-cyan-400" />
          Training & Event Board
        </h1>
        <p className="text-gray-400 text-sm mt-1">Upcoming training sessions, events, and activities.</p>
      </div>

      {events.length === 0 ? (
        <div className="border-2 border-dashed border-gray-800 bg-transparent rounded-2xl p-12 flex flex-col items-center justify-center">
          <ScrollText className="text-gray-600 w-12 h-12 mb-4" />
          <p className="text-gray-400 text-center">No events scheduled yet.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {events.map(e => (
            <div key={e.id} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 transition-all duration-200 hover:border-white/20">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-white font-semibold">{e.title}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{e.club?.name || 'Open event'}</p>
                </div>
              </div>
              {e.description && <p className="text-sm text-gray-400 mt-2">{e.description}</p>}
              <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-400">
                {e.date && <span className="flex items-center gap-1.5"><CalendarDays className="w-4 h-4" />{formatDate(e.date)}</span>}
                {e.startTime && <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{formatTime(e.startTime)}{e.endTime ? ` - ${formatTime(e.endTime)}` : ''}</span>}
                {e.location && <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" />{e.location}</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
