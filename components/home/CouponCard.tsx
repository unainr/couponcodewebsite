'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Tag, Clock, Star, TrendingUp } from 'lucide-react'
import { Button } from '../ui/button'

interface CouponCardProps {
  coupon: {
    _id: string
    coupontitle: string
    description: string
    couponurl: string
    couponcode: string
    coupontype: string
    expiredate: string
    featured: string
    storeImage: string
    storeName: string
    storeSlug: string
  }
}

const CouponCard = ({ coupon }: CouponCardProps) => {
  const storeId = coupon._id.split('-')[0]
  const isExpiringSoon = new Date(coupon.expiredate).getTime() - new Date().getTime() < 7 * 24 * 60 * 60 * 1000

  // Clean description - remove HTML tags and markdown symbols
  const cleanDescription = (text: string) => {
    return text
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/\*\*/g, '') // Remove ** markdown
      .replace(/\*/g, '') // Remove * markdown
      .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Remove markdown links
      .trim()
  }

  const handleClick = () => {
    // Redirect current tab to coupon URL after delay
    setTimeout(() => {
      if (coupon.couponurl) {
        window.location.href = coupon.couponurl
      }
    }, 1000)
  }

  return (
    <div className="group bg-white rounded-xl border-2 border-gray-200 hover:border-orange-400 overflow-hidden transition-all duration-300 shadow-sm hover:shadow-lg">
      {/* Store Logo Header */}
      <div className="relative bg-gradient-to-br from-orange-50 via-white to-blue-50 p-6 flex items-center justify-center h-32 border-b-2 border-gray-100">
        {coupon.storeImage && (
          <div className="relative w-32 h-20">
            <Image
              src={coupon.storeImage}
              alt={coupon.storeName}
              fill
              className="object-contain drop-shadow-sm"
            />
          </div>
        )}
        
        {/* Featured Badge */}
        {coupon.featured && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-pink-600 text-white px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
            <Star className="w-3 h-3 fill-white" />
            <span className="text-xs font-bold">{coupon.featured}</span>
          </div>
        )}
        
        {/* Expiring Soon Badge */}
        {isExpiringSoon && (
          <div className="absolute top-3 left-3 bg-yellow-500 text-white px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span className="text-xs font-bold">Ending Soon</span>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <h3 className="text-base font-bold text-gray-900 mb-3 line-clamp-2 min-h-[48px] group-hover:text-orange-600 transition-colors">
          {coupon.coupontitle}
        </h3>
        
        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 min-h-[40px] leading-relaxed">
          {cleanDescription(coupon.description)}
        </p>
        
        {/* Store Name */}
        <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-100">
          <div className="p-1.5 bg-orange-100 rounded">
            <Tag className="w-3.5 h-3.5 text-orange-600" />
          </div>
          <span className="text-sm font-semibold text-gray-700">{coupon.storeName}</span>
        </div>
        
        {/* Button */}
        <Link 
          href={`/store/${coupon.storeSlug}/${storeId}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
        >
          <Button 
            className={`w-full text-white text-sm font-bold py-3.5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-[1.02] ${
              coupon.coupontype?.toLowerCase() === 'coupon code' 
                ? 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700' 
                : 'bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black'
            }`}
          >
            {coupon.coupontype?.toLowerCase() === 'coupon code' ? 'Get Code' : 'Get Deal'}
          </Button>
        </Link>
        
        {/* Expiry */}
        <div className="flex items-center justify-center gap-1.5 mt-3 text-xs text-gray-500">
          <Clock className="w-3.5 h-3.5" />
          <span className="font-medium">Expires: {new Date(coupon.expiredate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        </div>
      </div>
    </div>
  )
}

export default CouponCard
