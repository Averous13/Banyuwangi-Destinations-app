/* eslint-disable no-unused-vars */
import { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Destination from './pages/DestinationPage'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'
import { AuthContext } from './contexts/authContext'
import './App.css'

import '@fontsource/bebas-neue/400.css'
import '@fontsource/sora/300.css'
import '@fontsource/sora/400.css'
import '@fontsource/sora/500.css'
import '@fontsource/sora/600.css'
import '@fontsource/sora/700.css'

function App() {
  const { user, loading } = useContext(AuthContext);

    if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 font-sora">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="relative h-full w-full">
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/destination' element={<Destination />} />
          <Route path='/login' 
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }/>

          <Route path='/dashboard' 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }/>

            <Route path='*' element={<Navigate to='/' replace />}/>
        </Routes>
      </div>
    </>
  )
}

export default App
