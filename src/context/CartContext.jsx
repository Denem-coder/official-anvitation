import { createContext, useContext, useEffect, useState } from 'react'

const CartContext = createContext()

const MIN_PRODUCT_QUANTITY = 10

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart')
    return savedCart ? JSON.parse(savedCart) : []
  })

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const recalculateCartItem = (item) => {
    const isPackageOrder = item.orderMode === 'package'
    const safeQuantity = isPackageOrder
      ? 1
      : Math.max(MIN_PRODUCT_QUANTITY, Number(item.quantity) || MIN_PRODUCT_QUANTITY)

    const unitPrice = Number(item.unitPrice) || 0

    const selectedAddOns = (item.selectedAddOns || []).map((addOn) => {
      const addOnPrice = Number(addOn.price) || 0
      const addOnQuantity = Math.max(0, Number(addOn.quantity) || 0)

      return {
        ...addOn,
        price: addOnPrice,
        quantity: addOnQuantity,
        subtotal: addOnPrice * addOnQuantity,
      }
    })

    const addOnsTotal = selectedAddOns.reduce(
      (total, addOn) => total + addOn.subtotal,
      0
    )

    const mainProductTotal = isPackageOrder ? 0 : unitPrice * safeQuantity
    const packageTotal = isPackageOrder ? unitPrice : 0
    const lineTotal = mainProductTotal + packageTotal + addOnsTotal

    return {
      ...item,
      quantity: safeQuantity,
      unitPrice,
      selectedAddOns,
      mainProductTotal,
      packageTotal,
      addOnsTotal,
      lineTotal,
      price: lineTotal,
    }
  }

  const addToCart = (product) => {
    setCart((prevCart) => {
      const incomingItem = recalculateCartItem(product)

      const existingItem = prevCart.find((item) => item.id === incomingItem.id)

      if (existingItem) {
        const mergedItem = {
          ...existingItem,
          ...incomingItem,
          quantity:
            incomingItem.orderMode === 'package'
              ? 1
              : (Number(existingItem.quantity) || MIN_PRODUCT_QUANTITY) +
                (Number(incomingItem.quantity) || MIN_PRODUCT_QUANTITY),
        }

        return prevCart.map((item) =>
          item.id === incomingItem.id ? recalculateCartItem(mergedItem) : item
        )
      }

      return [...prevCart, incomingItem]
    })
  }

  const updateCartItem = (id, updatedItem) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? recalculateCartItem({
              ...updatedItem,
              id,
            })
          : item
      )
    )
  }

  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? recalculateCartItem({
              ...item,
              quantity:
                item.orderMode === 'package'
                  ? 1
                  : (Number(item.quantity) || MIN_PRODUCT_QUANTITY) + 1,
            })
          : item
      )
    )
  }

  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? recalculateCartItem({
              ...item,
              quantity:
                item.orderMode === 'package'
                  ? 1
                  : Math.max(
                      MIN_PRODUCT_QUANTITY,
                      (Number(item.quantity) || MIN_PRODUCT_QUANTITY) - 1
                    ),
            })
          : item
      )
    )
  }

  const updateAddOnQuantity = (itemId, addOnId, nextQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id !== itemId) return item

        const updatedAddOns = (item.selectedAddOns || [])
          .map((addOn) =>
            addOn.id === addOnId
              ? {
                  ...addOn,
                  quantity: Math.max(0, Number(nextQuantity) || 0),
                }
              : addOn
          )
          .filter((addOn) => addOn.quantity > 0)

        return recalculateCartItem({
          ...item,
          selectedAddOns: updatedAddOns,
        })
      })
    )
  }

  const increaseAddOnQuantity = (itemId, addOnId) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id !== itemId) return item

        const updatedAddOns = (item.selectedAddOns || []).map((addOn) =>
          addOn.id === addOnId
            ? { ...addOn, quantity: (Number(addOn.quantity) || 0) + 1 }
            : addOn
        )

        return recalculateCartItem({
          ...item,
          selectedAddOns: updatedAddOns,
        })
      })
    )
  }

  const decreaseAddOnQuantity = (itemId, addOnId) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id !== itemId) return item

        const updatedAddOns = (item.selectedAddOns || [])
          .map((addOn) =>
            addOn.id === addOnId
              ? {
                  ...addOn,
                  quantity: Math.max(0, (Number(addOn.quantity) || 0) - 1),
                }
              : addOn
          )
          .filter((addOn) => addOn.quantity > 0)

        return recalculateCartItem({
          ...item,
          selectedAddOns: updatedAddOns,
        })
      })
    )
  }

  const removeAddOn = (itemId, addOnId) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id !== itemId) return item

        const updatedAddOns = (item.selectedAddOns || []).filter(
          (addOn) => addOn.id !== addOnId
        )

        return recalculateCartItem({
          ...item,
          selectedAddOns: updatedAddOns,
        })
      })
    )
  }

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id))
  }

  const clearCart = () => {
    setCart([])
  }

  const totalItems = cart.reduce(
    (total, item) => total + (Number(item.quantity) || 0),
    0
  )

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateCartItem,
        increaseQuantity,
        decreaseQuantity,
        updateAddOnQuantity,
        increaseAddOnQuantity,
        decreaseAddOnQuantity,
        removeAddOn,
        removeFromCart,
        clearCart,
        totalItems,
        MIN_PRODUCT_QUANTITY,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}