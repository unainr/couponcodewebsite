import React from 'react';
import { client } from '@/sanity/lib/client';
import {  COUPONS_BY_SEASON_QUERY, SEASON_TYPE_QUERY } from '@/sanity/lib/queries';
import Coupon from '@/components/Coupon';
import markdownit from "markdown-it";
import { Metadata } from 'next';


export async function generateMetadata({ params }: { params: Promise<{ season: string }> }): Promise<Metadata> {
  const { season } = await params;

  // Fetch the season details for metadata
  const seasonData = await client.fetch(SEASON_TYPE_QUERY, { season });
  
  if (!seasonData) {
    return {
      title: 'Season Not Found | RedeemlynNow',
      description: 'The requested seasonal deals could not be found. Browse our other seasonal offers for coupon codes and deals.',
    };
  }
  
  return {
    title: `${seasonData.name} Coupon Codes & Deals - Limited Time Offers | RedeemlynNow`,
    description: `Save big with exclusive ${seasonData.name} coupon codes, promo offers, and limited-time deals. Find the best ${seasonData.name} discounts from top brands at RedeemlynNow.`,
    keywords: `${seasonData.name} coupons, ${seasonData.name} deals, ${seasonData.name} offers, seasonal discounts, holiday deals, RedeemlynNow`,
  };
}

// Meta data for the page

const SeasonPage = async ({ params }: { params: Promise<{ season: string }> }) => {
  const { season } = await params;
  const md = markdownit();
  
  // Fetch the season details
  const seasonData = await client.fetch(SEASON_TYPE_QUERY, {
    season
  });
  
  if (!seasonData) {
    return <div className="container mx-auto px-4 py-8 flex flex-col min-h-screen items-center justify-center">Season not found</div>;
  }
  
  // Fetch all coupons related to this season
  const coupons = await client.fetch(COUPONS_BY_SEASON_QUERY, {
    seasonId: seasonData._id
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
  };

  return (
    <div className="container mx-auto px-4 py-20">

      {coupons.length === 0 ? (
        <p className="text-center py-4 bg-white rounded-lg shadow-sm p-6">
          No coupons available for this season.
        </p>
      ) : (
        <div className="space-y-2">
          {coupons.map((coupon: any) => {
            // Ensure we have valid data for the slug
            if (!coupon.storeSlug) {
              console.warn(`Missing store slug for coupon: ${coupon._id}`);
            }
            
            return (
              <Coupon
                key={coupon._id}
                id={coupon._id}
                code={coupon.couponcode || ""}
                description={md.render(coupon.description) || ""}
                expiryDate={formatDate(coupon.expiredate)}
                updateDate={formatDate(coupon.publishdate)}
                storeImage={coupon.storeImage || ""}
                couponTitle={coupon.coupontitle || ""}
                featured={coupon.featured || ""}
                coupontype={coupon.coupontype || ""}
                couponurl={coupon.couponurl || "#"}
                slug={coupon.storeSlug || ""}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SeasonPage;
export const revalidate = 60;
