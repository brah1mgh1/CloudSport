import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, Building2, ClipboardCheck,
  Users, Shield, UserCog, Buildings,
  MessageSquareText, MessageCircle
} from 'lucide-react'

const links = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/facilities', label: 'Facilities', icon: Building2 },
  { to: '/admin/reservation-approvals', label: 'Reservations', icon: ClipboardCheck },
  { to: '/admin/managers', label: 'Managers', icon: Shield },
  { to: '/admin/club-leaders', label: 'Club Leaders', icon: UserCog },
  { to: '/admin/clubs', label: 'Clubs', icon: Buildings },
  { to: '/admin/feedback', label: 'Feedback', icon: MessageSquareText },
  { to: '/messaging', label: 'Messaging', icon: MessageCircle },
]

export default function AdminSidebar() {
  const location = useLocation()

  return (
    <aside className="w-64 bg-[#0d0d14] border-r border-white/5 flex flex-col h-screen shrink-0">
      <div className="p-6 border-b border-white/5">
        <Link to="/admin/dashboard" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center">
            <span className="text-cyan-400 font-bold text-sm">CS</span>
          </div>
          <span className="text-white font-semibold text-lg">CloudSport</span>
        </Link>
      </div>
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {links.map(link => {
          const Icon = link.icon
          const isActive = location.pathname === link.to
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-cyan-500/10 text-cyan-400'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-5 h-5 shrink-0" />
              {link.label}
            </Link>
          )
        })}
      </nav>
      <div className="p-4 border-t border-white/5">
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5">
          <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 text-sm font-semibold">
            A
          </div>
          <div>
            <p className="text-sm text-white font-medium">Admin</p>
            <p className="text-xs text-gray-500">Administrator</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
