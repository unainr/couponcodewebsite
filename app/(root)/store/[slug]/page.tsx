import React from 'react'
import { client } from '@/sanity/lib/client'
import { FETCH_STORE_BY_SLUG } from '@/sanity/lib/queries'
import SideCoupon from '@/components/SideCoupon'
import { notFound } from 'next/navigation'

const StorePage = async ({params,}: {params: Promise<{ slug: string }>}) => {
  const { slug } = await params
  
  // Fetch store data
  // const storeData = await client.fetch(FETCH_STORE_BY_SLUG, { slug })
  
  // // If store doesn't exist, show 404
  // if (!storeData) {
  //   notFound()
  // }
  
  return (
    <div className='min-h-screen'>
      <SideCoupon slug={slug} />
    </div>
  )
}

export default StorePage

