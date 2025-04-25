import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { ALL_CATEGORIES_QUERY, ALL_COUPON_TYPES_QUERY, ALL_SEASONS_QUERY } from "@/sanity/lib/queries";
import { correctOne } from "@/lib/utils";

export default async function Footer() {
	const categories = await client.fetch(ALL_CATEGORIES_QUERY);
  const couponTypes = await client.fetch(ALL_COUPON_TYPES_QUERY)
  const season = await client.fetch(ALL_SEASONS_QUERY)

	return (
		<footer className="w-full border-t bg-background">
			<div className="container flex flex-col gap-8 px-4 py-12 md:px-6 lg:py-16">
				<div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
					<div className="space-y-4">
						<h3 className="text-lg font-semibold">Quick Links</h3>
						<ul className="space-y-2 text-sm text-muted-foreground">
							<li>
								<Link href="/home">Home</Link>
							</li>
							<li>
								<Link href="/store">Stores</Link>
							</li>
							{categories.slice(6, 10).map((category: any) => (
								<li key={category._id}>
									<Link href={`/category/${category.slug}`}>
										{correctOne(category.name)}
									</Link>
								</li>
							))}
						</ul>
					</div>
					<div className="space-y-4">
						<h3 className="text-lg font-semibold">Categories</h3>
						<ul className="space-y-2 text-sm text-muted-foreground">
							{categories.slice(0, 6).map((category: any) => (
								<li key={category._id}>
									<Link href={`/category/${category.slug}`}>
										{correctOne(category.name)}
									</Link>
								</li>
							))}
						</ul>
					</div>
					<div className="space-y-4">
						<h3 className="text-lg font-semibold">Coupons</h3>
						<ul className="space-y-2 text-sm text-muted-foreground">
            {couponTypes.map((coupontype:any) => (
								<li key={coupontype._id}>
								<Link href={`/coupon/${coupontype.slug}`}>
										{correctOne(coupontype.name)}
									</Link>
								</li>
							))}
						</ul>
					</div>
					<div className="space-y-4">
						<h3 className="text-lg font-semibold">Season</h3>
						<ul className="space-y-2 text-sm text-muted-foreground">
            {season.slice(0,4).map((season:any) => (
								<li key={season._id}>
							<Link href={`/season/${season.slug}`}>
										{correctOne(season.name)}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>

				

				<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
					<div className="space-y-2">
						<div className="flex items-center">
											<Link href="/" className="flex items-center gap-2.5 group">
												<div className="relative">
													<div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-200"></div>
													<div className="w-9 h-9 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center relative shadow-sm">
														<svg
															className="w-5 h-5 text-white transform group-hover:scale-110 transition-transform duration-200"
															fill="none"
															stroke="currentColor"
															viewBox="0 0 24 24"
															xmlns="http://www.w3.org/2000/svg">
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																strokeWidth={2}
																d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
															/>
														</svg>
													</div>
												</div>
												<div className="flex flex-col">
													<h1 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-500">
														Redeem<span>ly</span>Now
													</h1>
													<div className="flex items-center gap-1">
														<span className="h-0.5 w-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></span>
														<span className="text-[10px] text-gray-600 tracking-wider font-medium">
															SAVE MORE, SHOP SMARTER
														</span>
													</div>
												</div>
											</Link>
										</div>
						<p className="text-sm text-muted-foreground">
							© {new Date().getFullYear()} Reedemlynow. All rights reserved.
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
}
