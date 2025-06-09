import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { doc, getDoc, setDoc, updateDoc, increment } from 'firebase/firestore'
import { db } from '../firebaseConfig'
import QRCode from 'react-qr-code'
import { AppContext } from '../Context/AppProvider'
import { LoaderIcon, CopyIcon, Share2Icon } from 'lucide-react'
import { toast } from 'react-hot-toast'

const ShareCard = () => {
  const { userId } = useParams() // Changed from id to userId
  const navigate = useNavigate()
  const { user } = useContext(AppContext)
  const [cardData, setCardData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [viewCount, setViewCount] = useState(0)
  const [activeTab, setActiveTab] = useState('qr')

  // Construct URL using userId
  const viewCardUrl = userId ? `${window.location.origin}/user-cards/view-card/${userId}` : null

  useEffect(() => {
    if (!userId) {
      toast.error('Invalid user ID')
      navigate('/')
      return
    }

    const fetchData = async () => {
      try {
        // Fetch user data using userId
        const userDocRef = doc(db, 'users', userId)
        const userDocSnap = await getDoc(userDocRef)

        if (!userDocSnap.exists()) {
          toast.error('User card not found')
          navigate('/')
          return
        }

        setCardData(userDocSnap.data())

        // Update view count in cardViews collection
        const viewsDocRef = doc(db, 'cardViews', userId)
        const viewsDocSnap = await getDoc(viewsDocRef)

        if (viewsDocSnap.exists()) {
          setViewCount(viewsDocSnap.data().views || 0)
          await updateDoc(viewsDocRef, {
            views: increment(1),
            lastViewed: new Date()
          })
        } else {
          await setDoc(viewsDocRef, {
            views: 1,
            lastViewed: new Date(),
            userId: userId
          })
          setViewCount(1)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        toast.error('Failed to load card data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [userId, navigate])

  if (!userId) return null

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <LoaderIcon className="animate-spin h-12 w-12 text-white" />
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen bg-gray-100 p-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Share Your Card</h1>
        
        {/* Tab Navigation */}
        <div className="flex border-b mb-6">
          <button
            className={`flex-1 py-2 font-medium ${activeTab === 'qr' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('qr')}
          >
            QR Code
          </button>
          <button
            className={`flex-1 py-2 font-medium ${activeTab === 'link' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('link')}
          >
            Share Link
          </button>
        </div>
        
        {/* QR Code Tab */}
        {activeTab === 'qr' && viewCardUrl && (
          <div className="flex flex-col items-center">
            <div className="p-4 bg-white rounded-lg border mb-4">
              <QRCode 
                value={viewCardUrl} 
                size={200}
                level="H"
              />
            </div>
            <p className="text-gray-600 mb-4 text-center">
              Scan this QR code to view {cardData?.name}'s digital card
            </p>
            <button
              onClick={() => {
                navigator.clipboard.writeText(viewCardUrl)
                toast.success('Link copied to clipboard!')
              }}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              <Share2Icon size={18} />
              Share QR Code
            </button>
          </div>
        )}
        
        {/* Link Tab */}
        {activeTab === 'link' && viewCardUrl && (
          <div className="flex flex-col">
            <div className="bg-gray-100 p-3 rounded-lg mb-4 break-all">
              {viewCardUrl}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(viewCardUrl)
                  toast.success('Link copied to clipboard!')
                }}
                className="flex-1 flex items-center justify-center gap-2 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
              >
                <CopyIcon size={18} />
                Copy Link
              </button>
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: `${cardData?.name}'s Digital Card`,
                      text: `Check out ${cardData?.name}'s digital business card`,
                      url: viewCardUrl
                    }).catch(console.error)
                  } else {
                    navigator.clipboard.writeText(viewCardUrl)
                    toast.success('Link copied to clipboard!')
                  }
                }}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                <Share2Icon size={18} />
                Share
              </button>
            </div>
          </div>
        )}
        
        {/* View Count */}
        <div className="mt-8 text-center text-gray-500">
          <p>This card has been viewed {viewCount} times</p>
        </div>
      </div>
    </div>
  )
}

export default ShareCard