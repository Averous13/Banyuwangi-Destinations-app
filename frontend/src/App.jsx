/* eslint-disable no-unused-vars */
import { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Destination from './pages/DestinationPage'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import DestinationPanelPage from './pages/DestinationPanelPage'
import DestinationUpdatePage from './pages/DestinationUpdatePage'
import ProtectedRoute from './components/route/ProtectedRoute'
import PublicRoute from './components/route/PublicRoute'
import AdminRoute from './components/route/AdminRoute'
import { AuthContext } from './contexts/authContext'
import './App.css'

import '@fontsource/bebas-neue/400.css'
import '@fontsource/sora/300.css'
import '@fontsource/sora/400.css'
import '@fontsource/sora/500.css'
import '@fontsource/sora/600.css'
import '@fontsource/sora/700.css'
import DestinationFormPage from './pages/DestinationFormPage'
import ArticleEditPage from './pages/ArticleEditPage'
import DestinationPage from './pages/DestinationPage'
import ArticlePage from './pages/ArticlePage'
import ArticleUpdatePage from './pages/ArticleUpdatePage'
import TestPage from './pages/TestPage'

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

          <Route path='/destinations' 
            element={
              <ProtectedRoute>
                <DestinationPage />
              </ProtectedRoute>
            }/>

            <Route path='/destination/:id'
              element={
                <ProtectedRoute>
                  <ArticlePage />
                </ProtectedRoute>
              }
              />

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

          <Route path='/data-destinations/:id/update'
            element={
              <AdminRoute>
                <DestinationUpdatePage />
              </AdminRoute>
            }/>  

            <Route path='/data-destinations/article/:id/edit' 
              element={
                <AdminRoute>
                  <ArticleEditPage />
                </AdminRoute>
              }
            />

            <Route path='/data-destinations/article/:id/update' 
              element={
                <AdminRoute>
                  <ArticleUpdatePage />
                </AdminRoute>
              }
            />
            <Route path='/test' 
              element={
                <AdminRoute>
                  <TestPage />
                </AdminRoute>
              }
            />




            <Route path='*' element={<Navigate to='/' replace />}/>
        </Routes>
      </div>
    </>
  )
}

export default App

// import { useState, useEffect } from 'react';

// function App() {
//   const [isScrolled, setIsScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       const heroSection = document.getElementById('hero');
//       if (heroSection) {
//         const heroBottom = heroSection.offsetHeight;
//         setIsScrolled(window.scrollY > heroBottom - 100);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   return (
//     <div className="min-h-screen">
//       {/* Header */}
//       <header 
//         className={`fixed top-0 w-full z-50 transition-all duration-300 ${
//           isScrolled 
//             ? 'bg-white shadow-lg' 
//             : 'bg-transparent'
//         }`}
//       >
//         <nav className="container mx-auto px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div className={`text-2xl font-bold transition-colors ${
//               isScrolled ? 'text-gray-800' : 'text-white'
//             }`}>
//               MyBrand
//             </div>
            
//             <ul className="flex gap-8">
//               {['Home', 'About', 'Services', 'Contact'].map((item) => (
//                 <li key={item}>
//                   <a 
//                     href={`#${item.toLowerCase()}`}
//                     className={`font-medium transition-colors ${
//                       isScrolled 
//                         ? 'text-gray-700 hover:text-blue-600' 
//                         : 'text-white hover:text-gray-200'
//                     }`}
//                   >
//                     {item}
//                   </a>
//                 </li>
//               ))}
//             </ul>

//             <button 
//               className={`px-6 py-2 rounded-full font-medium transition-all ${
//                 isScrolled 
//                   ? 'bg-blue-600 text-white hover:bg-blue-700' 
//                   : 'bg-white text-gray-800 hover:bg-gray-100'
//               }`}
//             >
//               Get Started
//             </button>
//           </div>
//         </nav>
//       </header>

//       {/* Hero Section */}
//       <section 
//         id="hero" 
//         className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-700"
//       >
//         <div className="text-center text-white px-6">
//           <h1 className="text-6xl font-bold mb-6">
//             Welcome to MyBrand
//           </h1>
//           <p className="text-xl mb-8 max-w-2xl mx-auto">
//             Create amazing experiences with our innovative solutions. 
//             Transform your ideas into reality.
//           </p>
//           <div className="flex gap-4 justify-center">
//             <button className="px-8 py-3 bg-white text-blue-600 rounded-full font-semibold hover:bg-gray-100 transition-colors">
//               Learn More
//             </button>
//             <button className="px-8 py-3 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-all">
//               Watch Demo
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* About Section */}
//       <section id="about" className="py-20 bg-white">
//         <div className="container mx-auto px-6">
//           <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
//             About Us
//           </h2>
//           <div className="max-w-3xl mx-auto text-gray-600 text-lg">
//             <p className="mb-6">
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
//               tempor incididunt ut labore et dolore magna aliqua.
//             </p>
//             <p>
//               Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi 
//               ut aliquip ex ea commodo consequat.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Services Section */}
//       <section id="services" className="py-20 bg-gray-50">
//         <div className="container mx-auto px-6">
//           <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
//             Our Services
//           </h2>
//           <div className="grid md:grid-cols-3 gap-8">
//             {[1, 2, 3].map((item) => (
//               <div key={item} className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow">
//                 <div className="w-16 h-16 bg-blue-600 rounded-lg mb-6 flex items-center justify-center text-white text-2xl font-bold">
//                   {item}
//                 </div>
//                 <h3 className="text-xl font-bold mb-4 text-gray-800">
//                   Service {item}
//                 </h3>
//                 <p className="text-gray-600">
//                   Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
//                   Sed do eiusmod tempor incididunt.
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Contact Section */}
//       <section id="contact" className="py-20 bg-white">
//         <div className="container mx-auto px-6">
//           <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
//             Contact Us
//           </h2>
//           <div className="max-w-xl mx-auto">
//             <form className="space-y-6">
//               <input 
//                 type="text" 
//                 placeholder="Your Name"
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
//               />
//               <input 
//                 type="email" 
//                 placeholder="Your Email"
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
//               />
//               <textarea 
//                 placeholder="Your Message"
//                 rows="5"
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
//               ></textarea>
//               <button className="w-full px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
//                 Send Message
//               </button>
//             </form>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-800 text-white py-8">
//         <div className="container mx-auto px-6 text-center">
//           <p>&copy; 2024 MyBrand. All rights reserved.</p>
//         </div>
//       </footer>
//     </div>
//   );
// }

// export default App;
