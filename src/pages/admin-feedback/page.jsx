import { useFetch } from '../../hooks/useFetch'
import { useMutate } from '../../hooks/useFetch'
import { MessageSquareText, Trash2, Star, RefreshCw } from 'lucide-react'
import { formatDate } from '../../utils/dateHelpers'

export default function AdminFeedbackPage() {
  const { data, loading, refetch } = useFetch('/feedback')
  const { mutate } = useMutate()

  const feedbacks = data?.feedbacks || []

  const handleDelete = async (id) => {
    if (!confirm('Delete this feedback?')) return
    try { await mutate('delete', `/feedback/${id}`) } catch (e) { console.error('Delete failed:', e) }
    refetch()
  }

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <RefreshCw className="w-6 h-6 text-gray-400 animate-spin" />
    </div>
  )

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <MessageSquareText className="w-6 h-6 text-cyan-400" />
          Feedback
        </h1>
        <p className="text-gray-400 text-sm mt-1">Review and manage user feedback across the platform.</p>
      </div>

      {feedbacks.length === 0 ? (
        <div className="border-2 border-dashed border-gray-800 bg-transparent rounded-2xl p-12 flex flex-col items-center justify-center">
          <MessageSquareText className="text-gray-600 w-12 h-12 mb-4" />
          <p className="text-gray-400 text-center">No feedback received yet.</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {feedbacks.map(f => (
            <div key={f.id} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 transition-all duration-200 hover:border-white/20">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-white font-medium text-sm">{f.user?.name || 'Anonymous'}</h3>
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map(s => (
                        <Star key={s} className={`w-3.5 h-3.5 ${s <= (f.rating || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">{formatDate(f.createdAt)}</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-2">{f.message}</p>
                </div>
                <button onClick={() => handleDelete(f.id)} className="text-gray-500 hover:text-red-400 p-2 transition-colors shrink-0">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
