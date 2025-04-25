import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "easymde/dist/easymde.min.css";
const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "RedeemlyNow | Exclusive Coupon Codes, Promo Offers & Discount Deals",
	description:
		"Save money on every purchase with RedeemlyNow's verified coupon codes, promo offers & exclusive discount deals. Updated daily with seasonal promotions for all your favorite online retailers.",
	keywords:
		"coupon codes, promo codes, discount deals, RedeemlyNow, online shopping, save money, promotional offers, verified coupons, shopping deals",
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "https://redeemlynow.com",
		siteName: "RedeemlyNow",
		title: "RedeemlyNow | Exclusive Coupon Codes & Discount Deals",
		description:
			"Find the best coupon codes, promo offers & discount deals for your favorite online stores. Save money with RedeemlyNow's verified deals updated daily.",
	},
	twitter: {
		card: "summary_large_image",
		title: "RedeemlyNow | Exclusive Coupon Codes & Discount Deals",
		description:
			"Find the best coupon codes, promo offers & discount deals for your favorite online stores. Save money with RedeemlyNow's verified deals.",
	},
	alternates: {
		canonical: "https://redeemlynow.com",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				{children}
			</body>
		</html>
	);
}
