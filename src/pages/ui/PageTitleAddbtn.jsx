import React from 'react'
import ButtonUi from './ButtonUi'

const PageTitleAddbtn = ({ title, add, addClick, addText, className, ...rest }) => {
    return (
        <div className="flex justify-between gap-5">
            <h2 className='text-xl font-semibold'>{title}</h2>
            {add &&
                <ButtonUi disabled={rest.disabled} onClick={addClick} type={rest.type} text={addText || 'Add'} {...rest} className='text-sm !px-4' />
            }
        </div>
    )
}

export default PageTitleAddbtn
