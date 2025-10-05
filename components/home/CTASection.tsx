import React from 'react'
import Link from 'next/link'
import { ArrowRight, Mail } from 'lucide-react'

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20">
        <div className="absolute top-10 right-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-yellow-300 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main heading */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to Start Saving Money?
          </h2>
          
          <p className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed">
            Join thousands of smart shoppers and never pay full price again!
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link 
              href="/store"
              className="group inline-flex items-center gap-3 bg-white text-orange-600 font-bold px-8 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl"
            >
              Browse All Stores
              <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link 
              href="/search"
              className="group inline-flex items-center gap-3 bg-transparent border-2 border-white text-white font-bold px-8 py-4 rounded-full hover:bg-white hover:text-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Search Coupons
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </Link>
          </div>

          {/* Stats bar */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">100%</div>
                <div className="text-white/80 text-sm">Free to Use</div>
              </div>
              <div className="text-center border-l border-r border-white/20">
                <div className="text-3xl font-bold mb-1">Daily</div>
                <div className="text-white/80 text-sm">New Deals Added</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">24/7</div>
                <div className="text-white/80 text-sm">Available Anytime</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated shapes */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/10 to-transparent"></div>
    </section>
  )
}

export default CTASection
