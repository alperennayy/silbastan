
import Navbar from './components/Navbar.jsx'
import Sidebar from './components/Sidebar.jsx'
import { Routes, Route } from 'react-router-dom'
import Add from './pages/Add.jsx'
import List from './pages/Randevu.jsx'


import { ToastContainer } from 'react-toastify';

const App = () => {

  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer />
      
    
        <>
          <Navbar />
          <hr />
          <div className='flex w-full'>
            <Sidebar />
            <div className='w-[70%] mx-auto ml-[max(5vw, 25px)] my-8 text-gray-600 text-base'>
              <Routes>
               <Route path='/add' element={<Add />} /> 
               <Route path='/' element={<Add />} />
               <Route path='/list' element={<List />} />
               
              </Routes>
            </div>
          </div>
        </>
      

    </div>
  )
}

export default App