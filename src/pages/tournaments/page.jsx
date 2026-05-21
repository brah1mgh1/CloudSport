import { useFetch } from '../../hooks/useFetch'
import { Trophy, CalendarDays, MapPin, Users, RefreshCw } from 'lucide-react'
import { formatDate } from '../../utils/dateHelpers'

export default function TournamentsPage() {
  const { data, loading } = useFetch('/events')

  const events = data?.events || []
  const tournaments = events.filter(e =>
    e.title?.toLowerCase().includes('tournament') ||
    e.type === 'tournament'
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
          <Trophy className="w-6 h-6 text-cyan-400" />
          Tournaments
        </h1>
        <p className="text-gray-400 text-sm mt-1">Upcoming tournaments and competitions.</p>
      </div>

      {tournaments.length === 0 ? (
        <div className="border-2 border-dashed border-gray-800 bg-transparent rounded-2xl p-12 flex flex-col items-center justify-center">
          <Trophy className="text-gray-600 w-12 h-12 mb-4" />
          <p className="text-gray-400 text-center">No tournaments scheduled at this time.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {tournaments.map(t => (
            <div key={t.id} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 transition-all duration-200 hover:border-white/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center shrink-0">
                  <Trophy className="w-6 h-6 text-yellow-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold">{t.title}</h3>
                  {t.description && <p className="text-sm text-gray-400 mt-1">{t.description}</p>}
                  <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-400">
                    {t.date && <span className="flex items-center gap-1.5"><CalendarDays className="w-4 h-4" />{formatDate(t.date)}</span>}
                    {t.location && <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" />{t.location}</span>}
                    <span className="flex items-center gap-1.5"><Users className="w-4 h-4" />Open to all</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
