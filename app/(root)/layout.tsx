import Footer from '@/components/header/footer'
import ServerNavbar from '@/components/header/ServerNavbar'
import React from 'react'

const layout = ({children}:{children:React.ReactNode}) => {
  return (
    <>
  <ServerNavbar/>
    {children}
    <Footer/>
    </>
  )
}

export default layout