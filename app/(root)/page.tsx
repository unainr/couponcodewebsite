import { HeroCarouselMain } from "@/components/home/hero-carousel";
import StoreFetch from "@/components/StoreFetch";
import FeaturesSection from "@/components/home/FeaturesSection";
import HowItWorks from "@/components/home/HowItWorks";
import StatsSection from "@/components/home/StatsSection";
import CTASection from "@/components/home/CTASection";
import PopularCouponsWrapper from "@/components/PopularCouponsWrapper";

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <HeroCarouselMain/>
      
      {/* Popular Stores Section */}
      <StoreFetch/>
      
      {/* Popular Coupons Section */}
      <PopularCouponsWrapper/>
      
      {/* Features Section */}
      <FeaturesSection/>
      
      {/* How It Works Section */}
      <HowItWorks/>
      
      {/* Stats Section */}
      <StatsSection/>
      
      {/* Call to Action Section */}
      <CTASection/>
    </main>
  );
}

export const revalidate = 30; // Revalidate every 30 seconds to show latest coupons
