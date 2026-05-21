import { useState, useRef } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useMutate } from '../../hooks/useFetch'
import api from '../../services/api'
import { algerianCities, algerianStates } from '../../utils/algeriaData'

export default function ProfilePage() {
  const { user, logout, updateUser } = useAuth()
  const { mutate, loading } = useMutate()
  const [form, setForm] = useState({ 
    firstName: user?.firstName || '', 
    lastName: user?.lastName || '', 
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || '',
    state: user?.state || '',
    password: ''
  })
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('success')
  const [uploading, setUploading] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)
  const fileInputRef = useRef(null)

  const showMessage = (text, type = 'success') => {
    setMessage(text)
    setMessageType(type)
    setTimeout(() => setMessage(''), 4000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await mutate('put', '/users/profile', form)
      updateUser(res.user)
      showMessage('Profile updated successfully!')
    } catch {
      showMessage('Failed to update profile', 'error')
    }
  }

  const handleImageSelect = (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      showMessage('Image must be smaller than 5MB', 'error')
      return
    }

    if (!['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'].includes(file.type)) {
      showMessage('Only JPEG, PNG, WebP, and GIF images are allowed', 'error')
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => setImagePreview(reader.result)
    reader.readAsDataURL(file)

    uploadImage(file)
  }

  const uploadImage = async (file) => {
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('profileImage', file)
      const res = await api.post('/users/profile/image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      updateUser(res.data.user)
      setImagePreview(null)
      showMessage('Profile photo updated!')
    } catch (err) {
      showMessage(err.response?.data?.message || 'Failed to upload image', 'error')
      setImagePreview(null)
    } finally {
      setUploading(false)
    }
  }

  const handleRemoveImage = async () => {
    setUploading(true)
    try {
      const res = await api.delete('/users/profile/image')
      updateUser(res.data.user)
      setImagePreview(null)
      showMessage('Profile photo removed')
    } catch {
      showMessage('Failed to remove image', 'error')
    } finally {
      setUploading(false)
    }
  }

  if (!user) return null

  const avatarSrc = imagePreview || user.profileImage
  const initials = user.name?.charAt(0)?.toUpperCase() || '?'

  return (
    <div className="page-container" style={{ maxWidth: 640, margin: '0 auto' }}>
      <h1 style={{ marginBottom: 8, fontSize: 28, fontWeight: 800 }}>My Profile</h1>
      <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 32 }}>
        Manage your personal information and profile photo
      </p>

      {/* Toast Message */}
      {message && (
        <div style={{
          padding: '12px 20px',
          borderRadius: 10,
          marginBottom: 20,
          fontSize: 14,
          fontWeight: 500,
          background: messageType === 'success' ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.12)',
          color: messageType === 'success' ? '#34d399' : '#f87171',
          border: `1px solid ${messageType === 'success' ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)'}`,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          animation: 'fadeIn 0.3s ease'
        }}>
          <span style={{ fontSize: 18 }}>{messageType === 'success' ? '✓' : '✕'}</span>
          {message}
        </div>
      )}

      {/* Profile Photo Card */}
      <div className="card" style={{ marginBottom: 20, padding: 32 }}>
        <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 24, color: 'var(--text-primary)' }}>
          Profile Photo
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          {/* Avatar */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <div style={{
              width: 100,
              height: 100,
              borderRadius: '50%',
              overflow: 'hidden',
              background: avatarSrc ? 'transparent' : 'linear-gradient(135deg, var(--accent) 0%, #0088cc 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '3px solid var(--border-light)',
              boxShadow: '0 4px 20px rgba(0,212,255,0.15)',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
              onClick={() => fileInputRef.current?.click()}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--accent)'
                e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,212,255,0.3)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border-light)'
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,212,255,0.15)'
              }}
            >
              {avatarSrc ? (
                <img
                  src={avatarSrc}
                  alt={user.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <span style={{ color: '#fff', fontSize: 36, fontWeight: 700 }}>{initials}</span>
              )}

              {/* Hover overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                background: 'rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0,
                transition: 'opacity 0.2s ease',
                cursor: 'pointer'
              }}
                onMouseEnter={e => e.currentTarget.style.opacity = 1}
                onMouseLeave={e => e.currentTarget.style.opacity = 0}
                onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click() }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                  <circle cx="12" cy="13" r="4"/>
                </svg>
              </div>
            </div>

            {/* Upload spinner */}
            {uploading && (
              <div style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                background: 'rgba(0,0,0,0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{
                  width: 28,
                  height: 28,
                  border: '3px solid rgba(255,255,255,0.2)',
                  borderTopColor: 'var(--accent)',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite'
                }} />
              </div>
            )}
          </div>

          {/* Upload actions */}
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', gap: 10, marginBottom: 10, flexWrap: 'wrap' }}>
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="btn btn-primary btn-sm"
                style={{ borderRadius: 8 }}
              >
                {user.profileImage ? 'Change Photo' : 'Upload Photo'}
              </button>
              {user.profileImage && (
                <button
                  onClick={handleRemoveImage}
                  disabled={uploading}
                  className="btn btn-secondary btn-sm"
                  style={{ borderRadius: 8 }}
                >
                  Remove
                </button>
              )}
            </div>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5 }}>
              JPG, PNG, WebP, or GIF. Max 5MB.
            </p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
            onChange={handleImageSelect}
            style={{ display: 'none' }}
          />
        </div>
      </div>

      {/* User Info Card */}
      <div className="card" style={{ marginBottom: 20, padding: 32 }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 16 }}>
          <div style={{
            width: 48, height: 48, borderRadius: '50%',
            overflow: 'hidden',
            background: user.profileImage ? 'transparent' : 'var(--accent)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0
          }}>
            {user.profileImage ? (
              <img src={user.profileImage} alt={user.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <span style={{ color: 'var(--bg-primary)', fontSize: 18, fontWeight: 700 }}>{initials}</span>
            )}
          </div>
          <div>
            <h2 style={{ fontSize: 18, marginBottom: 2 }}>{user.name}</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{user.email}</p>
            <span className={`badge badge-${user.role}`} style={{ textTransform: 'capitalize', marginTop: 4 }}>
              {user.role}
            </span>
          </div>
        </div>
      </div>

      {/* Edit Form Card */}
      <div className="card" style={{ padding: 32 }}>
        <h2 style={{ marginBottom: 20, fontSize: 16, fontWeight: 600 }}>Edit Information</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="form-group" style={{ marginBottom: 16 }}>
              <label>First Name</label>
              <input value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} required />
            </div>
            <div className="form-group" style={{ marginBottom: 16 }}>
              <label>Last Name</label>
              <input value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} required />
            </div>
          </div>
          
          <div className="form-group" style={{ marginBottom: 16 }}>
            <label>Email</label>
            <input value={user.email} disabled style={{ background: 'var(--bg-input)', color: 'var(--text-muted)', cursor: 'not-allowed' }} />
            <span style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4, display: 'block' }}>Email cannot be changed</span>
          </div>

          <div className="form-group" style={{ marginBottom: 16 }}>
            <label>Address</label>
            <input value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
          </div>

          <div className="form-group" style={{ marginBottom: 16 }}>
            <label>Contact Number</label>
            <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="form-group" style={{ marginBottom: 16 }}>
              <label>City</label>
              <select value={form.city} onChange={e => setForm({ ...form, city: e.target.value })}>
                <option value="">Select City</option>
                {algerianCities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
            <div className="form-group" style={{ marginBottom: 16 }}>
              <label>State</label>
              <select value={form.state} onChange={e => setForm({ ...form, state: e.target.value })}>
                <option value="">Select State</option>
                {algerianStates.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: 24 }}>
            <label>Password</label>
            <input 
              type="password" 
              placeholder="Leave blank to keep current password"
              value={form.password} 
              onChange={e => setForm({ ...form, password: e.target.value })} 
            />
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <button type="button" onClick={() => setForm({
              firstName: user?.firstName || '',
              lastName: user?.lastName || '',
              phone: user?.phone || '',
              address: user?.address || '',
              city: user?.city || '',
              state: user?.state || '',
              password: ''
            })} className="btn btn-outline" style={{ flex: 1 }}>
              Cancel
            </button>
            <button type="submit" disabled={loading} className="btn btn-primary" style={{ flex: 1 }}>
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  )
}
