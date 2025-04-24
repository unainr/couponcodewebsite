import SimpleBanner from "@/components/Banner";
import StoreFetch from "@/components/StoreFetch";
import { Metadata } from "next";

export default function Home() {
  return (
    <main >
      <SimpleBanner/>
      <StoreFetch/>
    </main>
  );
}

export const revalidate = 60;

export const metadata: Metadata = {
  title: "RedeemlynNow - Save Money with Exclusive Coupon Codes & Promo Deals",
  description: "Discover thousands of verified coupon codes, promo offers, and exclusive discount deals from your favorite retailers. RedeemlynNow helps you save money on every purchase with daily updated offers.",
  keywords: "coupon codes, promo codes, discount codes, online deals, save money, RedeemlynNow",
};