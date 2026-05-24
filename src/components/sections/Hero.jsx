import React, { useEffect, useState } from 'react'
import Badge from '../ui/Badge'
import {
    FaArrowRight,
    FaCrown,
    FaPeopleCarry,
    FaCheckCircle,
    FaChartLine
} from 'react-icons/fa'
import CommonButton from '../ui/CommonButton'

const Hero = () => {

    const btnProps = {
        gap: 1,
        borderRadius: "999px",
        variant: "contained",
        fontWeight: 'bold',
    }

    // MAX 6 STATS
    const HERO_STATS = [
        { number: 500, suffix: "+", label: "Brands Served" },
        { number: 500, suffix: "+", label: "Products Listed" },
        { number: 6, suffix: "+", label: "Platforms Covered" },
        { number: 120, suffix: "+", label: "Campaigns Managed" },
        { number: 98, suffix: "%", label: "Client Satisfaction" },
        { number: 24, suffix: "/7", label: "Support Available" },
    ]

    // MAX 9 PLATFORMS
    const HERO_PLATFORMS = [
        { icon: "fab fa-amazon", name: "Amazon" },
        { icon: "fas fa-shopping-bag", name: "Flipkart" },
        { icon: "fas fa-store", name: "Meesho" },
        { icon: "fas fa-tshirt", name: "Ajio" },
        { icon: "fas fa-bolt", name: "Snapdeal" },
        { icon: "fas fa-tag", name: "Myntra" },
        { icon: "fas fa-shopping-cart", name: "Shopify" },
        { icon: "fas fa-store-alt", name: "Jiomart" },
        { icon: "fas fa-box-open", name: "Nykaa" },
    ]

    function Counter({ end }) {
        const [count, setCount] = useState(0)

        useEffect(() => {
            const timer = setInterval(() => {
                setCount(prev => {
                    if (prev >= end) return end
                    return prev + Math.ceil((end - prev) / 20)
                })
            }, 40)

            return () => clearInterval(timer)
        }, [end])

        return <>{count.toLocaleString()}</>
    }

    return (
        <section className="relative min-h-screen flex items-center pt-20 md:pb-0 pb-10">
            <div className="container mx-auto px-2 md:px-4 sm:px-6 lg:px-8 md:py-4">
                {/* MAIN GRID */}
                <div className="grid grid-cols-1 xl:grid-cols-2 md:gap-14 lg:gap-0 xl:gap-20 items-center">
                    {/* LEFT CONTENT */}
                    <div className="w-full grid grid-cols-1 gap-3 md:gap-10 mb-10">
                        <Badge className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-xl border border-white/50 w-fit rounded-full lg:mb-5 xl:mb-10 mb-5 md:py-1 md:px-3 xl:py-2 xl:px-5 shadow-xl">
                            <FaCrown className="text-[#fabc0f] text-sm sm:text-lg" />
                            <span className="text-primary font-semibold text-xs sm:text-sm md:text-sm xl:text-base">
                                Trusted by 500+ Brands Across India
                            </span>
                        </Badge>
                        <h1 className="
                            text-3xl sm:text-[3rem] md:text-[3.6rem] xl:text-[4.2rem] leading-[1.1] font-bold text-[#1A1A1A] font-['Times_New_Roman']">
                            Grow Your Online Business with{' '}
                            <span className="bg-gradient-to-r from-primary to-[#A17BA4] bg-clip-text text-transparent">
                                Complete E-Commerce Support
                            </span>
                        </h1>
                        <p className="text-sm sm:text-lg lg:text-xl leading-relaxed text-gray-600 max-w-2xl">
                            Your <span className="font-bold text-primary">premium</span> marketplace growth partner for Amazon,
                            Flipkart, Meesho, Myntra, and more — helping brands scale with strategy,
                            ads, and operational excellence.
                        </p>
                        {/* BUTTONS */}
                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
                            <CommonButton
                                {...btnProps}
                                bgColor="#A36081"
                                color="white"
                                className="w-full sm:w-auto justify-center shadow-xl hover:scale-105 transition-all duration-300"
                            >
                                <FaPeopleCarry size={18} />
                                <span>Get Free Consultation</span>
                            </CommonButton>
                            <CommonButton
                                {...btnProps}
                                bgColor="white"
                                color="#1A1A1A"
                                className="w-full sm:w-auto justify-center border-2 border-primary/30 shadow-xl hover:bg-primary/5 transition-all duration-300"
                            >
                                <FaArrowRight size={14} className="text-primary" />
                                <span className="text-primary font-bold">
                                    Explore Services
                                </span>
                            </CommonButton>
                        </div>
                    </div>

                    {/* RIGHT CARD */}
                    <div className="relative w-full">
                        <div
                            className="relative rounded-[28px] sm:rounded-[32px] p-5 sm:p-8 lg:p-10 xl:p-7 bg-gradient-to-br from-white via-white/90 to-[#F8F5F8] border-white/50 shadow-2xl"
                            style={{
                                animation: "floatCard 6s ease-in-out infinite",
                                // `boxShadow: `
                                //     20px 20px 60px rgba(163,96,129,0.15),
                                //     -20px -20px 60px rgba(255,255,255,0.95),
                                //     inset -10px -10px 30px rgba(255,255,255,0.9),
                                //     inset 10px 10px 30px rgba(163,96,129,0.08)
                                // ``
                            }}
                        >

                            {/* TOP BADGE */}
                            <div className="
                                absolute top-3 right-3 sm:-top-5 sm:-right-5 bg-primary text-white px-3 sm:px-5 py-2 rounded-2xl shadow-xl hidden md:flex items-center gap-2 text-xs sm:text-sm font-bold z-10">
                                <FaCheckCircle />
                                Account Approved
                            </div>
                            {/* BOTTOM BADGE */}
                            <div className="absolute bottom-3 left-3 sm:-bottom-5 sm:-left-5 bg-[#A17BA4] text-white px-3 sm:px-5 py-2 rounded-2xl shadow-xl hidden md:flex items-center gap-2 text-xs sm:text-sm font-bold z-10">
                                <FaChartLine />
                                +147% Sales Growth
                            </div>
                            {/* PLATFORM GRID */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5">
                                {HERO_PLATFORMS.slice(0, 9).map(({ icon, name }) => (
                                    <div key={name}
                                        className="group relative rounded-2xl sm:rounded-3xl p-4 sm:p-5 flex flex-col items-center justify-center text-center gap-3 transition-all duration-300 hover:-translate-y-2 bg-gradient-to-b from-white to-white/80 border border-white/50 min-h-[120px]"
                                        style={{
                                            boxShadow: `
                                                10px 10px 25px rgba(163,96,129,0.15),
                                                -8px -8px 20px rgba(255,255,255,0.95),
                                                inset -6px -6px 15px rgba(255,255,255,0.9),
                                                inset 6px 6px 15px rgba(163,96,129,0.08)
                                            `
                                        }}
                                    >
                                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center bg-gradient-to-r from-primary/10 to-[#A17BA4]/10">
                                            <i
                                                className={icon}
                                                style={{
                                                    fontSize: '1.3rem',
                                                    color: '#A36081'
                                                }}
                                            />
                                        </div>

                                        <span className="text-xs sm:text-sm font-bold text-[#1A1A1A]">
                                            {name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="md:hidden grid grid-cols-2 gap-3 mt-10">
                            <div className="bg-primary text-white px-3 sm:px-5 py-2 rounded shadow-xl md:hidden flex items-center gap-2 text-xs sm:text-sm font-bold z-10">
                                <FaCheckCircle />
                                Account Approved
                            </div>
                             {/* BOTTOM BADGE */}
                            <div className="bg-[#A17BA4] text-white px-3 sm:px-5 py-2 rounded shadow-xl md:hidden flex items-center gap-2 text-xs sm:text-sm font-bold z-10">
                                <FaChartLine />
                                +147% Sales Growth
                            </div>
                        </div>
                    </div>
                </div>

                {/* STATS SECTION */}
                <div className="flex justify-center md:mt-16 mt-7 ">
                    <div className="w-full bg-white/80  backdrop-blur-xl  border border-[#E7D8E0]/50 rounded-[28px] shadow-2xl px-4 sm:px-6  py-6">
                        <div className="grid grid-cols-2  md:grid-cols-3 xl:grid-cols-6 gap-y-8  gap-x-6">
                            {HERO_STATS.slice(0, 6).map((item, i) => (
                                <div key={i} className={`stat-item animate-${i} text-center`}>
                                    <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1A1A1A] leading-none mb-2">
                                        <Counter end={item.number} />
                                        <span className="text-primary text-xl sm:text-2xl">
                                            {item.suffix}
                                        </span>
                                    </div>
                                    <p className="text-sm sm:text-base text-gray-500 font-medium">
                                        {item.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero