import React from 'react'
import { FaHandPointRight } from 'react-icons/fa'

const PoliciesPointsUi = ({ policiesPoints }) => {
  
  return (
    policiesPoints?.map((list, i) => (
      <div className="flex flex-row capitalize">
        <span className='font-semibold text-2xl text-nowrap'>{i + 1}.</span>
        <div className="flex flex-col gap-2">
          <span className='font-semibold md:text-2xl text-xl'>&nbsp;{list?.title}</span>
          <small className='md:text-lg text-base font-semibold'>{list?.subtitle} {list?.points?.length > 0 && ':'}</small>
          {list?.points?.map((key) => (
            <div className="flex flex-col gap-2 md:px-10 px-4">
              <div className="flex flex-row gap-3 place-items-start">
                <span className='mt-1 shrink-0'><FaHandPointRight /></span>
                <span className={`${key?.includes('@') ? 'lowercase':''} text-sm md:text-base`}>{key}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    ))
  )
}

export default PoliciesPointsUi
