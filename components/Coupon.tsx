"use client";
import { useEffect, useState } from "react";
import { CouponProps } from "@/lib/types";
import Image from "next/image";
import { Copy, Star } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogFooter,
	AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";

const Coupon = ({
	code,
	description,
	expiryDate,
	updateDate,
	storeImage,
	couponTitle,
	featured,
	coupontype,
	couponurl,
	slug,
	id,
}: CouponProps) => {
	const buttonText =
		coupontype?.toLocaleLowerCase() === "coupon code"
			? "Show Code"
			: "Show Deal";
	const storeId = id?.split("-")[0];
	const [open, setOpen] = useState(false);
	const pathname = usePathname();

	// Check if current URL matches the expected pattern
	useEffect(() => {
		const currentPath = pathname;
		const expectedPath = `/store/${slug}/${storeId}`;

		if (currentPath === expectedPath) {
			setOpen(true);
		}
	}, [pathname, slug, storeId]);

	const handleShowUrl = () => {
		setTimeout(() => {
			if(couponurl){

				window.location.href = couponurl;
			}
		}, 1000);
	 }

	return (
		<>
			<div className="flex flex-col md:flex-row items-start justify-between bg-white p-4 md:p-6 mb-6 rounded-lg  transition-shadow duration-300 gap-4">
				<div className="flex flex-col md:flex-row items-center md:items-start gap-4 w-full md:w-3/4">
					{storeImage && (
						<div className="flex-shrink-0 w-[150px] h-[100px] relative">
							<Image
								src={storeImage}
								alt="Coupon Logo"
								width={150}
								height={100}
								className="object-contain"
							/>
						</div>
					)}
					<div className="text-center md:text-left w-full">
						<h4 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
							{couponTitle}
						</h4>
						{featured && (
							<div className="flex items-center gap-1 mb-2">
								<Star className="w-5 h-5 fill-red-600 text-red-600" />
								<h5 className="text-sm md:text-base font-semibold text-red-600">
									{featured}
								</h5>
							</div>
						)}
						{description && (
							<article
								className="prose prose-sm max-w-none mb-2 overflow-hidden text-gray-600 line-clamp-3 md:line-clamp-none"
								dangerouslySetInnerHTML={{ __html: description }}
							/>
						)}
						<p className="text-sm text-gray-500">Expires: {expiryDate}</p>
					</div>
				</div>
				<div className="flex flex-col items-center md:items-end mt-2 md:mt-0 w-full md:w-1/4 md:min-w-[150px]">
				<button onClick={handleShowUrl} className={`bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition duration-200 w-full md:w-auto font-medium ${buttonText === "Show Deal" ? "bg-black hover:bg-gray-800" : "bg-orange-500 hover:bg-orange-600"}`}>
					<Link
						href={`/store/${slug}/${storeId}`}
						target="_blank"
						rel="noopener noreferrer"
						className="mb-2">
						
						
					{buttonText}
					</Link>
					</button>
					<p className="text-sm text-gray-500 mt-2">Updated: {updateDate}</p>
				</div>
			</div>

			<AlertDialog open={open} onOpenChange={setOpen}>
				<AlertDialogContent className="max-w-md">
					<AlertDialogHeader>
						<AlertDialogTitle className="text-xl font-bold text-center mb-2">
							{couponTitle}
						</AlertDialogTitle>
						<div className="mt-2">
							<div className="bg-gray-50 p-4 rounded-lg mb-4">
								<div className="flex justify-between items-center mb-2">
									<span className="text-sm text-gray-500">Your Code:</span>
									<span className="text-sm text-gray-500">
										Expires: {expiryDate}
									</span>
								</div>
								<div className="relative">
									<div className="flex items-center justify-between bg-white border-2 border-dashed border-gray-300 rounded-md p-3">
										<code className="font-mono text-lg font-bold ">
											{code ? code : "No Coupon Needed"}
										</code>
										{code && (
											<Link href={couponurl} rel="noopener noreferrer">
												<Button
													onClick={() => {
														navigator.clipboard.writeText(code);
														// Redirect to coupon URL after copying
													}}
													className="  py-1 rounded-md text-sm ">
													<Copy className="w-4 h-4" />
												</Button>
											</Link>
										)}
									</div>
									<div className="flex flex-col bg-orange-400 hover:bg-orange-500 transition-all duration-300 p-1 rounded-full text-white uppercase items-center justify-between  mt-2">

										<Link href={couponurl} rel="noopener noreferrer">
										Go To {slug}
										</Link>
									</div>
								</div>
							</div>

							<div className="mt-4">
								<div className="text-md font-semibold mb-2">Description:</div>
								<div
									className="text-sm text-gray-700"
									dangerouslySetInnerHTML={{ __html: description }}
								/>
							</div>
						</div>
					</AlertDialogHeader>
					<AlertDialogFooter className="flex flex-col sm:flex-row gap-2 mt-4">
						<AlertDialogCancel className="sm:mt-0">Close</AlertDialogCancel>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
};

export default Coupon;
