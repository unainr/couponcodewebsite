import React from "react";
import StoreFetch from "@/components/StoreFetch";
import { Metadata } from "next";

const Store = () => {
	return (
		<div className="container mx-auto px-4 py-20 max-w-7xl bg-gray-50 ">
			<div className="mb-8 text-center">
				<h1 className="text-3xl md:text-4xl font-bold mb-4">All Stores</h1>
				<p className="text-gray-600 max-w-2xl mx-auto">
					Browse our collection of partner stores and find exclusive coupon
					codes and deals to save on your next purchase.
				</p>
			</div>

			<div className="  p-6">
				<StoreFetch />
			</div>
		</div>
	);
};

export default Store;
export const revalidate = 60;


export const metadata: Metadata = {
    title: "RedeemlyNow: Ultimate Coupon Codes & Discount Deals | Save Big Online",
    description: "Find top verified coupon codes and exclusive deals from 1000+ partner stores. Maximize your savings with real-time, daily updated promo offers across multiple shopping categories.",
    keywords: "coupon codes, discount deals, online shopping, promo offers, savings",
    openGraph: {
        title: "RedeemlyNow: Exclusive Coupon Codes & Deals",
        description: "Discover massive savings with verified promo codes from top online stores",
        type: "website",
        url: "https://www.redeemly.com/store"
    },
    twitter: {
        card: "summary_large_image",
        title: "RedeemlyNow: Save Big with Verified Coupon Codes",
        description: "Unlock exclusive discounts and promo offers from 1000+ stores"
    }
};
