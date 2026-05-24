// components/common/SelectField.jsx

import React from 'react'
import { IoChevronDown } from 'react-icons/io5'

const Dropdown = ({
    label,
    options = [],
    value,
    onChange,
    placeholder = 'Select option',
}) => {
    return (
        <div>
            {label && (
                <label className="block text-sm font-medium text-heading mb-2">
                    {label}
                </label>
            )}

            <div className="relative">
                <select
                    value={value}
                    onChange={onChange}
                    className="
                        appearance-none
                        w-full h-14 rounded-2xl border border-borderColor
                        px-5 pr-12 outline-none bg-white
                        text-heading
                        transition-all duration-300
                        focus:border-primary
                        focus:ring-4 focus:ring-primary/10
                    "
                >
                    <option value="">
                        {placeholder}
                    </option>

                    {options.map((option, index) => (
                        <option
                            key={index}
                            value={option.value}
                        >
                            {option.label}
                        </option>
                    ))}
                </select>

                <IoChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-paragraph pointer-events-none" />
            </div>
        </div>
    )
}

export default Dropdown