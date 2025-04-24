import React from 'react';
import StoreFetch from '@/components/StoreFetch';
import { Metadata } from 'next';



const Store = () => {
  return (
    <div className="container mx-auto px-4 py-20 max-w-7xl bg-gray-50 ">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">All Stores</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Browse our collection of partner stores and find exclusive coupon codes and deals to save on your next purchase.
        </p>
      </div>
      
      <div className="  p-6">
        <StoreFetch />
      </div>
    </div>
  );
}

export default Store;
export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Browse All Stores | RedeemlynNow Exclusive Coupon Codes & Deals',
  description: 'Discover thousands of partner stores with exclusive coupon codes, promo offers, and discount deals. Save money on your online shopping with verified and daily updated promotions from RedeemlynNow.',
};
