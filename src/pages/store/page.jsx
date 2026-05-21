import { useFetch } from '../../hooks/useFetch'
import { ShoppingBag, Plus, Minus, RefreshCw, ShoppingCart } from 'lucide-react'
import { useState } from 'react'

export default function StorePage() {
  const { data, loading } = useFetch('/products')
  const [cart, setCart] = useState({})

  const products = data?.products || []

  const addToCart = (id) => setCart(p => ({ ...p, [id]: (p[id] || 0) + 1 }))
  const removeFromCart = (id) => setCart(p => {
    const next = { ...p, [id]: Math.max(0, (p[id] || 0) - 1) }
    if (next[id] === 0) delete next[id]
    return next
  })

  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0)

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <RefreshCw className="w-6 h-6 text-gray-400 animate-spin" />
    </div>
  )

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <ShoppingBag className="w-6 h-6 text-cyan-400" />
            Store
          </h1>
          <p className="text-gray-400 text-sm mt-1">Browse and order sports equipment and merchandise.</p>
        </div>
        {totalItems > 0 && (
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2">
            <ShoppingCart className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-white">{totalItems} items</span>
          </div>
        )}
      </div>

      {products.length === 0 ? (
        <div className="border-2 border-dashed border-gray-800 bg-transparent rounded-2xl p-12 flex flex-col items-center justify-center">
          <ShoppingBag className="text-gray-600 w-12 h-12 mb-4" />
          <p className="text-gray-400 text-center">No products available in the store yet.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map(p => (
            <div key={p.id} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 transition-all duration-200 hover:border-white/20">
              <div className="w-full h-32 rounded-xl bg-cyan-500/5 flex items-center justify-center mb-4">
                <ShoppingBag className="w-10 h-10 text-gray-600" />
              </div>
              <h3 className="text-white font-medium text-sm">{p.name}</h3>
              <p className="text-xs text-gray-500 mt-1">{p.category || 'General'}</p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-cyan-400 font-semibold">${p.price || '0.00'}</span>
                <div className="flex items-center gap-1">
                  {cart[p.id] ? (
                    <>
                      <button onClick={() => removeFromCart(p.id)} className="text-gray-400 hover:text-white p-1"><Minus className="w-4 h-4" /></button>
                      <span className="text-white text-sm w-5 text-center">{cart[p.id]}</span>
                    </>
                  ) : null}
                  <button onClick={() => addToCart(p.id)} className="bg-cyan-500/20 text-cyan-400 p-1.5 rounded-lg hover:bg-cyan-500/30 transition-colors">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
