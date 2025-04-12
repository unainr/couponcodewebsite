import SideCoupon from '@/components/SideCoupon'
import { client } from '@/sanity/lib/client'
import { FETCH_STORE_BY_SLUG } from '@/sanity/lib/queries'
import { notFound } from 'next/navigation'
import React from 'react'

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
