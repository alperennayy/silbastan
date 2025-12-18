import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useDispatch, useSelector } from 'react-redux'



const Navbar = () => {

    const navigate = useNavigate()

    const dispatch = useDispatch()
    const { resetFilters } = useSelector(state => state.filter)

    const [visible, setVisible] = useState(false)


    return (
        <div className='flex items-center justify-between py-5 '>
            <Link to='/'><h1 className='text-2xl'>BE-NICE</h1></Link>
            <ul className='hidden sm:flex gap-5 text-md text-gray-700'>
                <NavLink to='/'>
                    <p>HOME</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden mx-auto' />
                </NavLink>
                <NavLink to='/shops' onClick={() => dispatch(resetFilters())} >
                    <p >SHOPS</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden mx-auto' />
                </NavLink>
                <NavLink to='/about'>
                    <p>ABOUT</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden mx-auto' />
                </NavLink>
                <NavLink to='/contact'>
                    <p>CONTACT</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden mx-auto' />
                </NavLink>
            </ul>
            <div className='flex items-center gap-6'>
                <img onClick={() => navigate('/login')} className='w-5 cursor-pointer' src={assets.profileIcon} alt="" />
                <img onClick={() => setVisible(true)} src={assets.menuIcon} className='w-5 cursor-pointer sm:hidden' alt="" />
            </div>

            {/* Mobil uyumlu */}

            <div className={`absolute top-0 right-0 bottom-0 overflow-hidden  bg-white transition-all ${visible ? 'w-full' : 'w-0'}`} >
                <div className='flex flex-col text-gray-600 font-medium'>
                    <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                        <img className='h-4 rotate-180' src={assets.dropdownIcon} alt="" />
                        <p>Back</p>
                    </div>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/'>HOME</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/shops'>SHOPS</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/about'>ABOUT</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/contact'>CONTACT</NavLink>
                </div>
            </div>
        </div >
    )
}

export default Navbar