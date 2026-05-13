import {
    collection,
    addDoc,
    serverTimestamp,
    getDocs,
    doc,
    updateDoc,
    orderBy,
    query,
    deleteDoc,
} from 'firebase/firestore'

import { db } from './config'

export const createOrder = async (orderData) => {
  try {
    const orderNumber = `ANV-${Date.now()}`

    const docRef = await addDoc(collection(db, 'orders'), {
      ...orderData,
      orderNumber,
      status: 'Pending',
      createdAt: serverTimestamp(),
    })

    return {
      success: true,
      id: docRef.id,
      orderNumber,
    }
  } catch (error) {
    console.error(error)

    return {
      success: false,
      error,
    }
  }
}

export const getOrders = async () => {
  const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'))

  const snapshot = await getDocs(q)

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))
}

export const updateOrderStatus = async (orderId, status) => {
  const orderRef = doc(db, 'orders', orderId)

  await updateDoc(orderRef, {
    status,
  })
}

export const deleteOrder = async (orderId) => {
  try {
    await deleteDoc(doc(db, 'orders', orderId))

    return true
  } catch (error) {
    console.log(error)

    return false
  }
}