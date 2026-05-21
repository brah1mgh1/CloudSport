import { Outlet } from 'react-router-dom'

export default function DashboardShell({ sidebar }) {
  return (
    <div className="flex h-screen bg-[#0a0a0f] overflow-hidden">
      {sidebar}
      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  )
}
