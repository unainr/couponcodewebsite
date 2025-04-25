import React from "react";
import SideCoupon from "@/components/SideCoupon";
import { Metadata } from "next";

const StorePage = async ({ params }: { params: Promise<{ slug: string }> }) => {
	const { slug } = await params;

	// Fetch store data
	// const storeData = await client.fetch(FETCH_STORE_BY_SLUG, { slug })

	// // If store doesn't exist, show 404
	// if (!storeData) {
	//   notFound()
	// }

	return (
		<div className="min-h-screen">
			<SideCoupon slug={slug} />
		</div>
	);
};

export default StorePage;

export const revalidate = 60;

export const metadata: Metadata = {
	title: "Coupon Codes & Promo Offers - Exclusive Deals | RedeemlyNow",
	description:
		"Save money with verified [Store Name] coupon codes, promo offers, and exclusive discount deals. Get the latest [Store Name] promotions and sales updated daily at RedeemlyNow.",
};
