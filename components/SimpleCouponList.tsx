import React from "react";
import Coupon from "./Coupon";
import { CouponProps } from "@/lib/types";

interface SimpleCouponListProps {
  initialCoupons: (CouponProps & { _id: string; order: number })[];
  storeSlug: string;
}

const SimpleCouponList = ({ initialCoupons, storeSlug }: SimpleCouponListProps) => {
  // Sort coupons by order (managed from dashboard)
  const sortedCoupons = [...initialCoupons].sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <div className="space-y-4">
      {sortedCoupons.map((coupon) => (
        <Coupon
          key={coupon._id}
          code={coupon.code}
          couponTitle={coupon.couponTitle}
          description={coupon.description}
          featured={coupon.featured}
          coupontype={coupon.coupontype}
          couponurl={coupon.couponurl}
          expiryDate={coupon.expiryDate}
          storeImage={coupon.storeImage}
          updateDate={coupon.updateDate}
          slug={coupon.slug}
          id={coupon.id}
        />
      ))}
    </div>
  );
};

export default SimpleCouponList;