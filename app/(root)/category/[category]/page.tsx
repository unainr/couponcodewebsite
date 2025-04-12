import React from "react";
import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Store } from "lucide-react";
import { ALL_CATEGORIES_QUERY, STORES_BY_CATEGORY_NAME_QUERY } from "@/sanity/lib/queries";

async function getCategoryData(urlCategoryName: string) {

  // Get all categories
  const allCategories = await client.fetch(ALL_CATEGORIES_QUERY);
  
  // Find the category whose URL-friendly name matches the parameter
  const matchedCategory = allCategories.find((cat: any) => 
    (cat.slug) === urlCategoryName
  );

  if (!matchedCategory) {
    return null;
  }
  // Use the actual category name for further queries
  const actualCategoryName = matchedCategory.name;
//   // Fetch coupons for this category
//   const coupons = await client.fetch(COUPONS_BY_CATEGORY_NAME_QUERY, { 
//     category: actualCategoryName 
//   });
  
  // Fetch stores for this category
  const stores = await client.fetch(STORES_BY_CATEGORY_NAME_QUERY, {
    category: actualCategoryName
  });
  
  return {  stores, category: matchedCategory };
}

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const { category } = await params;
  
  const data = await getCategoryData(category);
  
  // If category doesn't exist, show 404
  if (!data) {
    return notFound();
  }
  
  const { stores } = data;
  
  return (
    <div className="container mx-auto py-10">
      
      {/* Stores Section */}
      {stores && stores.length > 0 ? (
        <section className="mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 my-20">
            {stores.map((store: any) => (
              <Link href={`/store/${store.slug}`} key={store._id}>
                <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
                  <div className="relative h-40 bg-gray-100">
                    {store.imageUrl ? (
                      <Image
                        src={store.imageUrl}
                        alt={store.name}
                        fill
                        className="object-contain p-4"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <Store className="h-16 w-16 text-gray-300" />
                      </div>
                    )}
                  </div>
                  <div className="p-4 flex-grow">
                    <h3 className="font-semibold text-lg mb-2">{store.name}</h3>
                    <div className="text-sm text-gray-600 line-clamp-2">
                      {store.description?.substring(0, 100)}...
                    </div>
                  </div>
                  <div className="p-4 pt-0">
                    <Button variant="outline" className="w-full">
                      View Store
                    </Button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ):(
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-4xl font-bold mb-4">No Stores Found</h1>
          <p className="text-gray-600 mb-8">
            Sorry, we couldn't find any stores for this category.
          </p>
          <Link href="/" className="text-blue-500 hover:underline">
            Go back to the homepage
          </Link>
        </div>
      )}
    </div>
  );
}

