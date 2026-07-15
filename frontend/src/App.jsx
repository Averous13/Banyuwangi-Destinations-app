/* eslint-disable no-unused-vars */
import { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Destination from './pages/Destination/DestinationPage'
import LoginPage from './pages/Authentication/LoginPage'
import DashboardPage from './pages/DashboardPage'
import DestinationPanelPage from './pages/Destination/DestinationPanelPage'
import DestinationUpdatePage from './pages/Destination/DestinationUpdatePage'
import ProtectedRoute from './components/route/ProtectedRoute'
import PublicRoute from './components/route/PublicRoute'
import AdminRoute from './components/route/AdminRoute'
import { AuthContext } from './contexts/authContext'
import './App.css'
import './Prose.css'

import '@fontsource/bebas-neue/400.css'
import '@fontsource/sora/300.css'
import '@fontsource/sora/400.css'
import '@fontsource/sora/500.css'
import '@fontsource/sora/600.css'
import '@fontsource/sora/700.css'
import DestinationFormPage from './pages/Destination/DestinationFormPage'
import DestinationPage from './pages/Destination/DestinationPage'
import ArticlePage from './pages/Article/ArticlePage'
import ArticleUpdatePage from './pages/Article/ArticleUpdatePage'
import ArticleCreatePage from './pages/Article/ArticleCreatePage'
import ArticlePanelPage from './pages/Article/ArticlePanelPage'
import InteractiveMapPage from './pages/InteractiveMapPage'
import DestinationDetailPage from './pages/Destination/DestinationDetailPage'
import RegisterPage from './pages/Authentication/RegisterPage'
import JoinMitraPage from './pages/Authentication/JoinMitraPage'

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

          <Route path='/register' 
            element={
              <PublicRoute>
                <RegisterPage/>
              </PublicRoute>
            }/>

          <Route path='/register/mitra' 
            element={
              <PublicRoute>
                <JoinMitraPage/>
              </PublicRoute>
            }/>

          <Route path='/destinations' 
            element={
              <ProtectedRoute>
                <DestinationPage />
              </ProtectedRoute>
            }/>

          <Route path='/dashboard' 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }/>

          <Route path='/data-destinations'
            element={
              <AdminRoute>
                <DestinationPanelPage />
              </AdminRoute>
            }/>


          <Route path='/data-destinations/create'
            element={
              <AdminRoute>
                <DestinationFormPage />
              </AdminRoute>
            }/>

          <Route path='/data-destinations/:id'
            element={
              <ProtectedRoute>
                <DestinationDetailPage />
              </ProtectedRoute>
            }/>

          <Route path='/data-destinations/:id/update'
            element={
              <AdminRoute>
                <DestinationUpdatePage />
              </AdminRoute>
            }/>  


            <Route path='/data-article'
              element={
                <AdminRoute>
                  <ArticlePanelPage />
                </AdminRoute>
              }/>

            <Route path='/data-article/create'
              element={
                <AdminRoute>
                  <ArticleCreatePage />
                </AdminRoute>
              }/>

            <Route path='/data-article/:id'
              element={
                <AdminRoute>
                  <ArticlePage />
                </AdminRoute>
              }/>

              <Route path='/data-article/:id/update'
                element={
                  <AdminRoute>
                    <ArticleUpdatePage />
                  </AdminRoute>
                }/>

            <Route path='/map-destinations'
              element={
                <AdminRoute>
                  <InteractiveMapPage />
                </AdminRoute>
              }/>
              
            <Route path='/article/:id' 
              element={
                <ArticlePage />
              }
              />

            <Route path='*' element={<Navigate to='/' replace />}/>
        </Routes>
      </div>
    </>
  )
}

export default App



// export default App;
