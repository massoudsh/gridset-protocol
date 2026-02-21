import { createContext, useContext, useState, useCallback, useEffect } from 'react'

const CART_KEY = 'gridset-cart'
const LINKED_KEY = 'gridset-linked-orders'

function loadCart() {
  try {
    const raw = localStorage.getItem(CART_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function saveCart(items) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(items))
  } catch {}
}

function loadLinked() {
  try {
    const raw = localStorage.getItem(LINKED_KEY)
    if (!raw) return {}
    return JSON.parse(raw)
  } catch {
    return {}
  }
}

function saveLinked(byAccount) {
  try {
    localStorage.setItem(LINKED_KEY, JSON.stringify(byAccount))
  } catch {}
}

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState(loadCart)
  const [linkedByAccount, setLinkedByAccount] = useState(loadLinked)

  useEffect(() => {
    saveCart(cart)
  }, [cart])

  useEffect(() => {
    saveLinked(linkedByAccount)
  }, [linkedByAccount])

  const addItem = useCallback((productId, quantity = 1) => {
    setCart((prev) => {
      const i = prev.findIndex((x) => x.productId === productId)
      if (i >= 0) {
        const next = [...prev]
        next[i] = { ...next[i], quantity: next[i].quantity + quantity }
        return next
      }
      return [...prev, { productId, quantity }]
    })
  }, [])

  const removeItem = useCallback((productId) => {
    setCart((prev) => prev.filter((x) => x.productId !== productId))
  }, [])

  const setQuantity = useCallback((productId, quantity) => {
    if (quantity <= 0) removeItem(productId)
    else setCart((prev) => prev.map((x) => (x.productId === productId ? { ...x, quantity } : x)))
  }, [removeItem])

  const clearCart = useCallback(() => setCart([]), [])

  const linkOrder = useCallback((account, productIds, total) => {
    if (!account) return
    const order = { orderId: Date.now(), productIds, total, timestamp: new Date().toISOString() }
    setLinkedByAccount((prev) => ({
      ...prev,
      [account.toLowerCase()]: [...(prev[account.toLowerCase()] || []), order],
    }))
  }, [])

  const getLinkedOrders = useCallback((account) => {
    if (!account) return []
    return linkedByAccount[account.toLowerCase()] || []
  }, [linkedByAccount])

  const cartCount = cart.reduce((n, i) => n + i.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        addItem,
        removeItem,
        setQuantity,
        clearCart,
        linkOrder,
        getLinkedOrders,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
