
'use client'

import { db } from '@/lib/firebase'
import { collection, limit, onSnapshot, orderBy, query } from 'firebase/firestore'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface BlogPost {
  id: string
  title: string
  content: string
  date: string
  authorEmail?: string
  createdAt?: any
}

const Home = () => {
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const q = query(
      collection(db, 'posts'), 
      orderBy('createdAt', 'desc'),
      limit(3)
    )
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const posts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().createdAt ? new Date(doc.data().createdAt.toMillis()).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }) : 'Just now'
      })) as BlogPost[]
      setRecentPosts(posts)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <div className="min-h-[70vh] flex flex-col justify-center">
        <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">
          Edwrelyn Buhian
        </h1>
        <p className="text-xl md:text-2xl text-neutral-600 max-w-2xl mb-8">
          Computer Engineering student. Service Consultant. Event Host. Leader.
        </p>
        <div className="flex gap-4 text-sm">
          <a 
            href="/about" 
            className="px-6 py-3 bg-black text-white hover:bg-neutral-800 transition-colors"
          >
            View Portfolio
          </a>
          <a 
            href="/contact" 
            className="px-6 py-3 border border-black hover:bg-black hover:text-white transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8 mt-20 border-t border-neutral-200 pt-12">
        <div>
          <h3 className="font-semibold mb-2">Current Role</h3>
          <p className="text-sm text-neutral-600">Service Consultant at AEG</p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Education</h3>
          <p className="text-sm text-neutral-600">Computer Engineering, Samuel Christian College</p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Location</h3>
          <p className="text-sm text-neutral-600">General Trias, Cavite</p>
        </div>
      </div>

      {/* Recent Blog Posts Section */}
      <div className="mt-20 border-t border-neutral-200 pt-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Recent Blog Posts</h2>
          <Link 
            href="/blog" 
            className="text-sm text-neutral-600 hover:text-black underline underline-offset-4"
          >
            View all posts →
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-neutral-500">Loading posts...</p>
          </div>
        ) : recentPosts.length === 0 ? (
          <div className="text-center py-12 border border-neutral-200">
            <p className="text-neutral-500 mb-4">No blog posts yet.</p>
            <Link 
              href="/blog" 
              className="text-sm px-6 py-2 bg-black text-white hover:bg-neutral-800 transition-colors inline-block"
            >
              Create First Post
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <Link 
                key={post.id} 
                href="/blog"
                className="border border-neutral-200 p-6 hover:border-black transition-colors group"
              >
                <h3 className="font-bold text-lg mb-2 group-hover:underline">{post.title}</h3>
                <p className="text-sm text-neutral-500 mb-3">{post.date}</p>
                <p className="text-sm text-neutral-600 line-clamp-3">
                  {post.content}
                </p>
                {post.authorEmail && (
                  <p className="text-xs text-neutral-400 mt-3">by {post.authorEmail}</p>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Home