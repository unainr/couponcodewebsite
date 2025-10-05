"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export function HeroCarouselMain() {
	const plugin = React.useRef(
		Autoplay({ delay: 2000, stopOnInteraction: true })
	);

	const slides = [
		{
			image: "/images/hero1.jpg",
			// title: "Plan Your Dream Journey with Wayferen",
			// description:
			// 	"Let AI craft a personalized travel itinerary just for you — from flights to hidden gems.",
		},
		{
			image: "/images/m.jpg",
			// title: "Smart Trips, Zero Stress",
			// description:
			// 	"Discover destinations, manage budgets, and build perfect plans — all in one place.",
		},
	];

	return (
		<Carousel
			plugins={[plugin.current]}
			className="w-full"
			onMouseEnter={plugin.current.stop}
			onMouseLeave={plugin.current.reset}>
			<CarouselContent>
				{slides.map((slide, index) => (
					<CarouselItem key={index}>
						<div className="relative w-full h-[400px] sm:h-[600px] lg:h-[500px]">
							<Image
								src={slide.image}
								alt={`Slide ${index + 1}`}
								className="w-full h-full object-cover object-top"
								width={900}
								height={200}
							/>
							{/* Overlay for text */}
							<div className="absolute inset-0  bg-opacity-50 flex flex-col items-start justify-center text-left p-4 sm:p-8 lg:p-12">
								{/* <h2 className="text-white text-2xl sm:text-4xl lg:text-4xl font-bold">
									{slide.title}
								</h2>
								<p className="text-white text-base sm:text-lg  mt-2 max-w-lg">
									{slide.description}
								</p> */}
								{/* <Link href={'/store'}>
								<Button
									size={"lg"}
									className="my-4 bg-orange-500 hover:bg-orange-600">
									<span className="relative z-10 flex flex-row items-center">
									Visit Store
									</span>
									<span className="absolute inset-0 z-0 animate-shimmer bg-[linear-gradient(110deg,rgba(255,255,255,0.1),45%,rgba(255,255,255,0.3),55%,rgba(255,255,255,0.1))] bg-[length:200%_100%]"></span>
								</Button>
										</Link> */}
							</div>
						</div>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full shadow-md cursor-pointer ">
				&#8249;
			</CarouselPrevious>
			<CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2  p-2 rounded-full shadow-md cursor-pointer ">
				&#8250;
			</CarouselNext>
		</Carousel>
	);
}
