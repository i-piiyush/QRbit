import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebaseConfig'
import RenderSelectedCard from './RenderSelectedCard'
import { LoaderIcon } from 'lucide-react'

const ViewCard = () => {
  const { userId } = useParams() // Changed to match your route param
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
  }, [userId])

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
        <p>Card not found</p>
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4 bg-gray-950">
      <div className="w-[350px] ">
        <RenderSelectedCard user={userData} isLoading={loading} />
      </div>
    </div>
  )
}

export default ViewCard