"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { NavBarClientProps } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { correctOne } from "@/lib/utils";
import SearchForm from "../SearchForm";
const NavBar = ({ categories, couponTypes, season }: NavBarClientProps) => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<nav className="fixed w-full z-30 bg-white border-b border-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					{/* Logo */}
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

					{/* Desktop Navigation */}
					<div className="hidden md:flex items-center space-x-4">
						<Link
							href="/"
							className="text-gray-600 font-medium hover:text-orange-600 transition-colors ">
							Home
						</Link>

						<Link
							href="/store"
							className="text-gray-600 font-medium hover:text-orange-600 transition-colors ">
							Stores
						</Link>
						{/* Categories Dropdown */}
						<div className="flex items-center justify-center  ">
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										size="icon"
										variant="ghost"
										className=" text-gray-600 hover:text-orange-500 hover:bg-white w-full transition-colors focus:outline-none focus:ring-0">
										Categories <ChevronDown className=" h-3 w-3" />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent className="w-56 ">
									{categories.slice(0, 13).map((category) => (
										<DropdownMenuItem key={category._id} asChild>
											<Link href={`/category/${category.slug}`}>
												{correctOne(category.name)}
											</Link>
										</DropdownMenuItem>
									))}
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
						{/* categories end Dropdown  */}
						{/* {coupon types dropdown} */}
						<div className="flex items-center justify-center gap-2">
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										size={"icon"}
										variant="ghost"
										className="text-gray-600 hover:text-orange-500 hover:bg-white w-full transition-colors focus:outline-none focus:ring-0">
										Coupons <ChevronDown className=" h-3 w-3" />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent className="w-56 ">
									{couponTypes.slice(0, 13).map((coupontype) => (
										<DropdownMenuItem key={coupontype._id} asChild>
											<Link href={`/coupon/${coupontype.slug}`}>
												{correctOne(coupontype.name)}
											</Link>
										</DropdownMenuItem>
									))}
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
						{/* {coupon types end dropdown} */}

						{/* {seasonal dropdown} */}
						<div className="flex items-center justify-center gap-2">
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										size={"icon"}
										variant="ghost"
										className="text-gray-600 hover:text-orange-500 hover:bg-white w-full transition-colors focus:outline-none focus:ring-0">
										Season <ChevronDown className=" h-3 w-3" />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent className="w-56 ">
									{season.slice(0, 15).map((season) => (
										<DropdownMenuItem key={season._id} asChild>
											<Link href={`/season/${season.slug}`}>
												{correctOne(season.name)}
											</Link>
										</DropdownMenuItem>
									))}
								</DropdownMenuContent>
							</DropdownMenu>
						</div>

						<SearchForm />
						
						
					</div>

					{/* Mobile Menu Button */}
					<div className="md:hidden">
						<button
							onClick={() => setIsOpen(!isOpen)}
							className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-orange-600 focus:outline-none">
							{isOpen ? (
								<X className="h-6 w-6" />
							) : (
								<Menu className="h-6 w-6" />
							)}
						</button>
					</div>
				</div>
			</div>

			{/* Mobile Menu */}
			<div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
				<div className="px-2 pt-2 pb-3 space-y-1 bg-white">
					<Link
						href="/"
						className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50"
						onClick={() => setIsOpen(false)}>
						Home
					</Link>
					<Link
						href="/store"
						className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50"
						onClick={() => setIsOpen(false)}>
						Stores
					</Link>
					{/* Categories Section in Mobile Menu */}
					<div className=" py-2">
						<div className=" space-y-1 flex flex-col items-start justify-start">
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										variant="ghost"
										className="hover:text-orange-500 hover:bg-white transition-all duration-300">
										Categories <ChevronDown className="ml-1 h-4 w-4" />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent className="w-56 ">
									{categories.map((category) => (
										<DropdownMenuItem key={category._id} asChild>
											<Link href={`/category/${category.slug}`}>
												{category.slug}
											</Link>
										</DropdownMenuItem>
									))}
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
