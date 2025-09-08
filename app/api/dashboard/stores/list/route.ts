import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

const STORES_LIST_QUERY = `
*[_type == "storeAdd"] | order(name asc) {
  _id,
  name,
  description,
  homeurl,
  affiliate,
  "slug": slug.current,
  "categoryName": category->name,
  "countryName": country->name,
  "imageUrl": images[0].asset->url,
  "couponCount": count(*[_type == "addCoupon" && references(^._id)])
}
`;

export async function GET() {
  try {
    const stores = await client.fetch(STORES_LIST_QUERY);
    
    return NextResponse.json({ 
      success: true, 
      data: stores || [] 
    });
  } catch (error) {
    console.error("Error fetching stores list:", error);
    return NextResponse.json(
      { error: "Failed to fetch stores" },
      { status: 500 }
    );
  }
}