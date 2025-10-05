'use client'
import React from 'react'
import Link from 'next/link'
import CouponCard from './CouponCard'

interface PopularCoupon {
  _id: string
  coupontitle: string
  description: string
  couponurl: string
  couponcode: string
  coupontype: string
  publishdate: string
  expiredate: string
  featured: string
  storeImage: string
  storeSlug: string
  storeName: string
}

interface PopularCouponsProps {
  coupons: PopularCoupon[]
}

const PopularCoupons = ({ coupons }: PopularCouponsProps) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 relative after:content-[''] after:absolute after:w-24 after:h-1 after:bg-orange-500 after:bottom-0 after:left-0 after:mt-2 pb-4">
          Today's Best Deals
        </h2>
        
        {/* Coupons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {coupons.map((coupon) => (
            <CouponCard key={coupon._id} coupon={coupon} />
          ))}
        </div>
        
       
      </div>
    </section>
  )
}

export default PopularCoupons
