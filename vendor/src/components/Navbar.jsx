import React from 'react'
import { assets } from '../assets/assets'
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { logoutUser } from '../../../frontend/src/redux/slices/authSlice';



const Navbar = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutHandler = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      window.location.href = "http://localhost:5173/login";
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
      <img className='w-[max(10%,80px)]' src={assets.logo} alt="" />
      <button onClick={logoutHandler} className='bg-violet-800 text-white px-5 py-2 sm:py-2 rounded-full text-xs sm:text-sm' >Logout</button>

    </div>
  )
}

export default Navbar