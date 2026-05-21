import { useEffect, useMemo } from 'react'
import { useFetch } from '../../hooks/useFetch'
import { formatDate } from '../../utils/dateHelpers'
import { Link } from 'react-router-dom'
import { Building2, Users, Calendar, MessageSquare, ClipboardCheck } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import PageWrapper from '../../components/common/PageWrapper'
import useStore from '../../store/useStore'

export default function ManagerDashboard() {
  const { userSession, dashboardMetrics, setDashboardMetrics } = useStore()
  
  const { data: reservationsRes } = useFetch('/reservations/all')
  const { data: facilitiesRes } = useFetch('/facilities')
  const { data: usersRes } = useFetch('/users')
  const { data: feedbackRes } = useFetch('/feedback')

  const reservations = reservationsRes?.reservations || []
  const facilities = facilitiesRes?.facilities || []
  const users = usersRes?.users || []
  const feedbacks = feedbackRes?.feedbacks || []

  // Update store when data arrives
  useEffect(() => {
    if (reservationsRes || facilitiesRes || usersRes || feedbackRes) {
      const today = new Date().toISOString().split('T')[0]
      const todayRes = reservations.filter(r => r.date === today)
      
      // Calculate last 7 days trend
      const trends = []
      for (let i = 6; i >= 0; i--) {
        const d = new Date()
        d.setDate(d.getDate() - i)
        const dateStr = d.toISOString().split('T')[0]
        trends.push({
          date: d.toLocaleDateString('en-US', { weekday: 'short' }),
          count: reservations.filter(r => r.date === dateStr).length
        })
      }

      setDashboardMetrics({
        totalFacilities: facilities.length,
        totalUsers: users.length,
        todayReservations: todayRes.length,
        totalFeedbacks: feedbacks.length,
        reservationTrends: trends
      })
    }
  }, [reservationsRes, facilitiesRes, usersRes, feedbackRes, setDashboardMetrics])

  const pendingReservations = reservations.filter(r => r.status === 'pending')

  const stats = [
    { label: 'Total Facilities', value: dashboardMetrics.totalFacilities, icon: Building2, colorClass: 'bg-blue-500/20 text-blue-400' },
    { label: 'Total Users', value: dashboardMetrics.totalUsers, icon: Users, colorClass: 'bg-purple-500/20 text-purple-400' },
    { label: 'Today Reservations', value: dashboardMetrics.todayReservations, icon: Calendar, colorClass: 'bg-emerald-500/20 text-emerald-400' },
    { label: 'Total Feedbacks', value: dashboardMetrics.totalFeedbacks, icon: MessageSquare, colorClass: 'bg-amber-500/20 text-amber-400' },
  ]

  const sportData = useMemo(() => {
    if (!facilities.length) return [
      { name: 'Football', value: 40 },
      { name: 'Basketball', value: 30 },
      { name: 'Tennis', value: 20 },
      { name: 'Volleyball', value: 10 }
    ]

    const counts = facilities.reduce((acc, f) => {
      const type = f.sportType || 'Other'
      acc[type] = (acc[type] || 0) + 1
      return acc
    }, {})

    return Object.keys(counts).map(key => ({
      name: key,
      value: counts[key]
    }))
  }, [facilities])

  const COLORS = ['#00d4ff', '#3b82f6', '#8b5cf6', '#10b981', '#f59e0b']

  return (
    <PageWrapper className="page-container flex flex-col gap-8">
      {/* Row 1: Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Manager Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">Welcome back, {userSession.name}. Here is your complex overview for today.</p>
      </div>

      {/* Row 2: KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => {
          const Icon = s.icon
          return (
            <div
              key={i}
              className="flex items-center gap-4 p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:border-white/20"
            >
              <div className={`p-3 rounded-lg flex-shrink-0 ${s.colorClass}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <div className="text-3xl font-bold text-white leading-none mb-1">{s.value}</div>
                <div className="text-sm text-gray-400 leading-none">{s.label}</div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Row 3: Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Line Chart */}
        <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:border-white/20">
          <div className="flex flex-col gap-1 mb-6">
            <h2 className="text-lg font-semibold text-white">Reservation Trends (Last 7 Days)</h2>
            <p className="text-sm text-gray-400">{dashboardMetrics.todayReservations} reservations today</p>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dashboardMetrics.reservationTrends}>
                <XAxis 
                  dataKey="date" 
                  stroke="#6b7280" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="#6b7280" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#12121a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  itemStyle={{ color: '#00d4ff' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#00d4ff" 
                  strokeWidth={3} 
                  dot={false}
                  activeDot={{ r: 6, fill: '#00d4ff', stroke: '#0a0a0f', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Side: Donut Chart */}
        <div className="lg:col-span-1 bg-white/5 border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:border-white/20">
          <div className="flex flex-col gap-1 mb-6">
            <h2 className="text-lg font-semibold text-white">Facilities by Sport</h2>
            <p className="text-sm text-gray-400">Distribution of facility types</p>
          </div>
          <div className="h-64 w-full flex justify-center items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sportData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {sportData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#12121a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} 
                  itemStyle={{ color: '#fff' }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 4: Pending Requests */}
      {pendingReservations.length === 0 ? (
        <div className="border-2 border-dashed border-gray-800 bg-transparent rounded-2xl p-12 flex flex-col items-center justify-center w-full">
          <ClipboardCheck className="text-gray-600 w-12 h-12 mb-4" />
          <p className="text-gray-400 text-center">No pending requests at this time.</p>
        </div>
      ) : (
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-white">Pending Reservation Requests</h2>
            <Link
              to="/manager/reservations"
              className="border border-gray-700 text-gray-400 rounded-lg px-4 py-2 text-sm transition-all duration-200 hover:border-gray-500 hover:text-white"
            >
              View All ({pendingReservations.length})
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Facility</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Leader</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingReservations.slice(0, 5).map(r => (
                  <tr key={r.id}>
                    <td>{r.Facility?.name}</td>
                    <td>{formatDate(r.date)}</td>
                    <td>{r.startTime} - {r.endTime}</td>
                    <td>{r.leader?.name}</td>
                    <td>
                      <Link to="/manager/reservations" className="border border-gray-700 text-gray-400 rounded-lg px-3 py-1 text-xs transition-all duration-200 hover:border-gray-500 hover:text-white">
                        Review
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </PageWrapper>
  )
}
