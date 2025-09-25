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
	title: "RedeemlyNow | Best Coupon Codes & Verified Discount Deals 2025",
	description:
    "Save up to 70% with RedeemlyNow's hand-verified coupon codes, exclusive promo offers & daily updated discount deals for 1000+ popular retailers. Never pay full price again!",
  keywords:
    "coupon codes 2025, active promo codes, verified discount deals, RedeemlyNow, online shopping savings, exclusive promotional offers",
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "https://redeemlynow.com",
		siteName: "RedeemlyNow",
		title: "RedeemlyNow | Best Coupon Codes & Verified Discount Deals 2025",
		description:
		"Discover today's best hand-verified coupon codes & exclusive discount deals. RedeemlyNow helps shoppers save up to 70% at 1000+ popular stores.",
	},
	twitter: {
		card: "summary_large_image",
		title: "RedeemlyNow | Save Up To 70% With Today's Verified Coupons",
		description: "Instant savings with verified coupon codes for your favorite brands. Updated hourly with success rates!",
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
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-17599984199"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'AW-17599984199');
</script>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				{children}
			</body>
		</html>
	);
}
