import { getAnalytics } from 'firebase/analytics'
import { getApps, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDPsS6ZUx40k9t7gJP9pq0nzH5Rzaa_wlU",
  authDomain: "edwrelyn.firebaseapp.com",
  projectId: "edwrelyn",
  storageBucket: "edwrelyn.firebasestorage.app",
  messagingSenderId: "292753131550",
  appId: "1:292753131550:web:b6f51420adc0495e84860f",
  measurementId: "G-C14C3XMX21"
}

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
const db = getFirestore(app)

// Initialize Analytics only on client side
let analytics
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app)
}

export { analytics, db }

