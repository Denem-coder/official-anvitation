import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import { getAnalytics, isSupported } from "firebase/analytics"

const firebaseConfig = {
  apiKey: "AIzaSyA2I0I-79Yyi5hT5DYiwBc_zmfPrk_lRy8",
  authDomain: "official-anvitation.firebaseapp.com",
  projectId: "official-anvitation",
  storageBucket: "official-anvitation.firebasestorage.app",
  messagingSenderId: "731201104964",
  appId: "1:731201104964:web:380aff817c9b0a44b82011",
  measurementId: "G-4FQ9P466FZ"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Core services
export const db = getFirestore(app)
export const storage = getStorage(app)

// Analytics (safe for React / SSR environments)
let analytics = null

isSupported().then((yes) => {
  if (yes) {
    analytics = getAnalytics(app)
  }
})

export { analytics }