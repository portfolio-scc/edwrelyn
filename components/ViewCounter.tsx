'use client'

import { db } from '@/lib/firebase'
import { doc, getDoc, increment, setDoc, updateDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'

const ViewCounter = () => {
  const [views, setViews] = useState<number>(0)

  useEffect(() => {
    const trackView = async () => {
      const viewsRef = doc(db, 'analytics', 'siteViews')
      const lastVisit = localStorage.getItem('lastVisit')
      const today = new Date().toDateString()

      try {
        const viewsDoc = await getDoc(viewsRef)
        
        if (!viewsDoc.exists()) {
          // Initialize the document if it doesn't exist
          await setDoc(viewsRef, { count: 1 })
          setViews(1)
          localStorage.setItem('lastVisit', today)
        } else {
          const currentCount = viewsDoc.data().count || 0
          
          // Only increment if it's a new day or first visit
          if (lastVisit !== today) {
            await updateDoc(viewsRef, {
              count: increment(1)
            })
            setViews(currentCount + 1)
            localStorage.setItem('lastVisit', today)
          } else {
            setViews(currentCount)
          }
        }
      } catch (error) {
        console.error('Error tracking views:', error)
        // Fallback to localStorage
        const localViews = parseInt(localStorage.getItem('siteViews') || '0')
        setViews(localViews)
      }
    }

    trackView()
  }, [])

  return (
    <div className="fixed bottom-4 right-4 bg-black border border-neutral-700 px-4 py-2 rounded-full text-xs text-neutral-400">
      {views} {views === 1 ? 'view' : 'views'}
    </div>
  )
}

export default ViewCounter
