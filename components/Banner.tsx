import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function SimpleBanner() {
  return (
    <div className="w-full relative overflow-hidden  shadow-lg mb-8 h-[400px]" >
      {/* Background Image from Unsplash */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="https://images.unsplash.com/photo-1607083206968-13611e3d76db?q=80&w=1920&auto=format&fit=crop"
          alt="Coupon deals banner"
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
      </div>

      {/* Content */}
      <div className="absolute left-10 top-1/2 -translate-y-1/2 max-w-lg  z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
          Save Up to 70% with Exclusive Coupon Codes
        </h2>
        <p className="text-lg text-gray-100 mb-6">
          Discover verified promo codes from top retailers updated daily
        </p>
        <Link href="/store">
          <div className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-full transition duration-300 transform hover:scale-105">
            Browse Coupons
          </div>
        </Link>
      </div>
    </div>
  );
}
