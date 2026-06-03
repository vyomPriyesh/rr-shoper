import React from 'react'
import { FaHandPointRight } from 'react-icons/fa'

const PoliciesPointsUi = ({ policiesPoints }) => {
  
  return (
    policiesPoints?.map((list, i) => (
      <div className="flex flex-row capitalize">
        <span className='font-semibold text-2xl text-nowrap'>{i + 1}.</span>
        <div className="flex flex-col gap-2">
          <span className='font-semibold text-2xl'>&nbsp;{list?.title}</span>
          <small className='text-lg font-semibold'>{list?.subtitle} {list?.points?.length > 0 && ':'}</small>
          {list?.points?.map((key) => (
            <div className="flex flex-col gap-2 px-10">
              <div className="flex flex-row gap-3 place-items-start">
                <span className='mt-1 shrink-0'><FaHandPointRight /></span>
                <span className={`${key?.includes('@') ? 'lowercase':''}`}>{key}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    ))
  )
}

export default PoliciesPointsUi
