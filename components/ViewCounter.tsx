'use client'

import { db } from '@/lib/firebase'
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'

const ViewCounter = () => {
  const [views, setViews] = useState<number>(0)

  useEffect(() => {
    const trackView = async () => {
      // Get or create unique user ID
      let userId = localStorage.getItem('userId')
      if (!userId) {
        userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        localStorage.setItem('userId', userId)
      }

      const viewsRef = doc(db, 'analytics', 'siteViews')

      try {
        const viewsDoc = await getDoc(viewsRef)
        
        if (!viewsDoc.exists()) {
          // Initialize the document with first unique visitor
          await setDoc(viewsRef, { visitors: [userId] })
          setViews(1)
        } else {
          const visitors = viewsDoc.data().visitors || []
          
          // Check if user has already visited
          if (!visitors.includes(userId)) {
            // Add user to unique visitors list
            await updateDoc(viewsRef, {
              visitors: arrayUnion(userId)
            })
            setViews(visitors.length + 1)
          } else {
            setViews(visitors.length)
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
