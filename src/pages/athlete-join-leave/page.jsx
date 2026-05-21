import { useFetch } from '../../hooks/useFetch'
import { useMutate } from '../../hooks/useFetch'
import { useState } from 'react'
import { ArrowLeftRight, Users, Search, Check, X, RefreshCw, Loader } from 'lucide-react'

export default function AthleteJoinLeavePage() {
  const { data: groupsData, loading, refetch } = useFetch('/groups')
  const { data: requestsData } = useFetch('/groups/my-requests')
  const { mutate } = useMutate()
  const [search, setSearch] = useState('')

  const groups = groupsData?.groups || []
  const pendingRequests = requestsData?.requests || []
  const pendingIds = pendingRequests.map(r => r.groupId)

  const filtered = groups.filter(g =>
    g.name?.toLowerCase().includes(search.toLowerCase())
  )

  const handleJoin = async (groupId: number) => {
    await mutate('POST', '/groups/join', { groupId })
    refetch()
  }

  const handleLeave = async (groupId: number) => {
    await mutate('POST', '/groups/leave', { groupId })
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
          <ArrowLeftRight className="w-6 h-6 text-cyan-400" />
          Join / Leave Groups
        </h1>
        <p className="text-gray-400 text-sm mt-1">Browse groups and manage your memberships.</p>
      </div>

      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          type="text"
          placeholder="Search groups..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white/20 transition-colors"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="border-2 border-dashed border-gray-800 bg-transparent rounded-2xl p-12 flex flex-col items-center justify-center">
          <Users className="text-gray-600 w-12 h-12 mb-4" />
          <p className="text-gray-400 text-center">No groups found.</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {filtered.map(g => {
            const isPending = pendingIds.includes(g.id)
            const isMember = g.isMember
            return (
              <div key={g.id} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 flex items-center justify-between transition-all duration-200 hover:border-white/20">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{g.name}</h3>
                    <p className="text-xs text-gray-500">{g.memberCount || 0} members</p>
                  </div>
                </div>
                <div>
                  {isMember ? (
                    <button onClick={() => handleLeave(g.id)} className="flex items-center gap-1.5 bg-red-500/10 text-red-400 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-red-500/20 transition-colors">
                      <X className="w-3.5 h-3.5" />
                      Leave
                    </button>
                  ) : isPending ? (
                    <span className="flex items-center gap-1.5 text-yellow-400 text-xs font-medium px-3 py-1.5">
                      <Loader className="w-3.5 h-3.5 animate-spin" />
                      Pending
                    </span>
                  ) : (
                    <button onClick={() => handleJoin(g.id)} className="flex items-center gap-1.5 bg-cyan-500/10 text-cyan-400 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-cyan-500/20 transition-colors">
                      <Check className="w-3.5 h-3.5" />
                      Join
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
