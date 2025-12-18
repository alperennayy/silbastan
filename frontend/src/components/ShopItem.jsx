import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ShopItem = ({ shopId }) => {

    const shop = useSelector(state =>
        state.filter.allShops.find(shop => shop._id === shopId)
    )

    if (!shop) return null

    return (
        <Link
            className='block bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100'
            to={`/shop/${shop._id}`}
        >
            <div className='overflow-hidden'>
                <img
                    className='hover:scale-110 transition ease-in-out'
                    src={shop.image[0]}
                    alt={shop.name}
                    loading='lazy'
                />
            </div>

            <p className='pt-3 pb-1 text-sm'>{shop.name}</p>
            <p className='text-sm font-medium'>{shop.category}</p>
            <p className='text-sm font-medium'>{shop.salonType}</p>
            <p className='text-sm font-medium'>{shop.location.text}</p>
        </Link>
    )
}

export default ShopItem
