import React from 'react'
import { Store } from '@/lib/types'
import { client } from '@/sanity/lib/client'
import { FETCH_STORE } from '@/sanity/lib/queries'
import Image from 'next/image'
import Link from 'next/link'

const StoreFetch = async () => {
  const stores = await client.fetch<Store[]>(FETCH_STORE)
  
  return (
<section className="py-16 ">
  <div className="container mx-auto px-4">
  <h2 className="text-2xl md:text-3xl font-bold text-left text-gray-800 mb-8 relative after:content-[''] after:absolute after:w-24 after:h-1 after:bg-orange-500 after:bottom-0 after:left-0 after:mt-2 pb-4">
  Most Popular Stores
</h2>
    
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 md:gap-7">
      {stores.map((store) => (
        <Link
          href={`/store/${encodeURIComponent(store.slug)}`}
          key={store._id}
        >
          <div className="bg-white   hover:border-2 hover:border-orange-500 transition-all duration-300 p-5 h-36 flex  items-center justify-center overflow-hidden">
            <div className="relative w-full h-24">
              {store.imageUrl ? (
                <Image
                  src={store.imageUrl}
                  alt={store.name}
                  fill
                  className="object-contain"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded">
                  <span className="text-gray-400 text-sm">No image</span>
                </div>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  </div>
</section>
  )
}

export default StoreFetch
export const revalidate = 60;
