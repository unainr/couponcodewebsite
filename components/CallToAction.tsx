'use client'
import React, { useState } from 'react'

const CallToAction = () => {
    const [email, setEmail] = useState('')
    const handelSubmit = (e:React.FormEvent) => { 
        e.preventDefault()
      setEmail('')
    }
  return (
    <form onSubmit={handelSubmit} className="flex text-white   flex-col sm:flex-row w-full md:w-auto gap-2">
    <input
        type="email"
        placeholder="Email Address"
        className="flex-grow p-3 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-orange-500"
        required
        onChange={(e) => setEmail(e.target.value)}
    />
    <button
    disabled={!email}
        type="submit"
        className="bg-orange-500 text-white px-6 py-3 rounded-r-md hover:bg-orange-600 transition duration-200 font-medium disabled:bg-orange-700">
        Subscribe
        
    </button>
</form>
  )
}

export default CallToAction