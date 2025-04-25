import React from "react";
import { client } from "@/sanity/lib/client";
import { SEARCH_QUERY } from "@/sanity/lib/queries";
import Coupon from "@/components/Coupon";
import SearchForm from "@/components/SearchForm";
import Link from "next/link";
import markdownit from "markdown-it";
import { Metadata } from "next";

// Generate dynamic metadata based on search query
export async function generateMetadata({
	searchParams,
}: SearchPageProps): Promise<Metadata> {
	const searchTerm = (await searchParams).q || "";

	if (!searchTerm) {
		return {
			title: "Search for Coupon Codes & Deals | RedeemlyNow",
			description:
				"Search for the best coupon codes, promo offers, and discount deals from thousands of stores. Find savings for your favorite brands at RedeemlyNow.",
		};
	}

	return {
		title: `Search Results for ${searchTerm} | RedeemlyNow Coupon Codes & Deals`,
		description: `Find the best coupon codes and deals matching "${searchTerm}". Discover verified promo offers and discounts for your search at RedeemlyNow.`,
		robots: {
			index: false, // Don't index search results pages
			follow: true,
		},
	};
}

interface SearchPageProps {
	searchParams: Promise<{ q?: string }>;
}

interface Store {
	_id: string;
	name: string;
	description: string;
	homeurl: string;
	imageUrl?: string;
	categoryName?: string;
	countryName?: string;
	slug?: string;
}

interface CouponItem {
	code: any;
	_id: string;
	coupontitle?: string;
	description?: string;
	couponcode?: string;
	coupontype?: string;
	publishdate: string;
	expiredate: string;
	featured?: string;
	storeImage?: string;
	storeSlug: string;
	storeName?: string;
	couponurl?: string;
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
	const searchTerm = (await searchParams).q || "";
	const md = markdownit();

	// If no search term, show empty state
	if (!searchTerm) {
		return (
			<div className="container mx-auto px-4 py-8">
				<h1 className="text-3xl font-bold mb-6">Search</h1>
				<SearchForm initialQuery="" className="mb-6 max-w-xl mx-auto" />
				<div className="text-center py-6 bg-white rounded-lg shadow-sm p-6 max-w-2xl mx-auto mt-8">
					<div className="mb-4">
						<svg
							className="w-16 h-16 mx-auto text-gray-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
						</svg>
					</div>
					<h2 className="text-xl font-semibold mb-2">Ready to find deals?</h2>
					<p className="text-gray-600">
						Enter a search term above to discover coupons and stores.
					</p>
				</div>
			</div>
		);
	}

	try {
		// Add wildcards for partial matching
		const formattedSearchTerm = `*${searchTerm}*`;

		// Fetch search results
		const { coupons = [], stores = [] } = await client.fetch(SEARCH_QUERY, {
			searchTerm: formattedSearchTerm,
		});
		const formatDate = (dateString: string) => {
			if (!dateString) return "N/A";
			try {
				const date = new Date(dateString);
				return date.toLocaleDateString("en-US", {
					month: "short",
					day: "2-digit",
					year: "numeric",
				});
			} catch (error) {
				return "Invalid date";
			}
		};

		const totalResults = coupons.length + stores.length;

		return (
			<div className="container mx-auto px-4 py-8">
				<h1 className="text-3xl font-bold mb-2">Search Results</h1>
				<SearchForm initialQuery={searchTerm} className="mb-6 max-w-xl" />
				<p className="text-gray-600 mb-6">
					Found {totalResults} results for "
					<span className="font-medium">{searchTerm}</span>"
				</p>

				{totalResults === 0 ? (
					<div className="bg-white rounded-lg shadow-sm p-8 text-center max-w-2xl mx-auto">
						<div className="mb-4">
							<svg
								className="w-16 h-16 mx-auto text-gray-400"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
							</svg>
						</div>
						<h2 className="text-xl font-semibold mb-2">No results found</h2>
						<p className="text-gray-600 mb-4">
							We couldn't find any matches for "{searchTerm}"
						</p>
						<p className="text-gray-500 text-sm">
							Try using different keywords or check for typos
						</p>
					</div>
				) : (
					<>
						{/* Stores Section */}
						{stores.length > 0 && (
							<div className="mb-10">
								<h2 className="text-2xl font-semibold mb-4 flex items-center">
									<svg
										className="w-5 h-5 mr-2 text-gray-600"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
									</svg>
									Stores{" "}
									<span className="text-gray-500 font-normal ml-2">
										({stores.length})
									</span>
								</h2>
								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
									{stores.map((store: Store) => (
										<Link
											href={`/store/${store.slug || ""}`}
											key={store._id}
											className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
											<div className="h-40 bg-gray-100 flex items-center justify-center overflow-hidden">
												{store.imageUrl ? (
													<img
														src={store.imageUrl}
														alt={store.name}
														className="w-full h-full object-contain p-4"
													/>
												) : (
													<div className="text-gray-300 text-5xl font-light">
														{store.name.charAt(0).toUpperCase()}
													</div>
												)}
											</div>
											<div className="p-4">
												<h3 className="font-semibold text-lg mb-1">
													{store.name}
												</h3>
												{store.categoryName && (
													<span className="inline-block bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full mb-2">
														{store.categoryName}
													</span>
												)}
												<p className="text-gray-600 text-sm line-clamp-2">
													{store.description}
												</p>
											</div>
										</Link>
									))}
								</div>
							</div>
						)}

						{/* Coupons Section */}
						{coupons.length > 0 && (
							<div>
								<h2 className="text-2xl font-semibold mb-4 flex items-center">
									<svg
										className="w-5 h-5 mr-2 text-gray-600"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
									</svg>
									Coupons{" "}
									<span className="text-gray-500 font-normal ml-2">
										({coupons.length})
									</span>
								</h2>
								<div className="space-y-4">
									{coupons.map((coupon: any) => (
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
									))}
								</div>
							</div>
						)}
					</>
				)}
			</div>
		);
	} catch (error) {
		return (
			<div className="container mx-auto px-4 py-8">
				<h1 className="text-3xl font-bold mb-2">Search Results</h1>
				<SearchForm initialQuery={searchTerm} className="mb-6 max-w-xl" />
				<div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-2xl mx-auto">
					<div className="flex items-center mb-3">
						<svg
							className="w-6 h-6 text-red-500 mr-2"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
						</svg>
						<h2 className="text-lg font-medium text-red-800">Search Error</h2>
					</div>
					<p className="text-red-600">
						An error occurred while fetching search results. Please try again
						later.
					</p>
					<button
						onClick={() => window.location.reload()}
						className="mt-4 bg-red-100 hover:bg-red-200 text-red-800 font-medium py-2 px-4 rounded transition-colors duration-200">
						Try Again
					</button>
				</div>
			</div>
		);
	}
};

export default SearchPage;
