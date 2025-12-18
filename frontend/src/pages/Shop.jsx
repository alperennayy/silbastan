import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { fetchShopData } from '../redux/slices/shopSlice'
import { assets } from '../assets/assets'

const Shop = () => {

    const { shopId } = useParams()
    const dispatch = useDispatch()

    const { shopData, loading, error } = useSelector(state => state.shop)
    const [image, setImage] = useState(null)

    useEffect(() => {
        dispatch(fetchShopData(shopId))
    }, [dispatch, shopId])

    useEffect(() => {
        if (shopData?.image?.length) {
            setImage(shopData.image[0])
        }
    }, [shopData])

    if (loading) {
        return <p className="p-10 text-center">Yükleniyor...</p>
    }

    if (error) {
        return <p className="p-10 text-center text-red-500">{error}</p>
    }

    if (!shopData) return null

    return (
        <div className="border-t-2 pt-6 sm:pt-10 px-4 sm:px-0">

            <div className="flex flex-col lg:flex-row gap-10">

                {/* ================= IMAGES ================= */}
                <div className="flex-1">

                    {/* MAIN IMAGE */}
                    <img
                        src={image}
                        alt={shopData.name}
                        className="w-full h-[260px] sm:h-[360px] object-cover rounded-xl"
                    />

                    {/* THUMBNAILS */}
                    <div className="flex gap-3 mt-4 overflow-x-auto">
                        {shopData.image.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                onClick={() => setImage(img)}
                                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border transition
                  ${image === img ? 'border-black' : 'border-gray-200'}`}
                                alt=""
                            />
                        ))}
                    </div>
                </div>

                {/* ================= INFO ================= */}
                <div className="flex-1">

                    <h1 className="text-xl sm:text-2xl font-semibold">
                        {shopData.name}
                    </h1>

                    <p className="text-gray-500 mt-1">
                        {shopData.location.text}
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                        <span className="text-sm">{shopData.rating}</span>
                        <img src={assets.starIcon} className="w-4" alt="rating" />
                    </div>

                    <p className="mt-4 text-gray-500 text-sm sm:text-base">
                        {shopData.description}
                    </p>

                    {/* CTA */}
                    <Link to={`/shop/${shopId}/make-reservation`}>
                        <button className="
              w-full sm:w-auto
              bg-black text-white
              mt-6 px-8 py-4
              rounded-lg
              hover:bg-gray-800 transition
            ">
                            Hizmet Seç
                        </button>
                    </Link>

                    <hr className="mt-8 sm:w-4/5" />
                </div>

            </div>
        </div>
    )
}

export default Shop
