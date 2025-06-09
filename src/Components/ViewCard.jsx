import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { doc, getDoc, updateDoc, increment } from 'firebase/firestore'
import { db } from '../firebaseConfig'
import RenderSelectedCard from './RenderSelectedCard'
import { LoaderIcon } from 'lucide-react'
import { AppContext } from '../Context/AppProvider'

const ViewCard = () => {
  const { userId } = useParams()
  const { user } = useContext(AppContext)
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userId) return

        const userDocRef = doc(db, 'users', userId)
        const userDocSnap = await getDoc(userDocRef)

        if (userDocSnap.exists()) {
          setUserData({ id: userId, ...userDocSnap.data() })

          // Avoid counting view if current user is the owner
          if (!user || user.uid !== userId) {
            const sessionKey = `viewed-${userId}`
            const alreadyViewed = sessionStorage.getItem(sessionKey)

            if (!alreadyViewed) {
              const viewRef = doc(db, 'cardViews', userId)
              await updateDoc(viewRef, {
                views: increment(1),
                lastViewed: new Date(),
              }, { merge: true })
              sessionStorage.setItem(sessionKey, 'true')
            }
          }
        } else {
          console.error('No user data found')
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [userId, user])

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <LoaderIcon className="animate-spin h-12 w-12 text-white" />
      </div>
    )
  }

  if (!userData) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-white">Card not found</p>
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4 bg-gray-950">
      <div className="w-[350px]">
        <RenderSelectedCard user={userData} isLoading={loading} />
      </div>
    </div>
  )
}

export default ViewCard
