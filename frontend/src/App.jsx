import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home.jsx'
import Shops from './pages/Shops.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Shop from './pages/Shop.jsx'
import Footer from './components/Footer.jsx'
import MakeReservation from './pages/MakeReservation.jsx'
import ReservationDetail from './pages/ReservationDetail.jsx'
import Login from './pages/Login.jsx'


const App = () => {


  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/shops/:salonType?/:city?/:district?' element={<Shops />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/shop/:shopId' element={<Shop />} />
        <Route path='/shop/:shopId/make-reservation' element={<MakeReservation />} />
        <Route path='/shop/:shopId/make-reservation/:service/:serviceId/:employee/:employeeId' element={<ReservationDetail />} />

      </Routes>
      <Footer />
    </div>
  )
}

export default App