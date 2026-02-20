import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { useSelector } from "react-redux";
import Login from './pages/Login.jsx'
import Add from './pages/Add.jsx'
import Navbar from './components/Navbar.jsx'
import Sidebar from './components/Sidebar.jsx'


const App = () => {

  const { isAuthenticated } = useSelector((state) => state.auth);

  const location = useLocation()
  const isLoginPage = location.pathname === "/";

  return (
    <div>

      {/* Login yapıldıysa navbar + sidebar göster */}
      {!isLoginPage && (
        <>
          <Navbar />
          <hr />
          <div className='flex w-full'>
            <Sidebar />
            <div className='w-[70%] mx-auto ml-[max(5vw, 25px)] my-8 text-gray-600 text-base'>
              <Routes>
                <Route
                  path='/add'
                  element={
                    isAuthenticated ? <Add /> : <Navigate to='/' />
                  }
                />
              </Routes>
            </div>
          </div>
        </>
      )}

      {/* Login sayfası */}
      {isLoginPage && (
        <div className='w-[70%] mx-auto my-8 text-gray-600 text-base'>
          <Routes>
            <Route path='/' element={<Login />} />
          </Routes>
        </div>
      )}

    </div>
  )
}

export default App