import React from 'react'
import { client } from '@/sanity/lib/client'
import { Users, Store, Tag, TrendingUp } from 'lucide-react'

const StatsSection = async () => {
  // Fetch real stats from Sanity
  const stats = await client.fetch(`{
    "totalStores": count(*[_type == "storeAdd"]),
    "totalCoupons": count(*[_type == "addCoupon"]),
    "activeCoupons": count(*[_type == "addCoupon" && dateTime(expiredate) > dateTime(now())])
  }`)

  const displayStats = [
    {
      icon: Store,
      value: `${stats.totalStores}+`,
      label: 'Partner Stores',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100'
    },
    {
      icon: Tag,
      value: `${stats.totalCoupons}+`,
      label: 'Total Coupons',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'from-orange-50 to-orange-100'
    },
    {
      icon: TrendingUp,
      value: `${stats.activeCoupons}+`,
      label: 'Active Deals',
      color: 'from-green-500 to-green-600',
      bgColor: 'from-green-50 to-green-100'
    },
    {
      icon: Users,
      value: '50K+',
      label: 'Happy Savers',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'from-purple-50 to-purple-100'
    }
  ]

  return (
    <section className="py-16 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-orange-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Trusted by Thousands
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Join our growing community of smart shoppers saving money every day
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {displayStats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div 
                key={index}
                className="group relative bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 hover:border-orange-400/50 transition-all duration-300 transform hover:-translate-y-2 hover:bg-white/15"
              >
                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Value */}
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.value}
                  </div>
                  <div className="text-gray-300 font-medium">
                    {stat.label}
                  </div>
                </div>

                {/* Glow effect on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-20 rounded-2xl blur-xl transition-opacity duration-300`}></div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default StatsSection
