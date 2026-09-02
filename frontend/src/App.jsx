/* eslint-disable no-unused-vars */
import { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Destination from './pages/Destination/DestinationPage'
import LoginPage from './pages/Authentication/LoginPage'
import DashboardPage from './pages/Dashboard/DashboardPage'
import MitraPage from './pages/Dashboard/MitraPage'
import DestinationPanelPage from './pages/Destination/DestinationPanelPage'
import DestinationUpdatePage from './pages/Destination/DestinationUpdatePage'
import ProtectedRoute from './components/route/ProtectedRoute'
import PublicRoute from './components/route/PublicRoute'
import AdminRoute from './components/route/AdminRoute'
import { AuthContext } from './contexts/authContext'
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
import { Sidebar } from 'lucide-react'
import AdminPage from './pages/Dashboard/AdminPage'
import ComingSoonPage from './pages/ComingSoonPage'

import './App.css'
import './Prose.css'
import '@fontsource/bebas-neue/400.css'
import '@fontsource/sora/300.css'
import '@fontsource/sora/400.css'
import '@fontsource/sora/500.css'
import '@fontsource/sora/600.css'
import '@fontsource/sora/700.css'
import Loading from './components/main/Loading'

function App() {
  const { user, loading, isAdmin } = useContext(AuthContext);

    if (loading) {
    return (
      <Loading />
    );
  }

  return (
    <>
      <div className="relative h-full w-full">
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/destination' element={<Destination />} />
          <Route path='/flex' element={<Sidebar />}/>
          
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

          <Route path='/dashboard/admin' 
            element={
              <AdminRoute>
                <AdminPage />
              </AdminRoute>
            }/>

          <Route path='/home' 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
          }/>

          <Route path='/dashboard/mitra' 
            element={
              <ProtectedRoute>
                <MitraPage />
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
                <ProtectedRoute>
                  <InteractiveMapPage />
                </ProtectedRoute>
              }/>
              
            <Route path='/article/:id' 
              element={
                <ArticlePage />
              }
              />

            <Route path='*'
            element={
              <ComingSoonPage />
            }/>
        </Routes>
      </div>
    </>
  )
}

export default App



// export default App;
