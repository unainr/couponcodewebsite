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
  title: "RedeemlynNow - Save Money with the Best Coupon Codes & Deals",
  description: "Find and redeem the latest coupon codes, promo offers, and deals from thousands of top retailers. Save money on your online shopping with RedeemlynNow.",
  keywords: "coupon codes, promo codes, discount codes, deals, online shopping, save money, RedeemlynNow",
};