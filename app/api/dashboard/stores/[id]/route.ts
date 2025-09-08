import { NextRequest, NextResponse } from "next/server";
import { sanityOperations } from "@/lib/sanity-write";
import { client } from "@/sanity/lib/client";

// Get single store
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const query = `*[_type == "storeAdd" && _id == $id][0] {
      _id,
      name,
      description,
      homeurl,
      affiliate,
      metatitle,
      metadescription,
      metakeywords,
      slug,
      "category": {
        "_id": category->_id,
        "name": category->name
      },
      "country": {
        "_id": country->_id,
        "name": country->name
      },
      "images": images[]{
        "asset": {
          "_id": asset->_id,
          "url": asset->url
        }
      }
    }`;
    
    const store = await client.fetch(query, { id });
    
    if (!store) {
      return NextResponse.json(
        { error: "Store not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: store });
  } catch (error) {
    console.error("Error fetching store:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Update store
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
    console.error("Error updating store:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Delete store
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // First, delete all coupons associated with this store
    const couponsQuery = `*[_type == "addCoupon" && references($storeId)]._id`;
    const couponIds = await client.fetch(couponsQuery, { storeId: id });
    
    // Delete all associated coupons
    if (couponIds.length > 0) {
      const deletePromises = couponIds.map((couponId: string) => 
        sanityOperations.delete(couponId)
      );
      await Promise.all(deletePromises);
    }
    
    // Then delete the store
    const result = await sanityOperations.delete(id);
    
    if (result.success) {
      return NextResponse.json({ 
        success: true, 
        message: `Store and ${couponIds.length} associated coupons deleted successfully` 
      });
    } else {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error deleting store:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}