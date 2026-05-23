import React from 'react'

const SectionsUI = ({
    topic,
    heading,
    text,
    content
}) => {
    return (
        <div className='pb-10 md:py-10 overflow-hidden'>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
                    <h2 className="text-sm sm:text-base font-semibold uppercase tracking-[4px] text-[#B06A8D] mb-4">
                        {topic}
                    </h2>
                    <h1 className="text-3xl lg:text-4xl font-bold text-[#1E1E1E] leading-tight mb-5">
                        {heading}
                    </h1>
                    <p className="text-sm md:text-base text-[#5F6673] leading-relaxed max-w-2xl mx-auto">
                        {text}
                    </p>
                </div>
                {content}
            </div>
        </div>
    )
}

export default SectionsUI