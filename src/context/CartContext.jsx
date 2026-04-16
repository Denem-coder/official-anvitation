import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  const [showToast, setShowToast] = useState(false)

  const triggerToast = () => {
    setShowToast(true)
    setTimeout(() => setShowToast(false), 1800)
  }

  const addToCart = (item) => {
    setCart((prev) => [...prev, { id: crypto.randomUUID(), ...item }])
    triggerToast()
  }

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  const clearCart = () => {
    setCart([])
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        showToast,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}