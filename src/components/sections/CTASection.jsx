import React from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { HiOutlineCalendarDays } from 'react-icons/hi2'

const CTASection = () => {
    return (
        <section className="py-10 px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-r from-primaryDark to-primary px-6 sm:px-10 lg:px-16 py-16 lg:py-20">

                {/* Background Circle */}
                <div className="absolute inset-0 overflow-hidden">

                    <div className="absolute top-0 right-0 w-[320px] h-[320px] rounded-full bg-white/10 animate-floatOne" />

                    <div className="absolute bottom-0 left-0 w-[220px] h-[220px] rounded-full bg-white/5 animate-floatTwo" />

                    <div className="absolute top-[40%] left-[45%] w-[120px] h-[120px] rounded-full bg-white/10 animate-floatThree" />
                </div>
                {/* Content */}
                <div className="relative z-10 max-w-4xl mx-auto text-center">

                    {/* Heading */}
                    <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                        Ready to Grow Your E-Commerce Business?
                    </h2>

                    {/* Description */}
                    <p className="mt-6 text-white/90 text-base sm:text-lg leading-8 max-w-2xl mx-auto">
                        Join 500+ successful brands who trust Priyesh Business
                        to manage their marketplace presence. Get your free
                        consultation today.
                    </p>

                    {/* Buttons */}
                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">

                        {/* Primary Button */}
                        {/* Primary Button */}
                        <button
                            className="
        h-[58px]
        px-8
        rounded-2xl
        bg-white
        text-primaryDark
        font-semibold
        text-base
        flex
        items-center
        gap-3
        transition-all
        duration-300
        hover:scale-[1.02]
        active:scale-[0.98]

        shadow-[8px_8px_18px_rgba(122,71,100,0.18),_-8px_-8px_18px_rgba(255,255,255,0.15)]
        hover:shadow-[10px_10px_22px_rgba(122,71,100,0.22),_-10px_-10px_22px_rgba(255,255,255,0.18)]
    "
                        >
                            <HiOutlineCalendarDays className="text-xl" />
                            Get Free Consultation
                        </button>

                        {/* Secondary Button */}
                        <button
                            className="
        h-[58px]
        px-8
        rounded-2xl
        border
        border-white/30
        text-white
        font-semibold
        text-base
        flex
        items-center
        gap-3
        transition-all
        duration-300
        hover:scale-[1.02]
        active:scale-[0.98]

        bg-white/5
        backdrop-blur-md

        shadow-[8px_8px_18px_rgba(122,71,100,0.18),_-8px_-8px_18px_rgba(255,255,255,0.08)]
        hover:bg-white
        hover:text-primaryDark
        hover:shadow-[10px_10px_22px_rgba(122,71,100,0.22),_-10px_-10px_22px_rgba(255,255,255,0.12)]
    "
                        >
                            <FaWhatsapp className="text-xl" />
                            Chat on WhatsApp
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CTASection