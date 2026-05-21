import { useFetch } from '../../hooks/useFetch'
import { LayoutDashboard, Building2, Users, ClipboardCheck, MessageSquareText, TrendingUp, RefreshCw } from 'lucide-react'

export default function AdminDashboardPage() {
  const { data: facilitiesRes } = useFetch('/facilities')
  const { data: usersRes } = useFetch('/users')
  const { data: reservationsRes } = useFetch('/reservations/all')
  const { data: feedbackRes } = useFetch('/feedback')

  const facilities = facilitiesRes?.facilities || []
  const users = usersRes?.users || []
  const reservations = reservationsRes?.reservations || []
  const feedbacks = feedbackRes?.feedbacks || []

  const stats = [
    { label: 'Total Facilities', value: facilities.length, icon: Building2 },
    { label: 'Total Users', value: users.length, icon: Users },
    { label: 'Total Reservations', value: reservations.length, icon: ClipboardCheck },
    { label: 'Total Feedbacks', value: feedbacks.length, icon: MessageSquareText },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <LayoutDashboard className="w-6 h-6 text-cyan-400" />
          Admin Dashboard
        </h1>
        <p className="text-gray-400 text-sm mt-1">Platform-wide overview and management.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((s, i) => {
          const Icon = s.icon
          return (
            <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:border-white/20">
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-1">
                  <div className="text-3xl font-bold text-white">{s.value}</div>
                  <div className="text-sm text-gray-400">{s.label}</div>
                </div>
                <Icon className="text-gray-500/50 w-6 h-6" />
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-cyan-400" />
            Recent Activity
          </h2>
          {reservations.slice(0, 5).map(r => (
            <div key={r.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
              <div>
                <p className="text-sm text-white">{r.Facility?.name || 'Reservation'}</p>
                <p className="text-xs text-gray-500">{r.date}</p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                r.status === 'approved' ? 'bg-green-500/10 text-green-400' :
                r.status === 'pending' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-red-500/10 text-red-400'
              }`}>{r.status}</span>
            </div>
          ))}
          {reservations.length === 0 && (
            <p className="text-gray-500 text-sm">No recent activity.</p>
          )}
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-cyan-400" />
            User Breakdown
          </h2>
          <div className="space-y-4">
            {[
              { role: 'Athletes', count: users.filter(u => u.role === 'athlete').length, color: 'bg-cyan-500/20 text-cyan-400' },
              { role: 'Club Leaders', count: users.filter(u => u.role === 'leader').length, color: 'bg-purple-500/20 text-purple-400' },
              { role: 'Managers', count: users.filter(u => u.role === 'manager').length, color: 'bg-green-500/20 text-green-400' },
            ].map(item => (
              <div key={item.role} className="flex items-center justify-between">
                <span className="text-sm text-gray-400">{item.role}</span>
                <span className={`text-sm font-semibold px-3 py-1 rounded-lg ${item.color}`}>{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
