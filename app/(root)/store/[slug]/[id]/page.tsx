import SideCoupon from '@/components/SideCoupon'
import { client } from '@/sanity/lib/client'
import { FETCH_STORE_BY_SLUG } from '@/sanity/lib/queries'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'


export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  
  // Fetch store data for metadata
  const storeData = await client.fetch(FETCH_STORE_BY_SLUG, { slug })
  
  if (!storeData) {
    return {
      title: 'Store Not Found | RedeemlynNow',
      description: 'The requested store could not be found. Browse our other stores for coupon codes and deals.',
    }
  }
  
  // Use custom meta fields if available, otherwise generate optimized ones
  const title = storeData.metatitle || 
    `${storeData.name} Coupon Codes & Promo Offers - Save Today | RedeemlynNow`
  
  const description = storeData.metadescription || 
    `Get exclusive ${storeData.name} coupon codes, promo offers, and discount deals. Save money on your ${storeData.name} purchases with verified and daily updated promotions from RedeemlynNow.`
  
  return {
    title,
    description,
    keywords: storeData.metakeywords || `${storeData.name} coupons, ${storeData.name} promo codes, ${storeData.name} discount codes, ${storeData.name} deals, RedeemlynNow`,
  }
}



const CouponCodePage = async ({params,}: {params: Promise<{ slug: string }>}) => {
   const { slug } = await params
     
     // Fetch store data
     const storeData = await client.fetch(FETCH_STORE_BY_SLUG, { slug })
     
     // If store doesn't exist, show 404
     if (!storeData) {
       notFound()
     }
  return (
    <div className='flex justify-center items-center min-h-screen'>
<SideCoupon slug={slug}/>
    </div>
  )
}

export default CouponCodePage

export const revalidate = 60;
