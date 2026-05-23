import React from 'react'
import Hero from '../components/sections/Hero'
import Services from '../components/sections/Services'

const LandingPage = () => {
  return (
    <div className='bg-gradient-to-br from-[#FFF8FC] via-[#F7EDF3] to-[#F2E1EA]'>
      <Hero />
      <Services />
    </div>
  )
}

export default LandingPage