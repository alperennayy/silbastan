import React from 'react'
import { useNavigate } from 'react-router-dom'

const Footer = () => {

    const navigate = useNavigate()

    return (
        <div>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-12 my-10 mt-40 text-sm'>
                <div>
                    <h2 className='text-lg mb-5'>BE-NICE</h2>
                    <p className='w-full md:w-2/3 text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio ab deleniti voluptate atque ipsum mollitia corrupti ducimus necessitatibus, repudiandae autem. Debitis ex placeat, quod aliquam possimus veniam sint odio itaque.</p>
                </div>

                <div>
                    <h2 className='text-xl font-medium mb-5'>COMPANY</h2>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li className='cursor-pointer' onClick={() => navigate('/')}>HOME</li>
                        <li className='cursor-pointer' onClick={() => navigate('/shops')}>SHOPS</li>
                        <li className='cursor-pointer' onClick={() => navigate('/about')}>ABOUT</li>
                        <li className='cursor-pointer' onClick={() => navigate('/contact')}>CONTACT</li>
                    </ul>
                </div>

                <div>
                    <h2 className='text-xl font-medium mb-5'>GET IN TOUCH</h2>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li >0533 234 12 09</li>
                        <li>alperenyazilim34@gmail.com</li>
                    </ul>
                </div>
            </div>
            <div>
                <hr />
                <p className='py-5 text-sm text-center'>Copyright 2025@ bi-nice.com - All Right Reserved</p>
            </div>
        </div>
    )
}

export default Footer