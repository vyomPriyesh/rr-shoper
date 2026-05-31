import React from 'react'

const SectionsUI = ({
    id,
    topic,
    heading,
    text,
    content,
}) => {
    return (
        <div id={id} className='pt-10 pb-10 md:py-10 '>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
                    <h2 className="text-sm sm:text-base font-semibold uppercase tracking-[4px] text-primary mb-4">
                        {topic}
                    </h2>
                    <h1 className="text-3xl lg:text-4xl font-bold text-heading leading-tight mb-5">
                        {heading}
                    </h1>
                    <p className="text-sm md:text-base text-paragraph leading-relaxed max-w-2xl mx-auto">
                        {text}
                    </p>
                </div>
                {content}
            </div>
        </div>
    )
}

export default SectionsUI