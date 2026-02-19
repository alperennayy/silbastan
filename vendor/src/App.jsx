//..
import Navbar from './components/Navbar.jsx'
import Sidebar from './components/Sidebar.jsx'
import { Routes, Route } from 'react-router-dom'
import Add from './pages/Add.jsx'
import List from './pages/Randevu.jsx'
import ShopCart from "./pages/ShopCart.jsx";
import { useSelector } from "react-redux";


import { ToastContainer } from 'react-toastify';
const VendorHome = () => {
  const vendorShop = useSelector(state => state.shop.vendorShop);
console.log("REDUX vendorShop:", vendorShop);
  return vendorShop ? <ShopCart /> : <Add />;
};
const App = () => {
  
  return (
    <div className=''>
      <ToastContainer />
      <>
        <Navbar />
        <hr />
        <div className='flex w-full'>
          <Sidebar />
          <div className='w-[70%] mx-auto ml-[max(5vw, 25px)] my-8 text-gray-600 text-base'>
            <Routes>
              <Route path='/' element={<VendorHome />} />
              <Route path='/add' element={<VendorHome />} />
              <Route path='/list' element={<List />} />
            </Routes>
          </div>
        </div>
      </>
    </div>
  )
}

export default App