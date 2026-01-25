import BarAnimation from '@/components/BarAnimation'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import Home from '@/components/Home'
import Portfolios from '@/components/Portfolios'
import Services from '@/components/Services'
import Social from '@/components/Social'
import React from 'react'
 

export default function page() {
  return (
  <>
    <Home/>
    <BarAnimation/>
    <Portfolios/>
    <Social/>
    <Services/>
    
    <Contact/>
    <Footer/>
  
    
  </>
  )
}
