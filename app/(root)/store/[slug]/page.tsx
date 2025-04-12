import React from 'react'
import SideCoupon from '@/components/SideCoupon'


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

export const revalidate = 60;
