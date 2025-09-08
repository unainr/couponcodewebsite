import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

const COUPONS_LIST_QUERY = `
*[_type == "addCoupon"] | order(order asc) {
  _id,
  coupontitle,
  description,
  couponurl,
  couponcode,
  "coupontype": coupontype->name,
  publishdate,
  expiredate,
  "featured": featured->name,
  order,
  "storeName": store->name,
  "storeSlug": store->slug.current
}
`;

export async function GET() {
  try {
    const coupons = await client.fetch(COUPONS_LIST_QUERY);
    
    return NextResponse.json({ 
      success: true, 
      data: coupons || [] 
    });
  } catch (error) {
    console.error("Error fetching coupons list:", error);
    return NextResponse.json(
      { error: "Failed to fetch coupons" },
      { status: 500 }
    );
  }
}