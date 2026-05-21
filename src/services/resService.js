import api from './api'

export const resService = {
  create: (data) => api.post('/reservations', data),
  getAll: () => api.get('/reservations/all'),
  getMine: (params) => api.get('/reservations', { params }),
  get: (id) => api.get(`/reservations/${id}`),
  approve: (id, note) => api.put(`/reservations/approve/${id}`, { adminNote: note }),
  deny: (id, note) => api.put(`/reservations/deny/${id}`, { adminNote: note }),
  cancel: (id) => api.put(`/reservations/cancel/${id}`),
  requestChange: (id, data) => api.put(`/reservations/change/${id}`, data),
  pay: (id) => api.post(`/reservations/pay/${id}`),
  confirmPayment: (id, paymentId) => api.post(`/reservations/confirm-payment/${id}`, { paymentId })
}
