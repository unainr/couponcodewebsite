import React from 'react';  
import { client } from '@/sanity/lib/client';
import { COUPON_TYPE_QUERY, COUPONS_BY_TYPE_QUERY } from '@/sanity/lib/queries';
import Coupon from '@/components/Coupon';
import markdownit from "markdown-it";
import { Metadata } from 'next';


// Generate dynamic metadata based on the coupon type data
export async function generateMetadata({ params }: { params:  Promise<{ coupontype: string }> }): Promise<Metadata> {
  const { coupontype } = await params;

  // Fetch the coupon type details for metadata
  const couponType = await client.fetch(COUPON_TYPE_QUERY, { coupontype });
  
  if (!couponType) {
    return {
      title: 'Coupon Type Not Found | RedeemlynNow',
      description: 'The requested coupon type could not be found. Browse our other coupon categories for deals and discounts.',
    };
  }
  
  return {
    title: `${couponType.name} Coupons & Promo Codes - Exclusive Offers | RedeemlynNow`,
    description: `Find the best ${couponType.name} coupons, promo codes, and exclusive offers. Save money with verified ${couponType.name.toLowerCase()} from top brands at RedeemlynNow.`,
    keywords: `${couponType.name} coupons, ${couponType.name} promo codes, ${couponType.name} offers, ${couponType.name} deals, RedeemlynNow`,
  };
}






const CouponType = async ({ params }: { params: Promise<{ coupontype: string }> }) => {
  const md = markdownit();
  const { coupontype } = await params;
  
  // Fetch the coupon type details
  const couponType = await client.fetch(COUPON_TYPE_QUERY, {
    coupontype: coupontype
  });
  
  if (!couponType) {
    return <div className="container mx-auto px-4 py-8 flex flex-col min-h-screen items-center justify-center">Coupon type not found</div>;
  }

  // Fetch all coupons related to this coupon type
  const coupons = await client.fetch(COUPONS_BY_TYPE_QUERY, {
    coupontypeId: couponType._id

  }); 

	
 const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
  };

  return (
    <div className="container mx-auto px-4 py-20">
      {coupons.length === 0 ? (
        <p className="text-center py-4  rounded-lg shadow-sm p-6">
          No coupons available for this category.
        </p>
      ) : (
        <div className="space-y-2">
          {coupons.map((coupon:any) => {
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
                couponurl={coupon.couponurl || ""}
                slug={coupon.storeSlug || ""}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CouponType;

export const revalidate = 60;
