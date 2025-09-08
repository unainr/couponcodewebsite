import { NextRequest, NextResponse } from "next/server";
import { sanityOperations } from "@/lib/sanity-write";
import { client } from "@/sanity/lib/client";

// Get single coupon
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const query = `*[_type == "addCoupon" && _id == $id][0] {
      _id,
      coupontitle,
      description,
      couponurl,
      couponcode,
      "coupontype": {
        "_id": coupontype->_id,
        "name": coupontype->name
      },
      "store": {
        "_id": store->_id,
        "name": store->name
      },
      "seasonal": {
        "_id": seasonal->_id,
        "name": seasonal->name
      },
      "featured": {
        "_id": featured->_id,
        "name": featured->name
      },
      publishdate,
      expiredate,
      order
    }`;
    
    const coupon = await client.fetch(query, { id });
    
    if (!coupon) {
      return NextResponse.json(
        { error: "Coupon not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: coupon });
  } catch (error) {
    console.error("Error fetching coupon:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Update coupon
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const updates = await request.json();
    
    const result = await sanityOperations.update(id, updates);
    
    if (result.success) {
      return NextResponse.json({ success: true, data: result.data });
    } else {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error updating coupon:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Delete coupon
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const result = await sanityOperations.delete(id);
    
    if (result.success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error deleting coupon:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}