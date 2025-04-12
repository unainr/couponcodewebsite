import React from "react";
import Image from "next/image";
import Link from "next/link";
import Coupon from "./Coupon";
import { client } from "@/sanity/lib/client";
import { FETCH_STORE_BY_SLUG } from "@/sanity/lib/queries";
import { StoreCouponProps } from "@/lib/types";

import markdownit from "markdown-it";
import CallToAction from "./CallToAction";

export default async function SideCoupon({ slug }: { slug: string }) {
	const storeData = await client.fetch<StoreCouponProps>(FETCH_STORE_BY_SLUG, {
		slug,
	});
	const md = markdownit();
	// const parseMetaDescription = md.render(storeData?.metadescription || '');
	const parseDescription = md.render(storeData?.description || "");
	const paraseCouponDescription = md.render(
		storeData?.coupons[0]?.description || ""
	);
	// Filter active and expired coupons
	const activeCoupons =
		storeData?.coupons?.filter(
			(coupon) =>
				coupon.expiredate != coupon.publishdate &&
				new Date(coupon.expiredate) > new Date()
		) || [];

	const expiredCoupons =
		storeData?.coupons?.filter(
			(coupon) =>
				coupon.expiredate === coupon.publishdate ||
				new Date(coupon.expiredate) < new Date()
		) || [];

	return (
		<div className="min-h-screen py-12 md:py-20 bg-gradient-to-b from-gray-50 to-gray-100">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="flex flex-col lg:flex-row gap-8">
					{/* Sidebar */}
					<div className="w-full lg:w-1/4 order-2 lg:order-1">
						<div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 mb-6">
							<div className="flex flex-col items-center mb-4">
								<div className="relative w-full h-40 mb-4">
									{storeData?.images && storeData.images.length > 0 ? (
										<Image
											src={storeData.images[0]}
											alt={`${storeData.name} Logo`}
											fill
											className="object-contain"
										/>
									) : (
										<div className="w-full h-full flex items-center justify-center bg-gray-100">
											<span className="text-gray-400">No image</span>
										</div>
									)}
								</div>
								<h2 className="text-2xl font-bold mt-2 text-gray-800">
									{storeData?.name}
								</h2>
							</div>
							{parseDescription && (
								<article
									dangerouslySetInnerHTML={{ __html: parseDescription }}
								/>
							)}

							{storeData?.affiliate && (
								<Link
									href={storeData.affiliate}
									passHref
									rel="noopener noreferrer">
									<div className="block w-full bg-orange-500 my-5 text-white text-center py-3 rounded-full hover:bg-orange-600 transition duration-200 font-medium">
										Go To Store
									</div>
								</Link>
							)}
						</div>

						<div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
							<h3 className="text-xl font-bold mb-4 text-gray-800">
								Similar Stores
							</h3>
							<ul className="space-y-3">
								{/* Similar stores would be fetched and mapped here */}
								<li className="text-gray-700 hover:text-orange-500 cursor-pointer transition duration-200 flex items-center">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-4 w-4 mr-2 text-orange-400"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M9 5l7 7-7 7"
										/>
									</svg>
									Similar Store Example
								</li>
							</ul>
						</div>
					</div>

					{/* Main Content */}
					<div className="w-full lg:w-3/4 order-1 lg:order-2">
						<h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-gray-800">
							{storeData?.name} Coupons & Promo Codes
						</h1>

						{/* Active Coupons */}
						<div className="mb-8">
							{activeCoupons.length > 0 ? (
								activeCoupons.map((coupon) => (
									<Coupon
										key={coupon._id}
										slug={slug}
										id={coupon._id}
										code={coupon.couponcode}
										couponTitle={coupon.coupontitle}
										description={paraseCouponDescription}
										coupontype={coupon.coupontype}
										couponurl={coupon.couponurl}
										featured={coupon.featured}
										expiryDate={new Date(
											coupon.expiredate
										).toLocaleDateString()}
										storeImage={storeData?.images?.[0]}
										updateDate={new Date(
											coupon.publishdate
										).toLocaleDateString()}
									/>
								))
							) : (
								<div className="bg-white p-4 rounded-lg shadow-md text-center py-8">
									<p className="text-gray-500">
										No active coupons at the moment.
									</p>
									<p className="text-gray-500 mt-2">
										Check back later for new deals!
									</p>
								</div>
							)}
						</div>

						{/* Subscription Form */}
						<div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 rounded-lg shadow-md">
							<div className="flex flex-col md:flex-row justify-between items-center">
								<div className="mb-6 md:mb-0">
									<h3 className="text-xl text-white font-semibold">
										Get latest <span className="italic">{storeData?.name}</span>{" "}
										Coupon &
									</h3>
									<p className="text-gray-300">
										deals alert.{" "}
										<span className="text-sm underline cursor-pointer hover:text-white transition duration-200">
											Privacy Policy
										</span>
									</p>
								</div>
								<CallToAction/>
							</div>
						</div>

						{/* Expired Coupons Section */}
						<div className="mt-12">
							<h2 className="text-2xl sm:text-3xl font-bold my-6 text-gray-800 flex items-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-8 w-8 mr-2 text-gray-400"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
								Expired {storeData?.name} Coupons
							</h2>

							{expiredCoupons.length > 0 ? (
								<div className="opacity-60 pointer-events-none">
									{expiredCoupons.map((coupon) => (
										<Coupon
											key={coupon._id}
											code={coupon.couponcode}
											couponTitle={coupon.coupontitle}
											description={paraseCouponDescription}
											featured={coupon.featured}
											coupontype={coupon.coupontype}
											couponurl={coupon.couponurl}
											expiryDate={new Date(
												coupon.expiredate
											).toLocaleDateString()}
											storeImage={storeData?.images?.[0]}
											updateDate={new Date(
												coupon.publishdate
											).toLocaleDateString()}
											isExpired={true}
										/>
									))}
								</div>
							) : (
								<div className="bg-white p-4 rounded-lg shadow-md text-center py-8">
									<p className="text-gray-500">
										No expired coupons at the moment.
									</p>
									<p className="text-gray-500 mt-2">
										Check back later for more deals!
									</p>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export const revalidate = 60;
