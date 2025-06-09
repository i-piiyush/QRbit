import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { doc, getDoc, updateDoc, increment } from 'firebase/firestore'
import { db } from '../firebaseConfig'
import QRCode from 'react-qr-code'
import { AppContext } from '../Context/AppProvider'
import { LoaderIcon, CopyIcon, Share2Icon } from 'lucide-react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ShareCard = () => {
  const { userId } = useParams()
  const navigate = useNavigate()
  const { user } = useContext(AppContext)
  const [cardData, setCardData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [viewCount, setViewCount] = useState(0)
  const [activeTab, setActiveTab] = useState('qr')

  const viewCardUrl = userId ? `${window.location.origin}/user-cards/view-card/${userId}` : null

  useEffect(() => {
    if (!userId) {
      showToast('Invalid user ID', 'error')
      navigate('/')
      return
    }

    const fetchData = async () => {
      try {
        const userDocRef = doc(db, 'users', userId)
        const userDocSnap = await getDoc(userDocRef)

        if (!userDocSnap.exists()) {
          showToast('User card not found', 'error')
          navigate('/')
          return
        }

        setCardData(userDocSnap.data())

        const viewsDocRef = doc(db, 'cardViews', userId)
        const viewsDocSnap = await getDoc(viewsDocRef)
        const viewsData = viewsDocSnap.exists() ? viewsDocSnap.data().views : { count: 0 }
        const currentViews = typeof viewsData === 'object' ? viewsData.count || 0 : viewsData

        // Don't count self-views
        if (user && user.uid === userId) {
          setViewCount(currentViews)
          return
        }

        const sessionKey = `viewed-${userId}`
        const alreadyViewed = sessionStorage.getItem(sessionKey)

        if (!alreadyViewed) {
          await updateDoc(viewsDocRef, {
            'views.count': increment(1),
            lastViewed: new Date()
          }, { merge: true })

          setViewCount(currentViews + 1)
          sessionStorage.setItem(sessionKey, 'true')
        } else {
          setViewCount(currentViews)
        }
      } catch (error) {
        console.error('Error:', error)
        showToast('Failed to load card', 'error')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [userId, user, navigate])

  const showToast = (message, type = 'success') => {
    const toastOptions = {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'dark',
      style: {
        backgroundColor: type === 'error' ? '#ef4444' : '#fff',
        color: '#000',
        borderRadius: '12px',
      }
    }

    if (type === 'error') {
      toast.error(message, toastOptions)
    } else {
      toast.success(message, toastOptions)
    }
  }

  const handleShare = async () => {
    if (!viewCardUrl) return

    try {
      if (navigator.share) {
        await navigator.share({
          title: `${cardData?.name}'s Digital Card`,
          text: `Check out ${cardData?.name}'s digital business card`,
          url: viewCardUrl,
        })
      } else {
        await navigator.clipboard.writeText(viewCardUrl)
        showToast('Link copied to clipboard!')
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        await navigator.clipboard.writeText(viewCardUrl)
        showToast('Link copied to clipboard!')
      }
    }
  }

  const handleCopy = async () => {
    if (!viewCardUrl) return
    try {
      await navigator.clipboard.writeText(viewCardUrl)
      showToast('Link copied successfully!')
    } catch (err) {
      showToast('Failed to copy link', 'error')
    }
  }

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-black">
        <LoaderIcon className="animate-spin h-12 w-12 text-green-400" />
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen bg-black p-4 flex items-center justify-center">
      <ToastContainer />
      <div className="max-w-md w-full mx-auto bg-gray-900 rounded-2xl overflow-hidden shadow-lg backdrop-blur-sm border border-gray-800">
        <div className="p-6">
          <h1 className="text-2xl font-semibold text-white mb-3">{cardData?.name}'s Digital Card</h1>
          <p className="text-gray-400 mb-6">Views: <span className="text-green-400 font-medium">{viewCount}</span></p>

          <div className="flex justify-center mb-8 p-6 bg-black rounded-xl border border-gray-800">
            {activeTab === 'qr' && viewCardUrl && (
              <QRCode 
                value={viewCardUrl} 
                size={200} 
                bgColor="transparent"
                fgColor="#ffffff"  // White QR code
                level="H"
              />
            )}
          </div>

          <div className="flex flex-col space-y-3">
            <button 
              onClick={handleCopy}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 active:bg-gray-600 text-white rounded-xl transition-all duration-200 ease-in-out"
            >
              <CopyIcon size={18} className="text-green-400" />
              <span>Copy Link</span>
            </button>
            <button 
              onClick={handleShare}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-green-400 hover:bg-green-500 active:bg-green-600 text-gray-900 font-medium rounded-xl transition-all duration-200 ease-in-out"
            >
              <Share2Icon size={18} />
              <span>Share Card</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShareCard