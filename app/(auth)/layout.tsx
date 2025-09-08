import React from 'react'
import Link from 'next/link'

const Layout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        {/* Logo Section */}
        <div className="flex items-center justify-center">
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

        {/* Welcome Heading */}
        <div className="text-center space-y-2 mt-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Welcome Back
          </h2>
          <p className="text-gray-600">
            Sign in to your account to continue saving
          </p>
        </div>
        
        {/* Form Content */}
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            {children}
          </div>
        </div>
      </div>
      
      {/* Right Side Image */}
      <div className="bg-muted relative hidden lg:block">
        <img
          src="/mok.jpg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}

export default Layout