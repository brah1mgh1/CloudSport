import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Layout from './components/layout/Layout'
import ProtectedRoute from './components/common/ProtectedRoute'
import Loading from './components/common/Loading'
import { AnimatePresence } from 'framer-motion'

import LandingPage from './pages/public/LandingPage'
import About from './pages/public/About'
import FeedbackPage from './pages/public/FeedbackPage'
import OffersPage from './pages/public/OffersPage'
import ProfilePage from './pages/public/ProfilePage'
import ClubsPage from './pages/public/ClubsPage'
import SportsPage from './pages/public/SportsPage'
import NewsPage from './pages/public/NewsPage'
import ContactPage from './pages/public/ContactPage'
import PolicyPage from './pages/public/PolicyPage'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'

import ManagerDashboard from './pages/manager/Dashboard'
import FacilityMgmt from './pages/manager/FacilityMgmt'
import UserMgmt from './pages/manager/UserMgmt'
import ClubMgmt from './pages/manager/ClubMgmt'
import ReservationMgmt from './pages/manager/ReservationMgmt'
import FeedbackMgmt from './pages/manager/FeedbackMgmt'
import EventMgmt from './pages/manager/EventMgmt'
import ProductMgmt from './pages/manager/ProductMgmt'
import OfferMgmt from './pages/manager/OfferMgmt'

import LeaderDashboard from './pages/leader/LeaderDashboard'
import MyClub from './pages/leader/MyClub'
import GroupMgmt from './pages/leader/GroupMgmt'
import Booking from './pages/leader/Booking'
import LeaderReservations from './pages/leader/LeaderReservations'
import LeaderEvents from './pages/leader/Events'

import Schedule from './pages/athlete/Schedule'
import MyGroups from './pages/athlete/MyGroups'
import NotificationsPage from './pages/athlete/Notifications'
import AthleteStore from './pages/athlete/Store'

function HomeRedirect() {
  const { user, loading } = useAuth()
  if (loading) return <Loading />
  if (!user) return <LandingPage />
  if (user.role === 'manager') return <Navigate to="/manager/dashboard" replace />
  if (user.role === 'leader') return <Navigate to="/leader/my-club" replace />
  if (user.role === 'athlete') return <Navigate to="/athlete/schedule" replace />
  return <LandingPage />
}

export default function App() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={<Layout><HomeRedirect /></Layout>} />
      <Route path="/about" element={<Layout><About /></Layout>} />
      <Route path="/clubs" element={<Layout><ClubsPage /></Layout>} />
      <Route path="/sports" element={<Layout><SportsPage /></Layout>} />
      <Route path="/news" element={<Layout><NewsPage /></Layout>} />
      <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
      <Route path="/policy" element={<Layout><PolicyPage /></Layout>} />
      <Route path="/feedback" element={<Layout><FeedbackPage /></Layout>} />
      <Route path="/offers" element={<Layout><OffersPage /></Layout>} />
      <Route path="/profile" element={<Layout><ProtectedRoute><ProfilePage /></ProtectedRoute></Layout>} />

      <Route path="/manager/dashboard" element={<Layout><ProtectedRoute roles={['manager']}><ManagerDashboard /></ProtectedRoute></Layout>} />
      <Route path="/manager/facilities" element={<Layout><ProtectedRoute roles={['manager']}><FacilityMgmt /></ProtectedRoute></Layout>} />
      <Route path="/manager/users" element={<Layout><ProtectedRoute roles={['manager']}><UserMgmt /></ProtectedRoute></Layout>} />
      <Route path="/manager/clubs" element={<Layout><ProtectedRoute roles={['manager']}><ClubMgmt /></ProtectedRoute></Layout>} />
      <Route path="/manager/reservations" element={<Layout><ProtectedRoute roles={['manager']}><ReservationMgmt /></ProtectedRoute></Layout>} />
      <Route path="/manager/feedback" element={<Layout><ProtectedRoute roles={['manager']}><FeedbackMgmt /></ProtectedRoute></Layout>} />
      <Route path="/manager/events" element={<Layout><ProtectedRoute roles={['manager']}><EventMgmt /></ProtectedRoute></Layout>} />
      <Route path="/manager/products" element={<Layout><ProtectedRoute roles={['manager']}><ProductMgmt /></ProtectedRoute></Layout>} />
      <Route path="/manager/offers" element={<Layout><ProtectedRoute roles={['manager']}><OfferMgmt /></ProtectedRoute></Layout>} />

      <Route path="/leader/my-club" element={<Layout><ProtectedRoute roles={['leader']}><MyClub /></ProtectedRoute></Layout>} />
      <Route path="/leader/groups" element={<Layout><ProtectedRoute roles={['leader']}><GroupMgmt /></ProtectedRoute></Layout>} />
      <Route path="/leader/booking" element={<Layout><ProtectedRoute roles={['leader']}><Booking /></ProtectedRoute></Layout>} />
      <Route path="/leader/reservations" element={<Layout><ProtectedRoute roles={['leader']}><LeaderReservations /></ProtectedRoute></Layout>} />
      <Route path="/leader/events" element={<Layout><ProtectedRoute roles={['leader']}><LeaderEvents /></ProtectedRoute></Layout>} />
      <Route path="/leader/dashboard" element={<Layout><ProtectedRoute roles={['leader']}><LeaderDashboard /></ProtectedRoute></Layout>} />

      <Route path="/athlete/schedule" element={<Layout><ProtectedRoute roles={['athlete']}><Schedule /></ProtectedRoute></Layout>} />
      <Route path="/athlete/groups" element={<Layout><ProtectedRoute roles={['athlete']}><MyGroups /></ProtectedRoute></Layout>} />
      <Route path="/athlete/notifications" element={<Layout><ProtectedRoute roles={['athlete']}><NotificationsPage /></ProtectedRoute></Layout>} />
      <Route path="/athlete/store" element={<Layout><ProtectedRoute roles={['athlete']}><AthleteStore /></ProtectedRoute></Layout>} />
      <Route path="/athlete/dashboard" element={<Layout><ProtectedRoute roles={['athlete']}><Schedule /></ProtectedRoute></Layout>} />

      <Route path="*" element={<Layout><h1 className="page-container">404 - Page Not Found</h1></Layout>} />
      </Routes>
    </AnimatePresence>
  )
}
