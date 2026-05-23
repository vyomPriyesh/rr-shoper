import React from 'react'
import SectionsUI from '../layouts/SectionsUI'

const WorkProcess = () => {

    const steps = [
        {
            title: 'Free Consultation',
            description:
                `Share your business details and goals. We'll analyze your needs and recommend the best strategy.`
        },
        {
            title: 'Account Setup',
            description:
                `We handle all documentation and create your seller accounts on chosen marketplaces.`
        },
        {
            title: 'Product Launch',
            description:
                `Professional listing creation with optimized content, images, and keywords for maximum visibility.`
        },
        {
            title: 'Scale & Grow',
            description:
                `Ongoing optimization, advertising campaigns, and support to continuously grow your sales.`
        },
    ]

    const Content = () => {
        return (
            <div className="relative w-full">
                
                {/* Top Line */}
                <div className="hidden lg:block absolute top-10 left-0 w-full h-1 bg-primary/20 rounded-full">
                    <div className="w-full h-full bg-primary rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                    {steps.map((step, i) => (
                        <div
                            key={i}
                            className="group bg-white border border-primary/10 rounded-3xl p-7 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                        >

                            {/* Step Number */}
                            <div className="flex justify-center lg:justify-start mb-6">
                                <div className="relative">
                                    <div className="h-20 w-20 rounded-full bg-primary text-white text-3xl font-bold flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110">
                                        {i + 1}
                                    </div>

                                    <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl group-hover:bg-primary/30 transition-all duration-300"></div>
                                </div>
                            </div>

                            {/* Title */}
                            <h3 className="text-2xl font-bold text-heading text-center lg:text-left mb-4">
                                {step.title}
                            </h3>

                            {/* Description */}
                            <p className="text-para leading-7 text-center lg:text-left">
                                {step.description}
                            </p>

                            {/* Hover Line */}
                            <div className="mt-6 h-1 w-0 bg-primary rounded-full group-hover:w-full transition-all duration-500"></div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <SectionsUI
            topic="How It Works"
            heading="Simple Steps to Start Selling"
            text="Our streamlined process gets you from zero to selling in no time."
            content={<Content />}
        />
    )
}

export default WorkProcess