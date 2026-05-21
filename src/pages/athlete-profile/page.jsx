import { useFetch } from '../../hooks/useFetch'
import { useMutate } from '../../hooks/useFetch'
import { useState, useRef } from 'react'
import { useAuth } from '../../context/AuthContext'
import { User, Mail, Phone, Calendar, Save, Camera, MapPin, Lock } from 'lucide-react'
import api from '../../services/api'
import { algerianCities, algerianStates } from '../../utils/algeriaData'

export default function AthleteProfilePage() {
  const { data: profile, loading, error, refetch } = useFetch('/users/profile')
  const { mutate } = useMutate()
  const { updateUser } = useAuth()
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({ 
    firstName: '', 
    lastName: '', 
    email: '', 
    phone: '',
    address: '',
    city: '',
    state: '',
    password: ''
  })
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('success')
  const fileInputRef = useRef(null)

  const showMessage = (text, type = 'success') => {
    setMessage(text)
    setMessageType(type)
    setTimeout(() => setMessage(''), 4000)
  }

  const handleEdit = () => {
    if (!profile) return
    setForm({ 
      firstName: profile.firstName || '',
      lastName: profile.lastName || '',
      email: profile.email || '', 
      phone: profile.phone || '',
      address: profile.address || '',
      city: profile.city || '',
      state: profile.state || '',
      password: ''
    })
    setEditing(true)
  }

  const handleSave = async () => {
    const res = await mutate('PUT', '/users/profile', form)
    setEditing(false)
    if (res?.user) updateUser(res.user)
    refetch()
    showMessage('Profile updated!')
  }

  const handleImageSelect = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      showMessage('Image must be smaller than 5MB', 'error')
      return
    }

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('profileImage', file)
      const res = await api.post('/users/profile/image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      if (res.data?.user) updateUser(res.data.user)
      refetch()
      showMessage('Profile photo updated!')
    } catch (err) {
      showMessage(err.response?.data?.message || 'Failed to upload image', 'error')
    } finally {
      setUploading(false)
    }
  }

  const handleRemoveImage = async () => {
    setUploading(true)
    try {
      const res = await api.delete('/users/profile/image')
      if (res.data?.user) updateUser(res.data.user)
      refetch()
      showMessage('Profile photo removed')
    } catch {
      showMessage('Failed to remove image', 'error')
    } finally {
      setUploading(false)
    }
  }

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="text-gray-400">Loading profile...</div>
    </div>
  )

  if (error) return (
    <div className="flex items-center justify-center h-64">
      <div className="text-red-400">Failed to load profile.</div>
    </div>
  )

  const initials = profile?.name?.charAt(0)?.toUpperCase() || '?'

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <User className="w-6 h-6 text-cyan-400" />
          My Profile
        </h1>
        <p className="text-gray-400 text-sm mt-1">Manage your personal information and profile photo.</p>
      </div>

      {/* Toast */}
      {message && (
        <div style={{
          padding: '12px 20px', borderRadius: 10, marginBottom: 20, fontSize: 14, fontWeight: 500,
          background: messageType === 'success' ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.12)',
          color: messageType === 'success' ? '#34d399' : '#f87171',
          border: `1px solid ${messageType === 'success' ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)'}`
        }}>
          {messageType === 'success' ? '✓' : '✕'} {message}
        </div>
      )}

      <div className="max-w-2xl">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          {/* Avatar Section */}
          <div className="flex items-center gap-5 pb-6 border-b border-white/5 mb-6">
            <div style={{ position: 'relative' }}>
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center overflow-hidden cursor-pointer"
                style={{
                  background: profile?.profileImage ? 'transparent' : 'linear-gradient(135deg, #00d4ff, #0088cc)',
                  border: '3px solid rgba(255,255,255,0.1)',
                  transition: 'border-color 0.2s'
                }}
                onClick={() => fileInputRef.current?.click()}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#00d4ff'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
              >
                {profile?.profileImage ? (
                  <img src={profile.profileImage} alt={profile.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <span className="text-white text-2xl font-bold">{initials}</span>
                )}

                {/* Camera overlay */}
                <div style={{
                  position: 'absolute', inset: 0, borderRadius: '50%',
                  background: 'rgba(0,0,0,0.5)', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  opacity: 0, transition: 'opacity 0.2s', cursor: 'pointer'
                }}
                  onMouseEnter={e => e.currentTarget.style.opacity = 1}
                  onMouseLeave={e => e.currentTarget.style.opacity = 0}
                  onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click() }}
                >
                  <Camera className="w-5 h-5 text-white" />
                </div>
              </div>

              {uploading && (
                <div style={{
                  position: 'absolute', inset: 0, borderRadius: '50%',
                  background: 'rgba(0,0,0,0.6)', display: 'flex',
                  alignItems: 'center', justifyContent: 'center'
                }}>
                  <div style={{
                    width: 24, height: 24, border: '3px solid rgba(255,255,255,0.2)',
                    borderTopColor: '#00d4ff', borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite'
                  }} />
                </div>
              )}
            </div>

            <div className="flex-1">
              <h2 className="text-xl font-semibold text-white">{profile?.name || 'User'}</h2>
              <p className="text-sm text-gray-400 capitalize">{profile?.role || 'Athlete'}</p>
              <div className="flex gap-2 mt-2 flex-wrap">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="text-xs px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition-colors font-medium"
                >
                  {profile?.profileImage ? 'Change Photo' : 'Upload Photo'}
                </button>
                {profile?.profileImage && (
                  <button
                    onClick={handleRemoveImage}
                    disabled={uploading}
                    className="text-xs px-3 py-1.5 rounded-lg bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-colors font-medium"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
              onChange={handleImageSelect}
              style={{ display: 'none' }}
            />
          </div>

          {/* Info Fields */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-gray-500" />
              <div className="flex-1">
                <p className="text-xs text-gray-500">Name</p>
                {editing ? (
                  <div className="flex gap-2 mt-1">
                    <input
                      type="text"
                      placeholder="First Name"
                      value={form.firstName}
                      onChange={e => setForm({ ...form, firstName: e.target.value })}
                      className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white w-full"
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={form.lastName}
                      onChange={e => setForm({ ...form, lastName: e.target.value })}
                      className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white w-full"
                    />
                  </div>
                ) : (
                  <p className="text-sm text-white">{profile?.firstName} {profile?.lastName} {(!profile?.firstName && !profile?.lastName) && profile?.name}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-xs text-gray-500">Email</p>
                {editing ? (
                  <input
                    type="email"
                    value={form.email}
                    disabled
                    className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-gray-400 w-full mt-1 cursor-not-allowed"
                  />
                ) : (
                  <p className="text-sm text-white">{profile?.email || '—'}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-xs text-gray-500">Contact Number</p>
                {editing ? (
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white w-full mt-1"
                  />
                ) : (
                  <p className="text-sm text-white">{profile?.phone || '—'}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-gray-500" />
              <div className="flex-1">
                <p className="text-xs text-gray-500">Location</p>
                {editing ? (
                  <div className="space-y-2 mt-1">
                    <input
                      type="text"
                      placeholder="Address"
                      value={form.address}
                      onChange={e => setForm({ ...form, address: e.target.value })}
                      className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white w-full"
                    />
                    <div className="flex gap-2">
                      <select
                        value={form.city}
                        onChange={e => setForm({ ...form, city: e.target.value })}
                        className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white w-full"
                      >
                        <option value="" className="text-gray-900">Select City</option>
                        {algerianCities.map(city => (
                          <option key={city} value={city} className="text-gray-900">{city}</option>
                        ))}
                      </select>
                      <select
                        value={form.state}
                        onChange={e => setForm({ ...form, state: e.target.value })}
                        className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white w-full"
                      >
                        <option value="" className="text-gray-900">Select State</option>
                        {algerianStates.map(state => (
                          <option key={state} value={state} className="text-gray-900">{state}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-white">
                    {profile?.address ? `${profile.address}, ` : ''}
                    {profile?.city ? `${profile.city}, ` : ''}
                    {profile?.state || '—'}
                  </p>
                )}
              </div>
            </div>

            {editing && (
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-gray-500" />
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Password</p>
                  <input
                    type="password"
                    placeholder="Leave blank to keep current password"
                    value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                    className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white w-full mt-1"
                  />
                </div>
              </div>
            )}

            {!editing && (
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-xs text-gray-500">Member Since</p>
                  <p className="text-sm text-white">{profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : '—'}</p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 pt-6 border-t border-white/5">
            {editing ? (
              <div className="flex gap-3">
                <button onClick={handleSave} className="flex items-center gap-2 bg-cyan-500/20 text-cyan-400 px-4 py-2 rounded-xl text-sm font-medium hover:bg-cyan-500/30 transition-colors">
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
                <button onClick={() => setEditing(false)} className="text-gray-400 px-4 py-2 rounded-xl text-sm font-medium hover:text-white transition-colors">
                  Cancel
                </button>
              </div>
            ) : (
              <button onClick={handleEdit} className="bg-white/5 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-white/10 transition-colors">
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}
