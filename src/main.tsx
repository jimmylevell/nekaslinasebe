import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './types/window.d.ts'

// Import vendor CSS
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'aos/dist/aos.css'
import 'swiper/css/bundle'

// Import vendor JS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import AOS from 'aos'
import Isotope from 'isotope-layout'
import Swiper from 'swiper/bundle'

// Initialize AOS
AOS.init({
  duration: 1000,
  easing: 'ease-in-out',
  once: true,
  mirror: false
})

// Make libraries available globally for legacy code
declare global {
  interface Window {
    AOS: typeof AOS;
    Isotope: typeof Isotope;
    Swiper: typeof Swiper;
  }
}

window.AOS = AOS
window.Isotope = Isotope
window.Swiper = Swiper

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
