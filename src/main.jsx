import { GoogleOAuthProvider } from '@react-oauth/google'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import App from './App.jsx'
import Header from './components/custom/Header.jsx'
import CreateTrip from './CreateTrip/CreateTrip.jsx'
import './index.css'
import MyTrips from './mytrips/MyTrips.jsx'
import ViewTrip from './ViewTrip/[tripId]/ViewTrip.jsx'

const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>
  },
  {
    path:'/create-trip',
    element:<CreateTrip/>
  },
  {
    path:'/view-trip/:tripId',
    element:<ViewTrip/>
  },
  {
    path:'/my-trips',
    element:<MyTrips/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
    <Header/>
    <RouterProvider router = {router} />
    <ToastContainer position="top-right" autoClose={3000} />
    </GoogleOAuthProvider>
  </StrictMode>,
)
