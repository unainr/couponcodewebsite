import { NextRequest, NextResponse } from "next/server";
import { sanityOperations } from "@/lib/sanity-write";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ type: string }> }
) {
  try {
    const { type } = await params;
    
    // Validate the type parameter
    const allowedTypes = [
      "storeAdd",
      "coupontype", 
      "seasonal",
      "featured",
      "category",
      "country"
    ];
    
    if (!allowedTypes.includes(type)) {
      return NextResponse.json(
        { error: "Invalid reference type" },
        { status: 400 }
      );
    }

    const result = await sanityOperations.fetchReferenceOptions(type);
    
    if (result.success) {
      return NextResponse.json({ success: true, data: result.data });
    } else {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error(`Error in GET /api/dashboard/references/${params}:`, error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}