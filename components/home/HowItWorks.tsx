import React from 'react'
import { Search, Copy, ShoppingBag, Sparkles } from 'lucide-react'

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      step: '01',
      title: 'Find Your Store',
      description: 'Browse through thousands of popular stores or search for your favorite brand.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Copy,
      step: '02',
      title: 'Copy the Code',
      description: 'Click on any coupon to reveal and copy the discount code instantly.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: ShoppingBag,
      step: '03',
      title: 'Shop & Save',
      description: 'Apply the code at checkout and enjoy amazing discounts on your purchase.',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Sparkles,
      step: '04',
      title: 'Enjoy Savings',
      description: 'Celebrate your savings and come back for more exclusive deals daily!',
      color: 'from-green-500 to-emerald-500'
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-orange-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            How It Works
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Start saving in just 4 simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="relative">
                {/* Connecting line (hidden on mobile) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-1/2 w-full h-1 bg-gradient-to-r from-orange-300 to-orange-200 z-0"></div>
                )}
                
                <div className="relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl border-2 border-gray-100 hover:border-orange-400 transition-all duration-300 transform hover:-translate-y-2 z-10">
                  {/* Step number */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm">{step.step}</span>
                  </div>

                  {/* Icon */}
                  <div className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg transform hover:scale-110 hover:rotate-6 transition-all duration-300`}>
                    <Icon className="w-10 h-10 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-center leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
