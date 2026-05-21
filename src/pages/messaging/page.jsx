import { useState } from 'react'
import { MessageCircle, Send, Search } from 'lucide-react'

const mockContacts = [
  { id: 1, name: 'Facility Manager', role: 'Manager', online: true },
  { id: 2, name: 'John Coach', role: 'Club Leader', online: true },
  { id: 3, name: 'Sarah Athlete', role: 'Athlete', online: false },
  { id: 4, name: 'Mike Referee', role: 'Official', online: false },
]

const mockMessages = [
  { id: 1, from: 'Facility Manager', text: 'Your reservation for Court 3 has been approved.', time: '10:30 AM', sent: false },
  { id: 2, from: 'Me', text: 'Great, thank you! We will be there at 3 PM.', time: '10:32 AM', sent: true },
]

export default function MessagingPage() {
  const [activeChat, setActiveChat] = useState(null)
  const [message, setMessage] = useState('')

  const handleSend = () => {
    if (!message.trim()) return
    setMessage('')
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] -m-8">
      <div className="w-72 bg-white/5 border-r border-white/5 flex flex-col">
        <div className="p-4 border-b border-white/5">
          <h2 className="text-white font-semibold flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-cyan-400" />
            Messages
          </h2>
          <div className="relative mt-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input type="text" placeholder="Search..." className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {mockContacts.map(c => (
            <button
              key={c.id}
              onClick={() => setActiveChat(c.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors ${
                activeChat === c.id ? 'bg-cyan-500/10' : 'hover:bg-white/5'
              }`}
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 text-sm font-semibold">{c.name.charAt(0)}</div>
                {c.online && <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0d0d14]" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white truncate">{c.name}</p>
                <p className="text-xs text-gray-500">{c.role}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        {activeChat ? (
          <>
            <div className="p-4 border-b border-white/5">
              <h3 className="text-white font-medium">{mockContacts.find(c => c.id === activeChat)?.name}</h3>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {mockMessages.map(m => (
                <div key={m.id} className={`flex ${m.sent ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-md p-3 rounded-2xl text-sm ${
                    m.sent ? 'bg-cyan-500/20 text-cyan-100' : 'bg-white/5 text-gray-300'
                  }`}>
                    <p>{m.text}</p>
                    <p className={`text-xs mt-1 ${m.sent ? 'text-cyan-400/60' : 'text-gray-500'}`}>{m.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-white/5">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSend()}
                  placeholder="Type a message..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white/20"
                />
                <button onClick={handleSend} className="bg-cyan-500/20 text-cyan-400 p-2.5 rounded-xl hover:bg-cyan-500/30 transition-colors">
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">Select a conversation to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
