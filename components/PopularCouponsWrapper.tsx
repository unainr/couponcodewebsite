import React from 'react'
import { client } from '@/sanity/lib/client'
import PopularCoupons from './home/PopularCoupons'

// Query to fetch active coupons (only non-expired, ordered by latest)
const FETCH_POPULAR_COUPONS = `*[_type == "addCoupon" && dateTime(expiredate) > dateTime(now())] | order(_updatedAt desc, publishdate desc)[0...8] {
  _id,
  coupontitle,
  description,
  couponurl,
  couponcode,
  "coupontype": coupontype->name,
  publishdate,
  expiredate,
  "featured": featured->name,
  "storeImage": store->images[0].asset->url,
  "storeSlug": store->slug.current,
  "storeName": store->name
}`

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

const PopularCouponsWrapper = async () => {
  const coupons = await client.fetch<PopularCoupon[]>(FETCH_POPULAR_COUPONS)
  
  return <PopularCoupons coupons={coupons} />
}

export default PopularCouponsWrapper
