import { create } from 'zustand'

const useStore = create((set) => ({
  userSession: {
    name: 'Ibrahim',
    role: 'Manager'
  },
  setUserSession: (session) => set({ userSession: session }),

  dashboardMetrics: {
    totalFacilities: 0,
    totalUsers: 0,
    todayReservations: 0,
    totalFeedbacks: 0,
    reservationTrends: []
  },
  setDashboardMetrics: (metrics) => set((state) => ({ 
    dashboardMetrics: { ...state.dashboardMetrics, ...metrics } 
  }))
}))

export default useStore
