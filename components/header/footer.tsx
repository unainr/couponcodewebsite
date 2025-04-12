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
						<Link
							href="/"
							className="bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-2xl font-bold text-transparent">
							CouponSite
						</Link>
						<p className="text-sm text-muted-foreground">
							© {new Date().getFullYear()} CouponSite. All rights reserved.
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
}
