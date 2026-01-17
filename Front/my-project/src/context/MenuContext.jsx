import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const MenuContext = createContext()

export const useMenu = () => {
  const context = useContext(MenuContext)
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider')
  }
  return context
}

export const MenuProvider = ({ children }) => {
  const [menuItems, setMenuItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  const fetchMenuItems = useCallback(async (category = null) => {
  try {
    setLoading(true)
    setError(null)

    const url = category
      ? `${import.meta.env.VITE_API_URL}/api/menu?category=${encodeURIComponent(category)}`
      : `${import.meta.env.VITE_API_URL}/api/menu`

    console.log('Fetching menu items from:', url)

    const response = await axios.get(url)

   
    setMenuItems(Array.isArray(response.data) ? response.data : []);
  } catch (err) {
    console.error('Error fetching menu items:', err)
    const errorMessage = err.response?.data?.message || err.message || 'Failed to load menu items'
    setError(errorMessage)
    toast.error(errorMessage)
    setMenuItems([])
  } finally {
    setLoading(false)
  }
}, [])


  
  useEffect(() => {
    fetchMenuItems()
  }, [fetchMenuItems])

  const value = {
    menuItems,
    loading,
    error,
    fetchMenuItems,
  }

  return (
    <MenuContext.Provider value={value}>
      {children}
    </MenuContext.Provider>
  )
}
