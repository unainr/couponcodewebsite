import React from 'react'
import { Shield, Zap, Gift, TrendingUp } from 'lucide-react'

const FeaturesSection = () => {
  const features = [
    {
      icon: Shield,
      title: 'Verified Coupons',
      description: 'All our coupon codes are hand-verified to ensure they work when you need them.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Zap,
      title: 'Instant Savings',
      description: 'Get instant discounts with one click. No hassle, no waiting - just savings!',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: Gift,
      title: 'Exclusive Deals',
      description: 'Access exclusive offers and deals you won\'t find anywhere else online.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: TrendingUp,
      title: 'Daily Updates',
      description: 'Fresh deals added daily from thousands of popular stores worldwide.',
      color: 'from-green-500 to-green-600'
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Why Choose Us?
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We make saving money easy and reliable with our trusted platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div 
                key={index}
                className="group relative bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-md hover:shadow-2xl border border-gray-100 hover:border-orange-300 transition-all duration-300 transform hover:-translate-y-2"
              >
                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>

                {/* Decorative element */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-100/50 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
