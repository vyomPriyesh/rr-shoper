import React from 'react'
import Hero from '../components/sections/Hero'
import Services from '../components/sections/Services'
import PlanPricing from '../components/sections/PlanPricing'
import WorkProcess from '../components/sections/WorkProcess'

const LandingPage = () => {
  return (
    <div className='bg-gradient-to-br from-[#FFF8FC] via-[#F7EDF3] to-[#F2E1EA]'>
      <Hero />
      <Services />
      <PlanPricing />
      <WorkProcess />
    </div>
  )
}

export default LandingPage