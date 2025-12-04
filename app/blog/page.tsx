'use client'

import { db } from '@/lib/firebase'
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
    updateDoc
} from 'firebase/firestore'
import { useEffect, useState } from 'react'

interface Comment {
  id: string
  postId: string
  author: string
  content: string
  date: string
}

interface BlogPost {
  id: string
  title: string
  content: string
  date: string
  createdAt?: any
  comments?: Comment[]
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isCreating, setIsCreating] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({ title: '', content: '' })
  const [commentFormData, setCommentFormData] = useState<{ [key: string]: { author: string; content: string } }>({})
  const [showComments, setShowComments] = useState<{ [key: string]: boolean }>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Real-time listener for posts
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().createdAt ? new Date(doc.data().createdAt.toMillis()).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }) : 'Just now'
      })) as BlogPost[]
      setPosts(postsData)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const handleCreate = async () => {
    if (!formData.title || !formData.content) return

    try {
      await addDoc(collection(db, 'posts'), {
        title: formData.title,
        content: formData.content,
        createdAt: serverTimestamp(),
        comments: []
      })
      setFormData({ title: '', content: '' })
      setIsCreating(false)
    } catch (error) {
      console.error('Error creating post:', error)
      alert('Failed to create post')
    }
  }

  const handleEdit = (post: BlogPost) => {
    setEditingId(post.id)
    setFormData({ title: post.title, content: post.content })
  }

  const handleUpdate = async () => {
    if (!formData.title || !formData.content || !editingId) return

    try {
      const postRef = doc(db, 'posts', editingId)
      await updateDoc(postRef, {
        title: formData.title,
        content: formData.content
      })
      setFormData({ title: '', content: '' })
      setEditingId(null)
    } catch (error) {
      console.error('Error updating post:', error)
      alert('Failed to update post')
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      try {
        await deleteDoc(doc(db, 'posts', id))
      } catch (error) {
        console.error('Error deleting post:', error)
        alert('Failed to delete post')
      }
    }
  }

  const handleCancel = () => {
    setIsCreating(false)
    setEditingId(null)
    setFormData({ title: '', content: '' })
  }

  const handleAddComment = async (postId: string) => {
    const commentData = commentFormData[postId]
    if (!commentData?.author || !commentData?.content) return

    const newComment: Comment = {
      id: Date.now().toString(),
      postId,
      author: commentData.author,
      content: commentData.content,
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }

    try {
      const post = posts.find(p => p.id === postId)
      const postRef = doc(db, 'posts', postId)
      await updateDoc(postRef, {
        comments: [...(post?.comments || []), newComment]
      })
      setCommentFormData({ ...commentFormData, [postId]: { author: '', content: '' } })
    } catch (error) {
      console.error('Error adding comment:', error)
      alert('Failed to add comment')
    }
  }

  const handleDeleteComment = async (postId: string, commentId: string) => {
    if (confirm('Delete this comment?')) {
      try {
        const post = posts.find(p => p.id === postId)
        const postRef = doc(db, 'posts', postId)
        await updateDoc(postRef, {
          comments: (post?.comments || []).filter(c => c.id !== commentId)
        })
      } catch (error) {
        console.error('Error deleting comment:', error)
        alert('Failed to delete comment')
      }
    }
  }

  const toggleComments = (postId: string) => {
    setShowComments({ ...showComments, [postId]: !showComments[postId] })
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-5xl font-bold">Blog</h1>
        {!isCreating && !editingId && (
          <button
            onClick={() => setIsCreating(true)}
            className="px-6 py-2 bg-black text-white hover:bg-neutral-800 transition-colors text-sm"
          >
            New Post
          </button>
        )}
      </div>

      {(isCreating || editingId) && (
        <div className="mb-12 border border-neutral-300 p-6">
          <h2 className="text-2xl font-semibold mb-6">
            {isCreating ? 'Create New Post' : 'Edit Post'}
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full border border-neutral-300 px-4 py-2 focus:outline-none focus:border-black"
                placeholder="Enter post title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Content</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full border border-neutral-300 px-4 py-2 focus:outline-none focus:border-black h-48"
                placeholder="Write your post content..."
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={isCreating ? handleCreate : handleUpdate}
                className="px-6 py-2 bg-black text-white hover:bg-neutral-800 transition-colors text-sm"
              >
                {isCreating ? 'Publish' : 'Update'}
              </button>
              <button
                onClick={handleCancel}
                className="px-6 py-2 border border-black hover:bg-neutral-100 transition-colors text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-8">
        {loading ? (
          <div className="text-center py-20">
            <p className="text-neutral-500">Loading posts...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-neutral-500">No blog posts yet. Create your first post!</p>
          </div>
        ) : (
          posts.map((post) => (
            <article key={post.id} className="border-b border-neutral-200 pb-8 mb-8">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
                  <p className="text-sm text-neutral-500">{post.date}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(post)}
                    className="text-sm px-4 py-1 border border-neutral-300 hover:border-black transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="text-sm px-4 py-1 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className="text-neutral-700 whitespace-pre-wrap mb-6">{post.content}</p>

              {/* Comments Section */}
              <div className="mt-6 pt-6 border-t border-neutral-200">
                <button
                  onClick={() => toggleComments(post.id)}
                  className="text-sm font-medium mb-4 hover:underline"
                >
                  {showComments[post.id] ? '▼' : '▶'} Comments ({post.comments?.length || 0})
                </button>

                {showComments[post.id] && (
                  <div className="space-y-4">
                    {/* Existing Comments */}
                    {post.comments && post.comments.length > 0 && (
                      <div className="space-y-3 mb-6">
                        {post.comments.map((comment) => (
                          <div key={comment.id} className="bg-neutral-50 p-4 rounded">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <p className="font-semibold text-sm">{comment.author}</p>
                                <p className="text-xs text-neutral-500">{comment.date}</p>
                              </div>
                              <button
                                onClick={() => handleDeleteComment(post.id, comment.id)}
                                className="text-xs text-red-500 hover:text-red-700"
                              >
                                Delete
                              </button>
                            </div>
                            <p className="text-sm text-neutral-700">{comment.content}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Add Comment Form */}
                    <div className="bg-white border border-neutral-200 p-4">
                      <h4 className="font-semibold mb-3 text-sm">Add a Comment</h4>
                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder="Your name"
                          value={commentFormData[post.id]?.author || ''}
                          onChange={(e) => setCommentFormData({
                            ...commentFormData,
                            [post.id]: { 
                              ...commentFormData[post.id], 
                              author: e.target.value 
                            }
                          })}
                          className="w-full border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:border-black"
                        />
                        <textarea
                          placeholder="Write your comment..."
                          value={commentFormData[post.id]?.content || ''}
                          onChange={(e) => setCommentFormData({
                            ...commentFormData,
                            [post.id]: { 
                              ...commentFormData[post.id], 
                              content: e.target.value 
                            }
                          })}
                          className="w-full border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:border-black h-20"
                        />
                        <button
                          onClick={() => handleAddComment(post.id)}
                          className="px-4 py-2 bg-black text-white hover:bg-neutral-800 transition-colors text-sm"
                        >
                          Post Comment
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  )
}

export default Blog
