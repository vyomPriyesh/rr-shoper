import React, { useState } from 'react'

const PlanPricing = () => {

    const platforms = [
        {
            name: "Amazon",
            logo: "https://cdn-icons-png.flaticon.com/512/5968/5968870.png",
        },
        {
            name: "Flipkart",
            logo: "https://cdn-icons-png.flaticon.com/512/5977/5977576.png",
        },
        {
            name: "Meesho",
            logo: "https://cdn-icons-png.flaticon.com/512/5968/5968520.png",
        },
        {
            name: "Ajio",
            logo: "https://cdn-icons-png.flaticon.com/512/732/732084.png",
        },
        {
            name: "Myntra",
            logo: "https://cdn-icons-png.flaticon.com/512/5968/5968255.png",
        },
        {
            name: "Nykaa",
            logo: "https://cdn-icons-png.flaticon.com/512/5968/5968672.png",
        },
        {
            name: "JioMart",
            logo: "https://cdn-icons-png.flaticon.com/512/732/732200.png",
        },
    ]

    const pricingData = {

        Amazon: [
            {
                title: "Starter",
                price: "₹4,999",
                features: [
                    "Account Setup",
                    "5 Product Listings",
                    "Basic SEO",
                    "Email Support",
                ],
            },
            {
                title: "Growth",
                price: "₹9,999",
                popular: true,
                features: [
                    "20 Product Listings",
                    "SEO Optimization",
                    "PPC Campaign Setup",
                    "Priority Support",
                ],
            },
            {
                title: "Enterprise",
                price: "₹19,999",
                features: [
                    "Unlimited Listings",
                    "Advanced Ads",
                    "Brand Registry",
                    "Dedicated Manager",
                ],
            },
        ],

        Flipkart: [
            {
                title: "Starter",
                price: "₹3,999",
                features: [
                    "Seller Setup",
                    "Catalog Upload",
                    "5 Listings",
                    "Support",
                ],
            },
            {
                title: "Growth",
                price: "₹8,999",
                popular: true,
                features: [
                    "SEO Optimization",
                    "Ad Campaign",
                    "15 Listings",
                    "Priority Support",
                ],
            },
            {
                title: "Enterprise",
                price: "₹16,999",
                features: [
                    "Unlimited Products",
                    "Premium Marketing",
                    "Brand Approval",
                    "Dedicated Manager",
                ],
            },
        ],

        Meesho: [
            {
                title: "Starter",
                price: "₹2,999",
                features: [
                    "Seller Setup",
                    "5 Listings",
                    "Catalog Upload",
                    "Basic Support",
                ],
            },
            {
                title: "Growth",
                price: "₹6,999",
                popular: true,
                features: [
                    "SEO & Keywords",
                    "Promotion Setup",
                    "20 Listings",
                    "Priority Support",
                ],
            },
            {
                title: "Enterprise",
                price: "₹12,999",
                features: [
                    "Unlimited Listings",
                    "Growth Strategy",
                    "Dedicated Support",
                    "Advanced Marketing",
                ],
            },
        ],

    }

    const [selectedPlatform, setSelectedPlatform] = useState("Amazon")

    return (
        <section className="pb-10 md:py-10">

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                {/* Heading */}
                <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">

                    <h2 className="
                        text-sm
                        sm:text-base
                        font-semibold
                        uppercase
                        tracking-[4px]
                        text-[#B06A8D]
                        mb-4
                    ">
                        Plans & Pricing
                    </h2>

                    <h1 className="
                        text-3xl
                        lg:text-4xl
                        font-bold
                        text-[#1E1E1E]
                        leading-tight
                        mb-5
                    ">
                        Choose Your Marketplace Plan
                    </h1>

                    <p className="
                        text-sm
                        md:text-base
                        text-[#5F6673]
                        leading-relaxed
                        max-w-2xl
                        mx-auto
                    ">
                        Pricing changes based on marketplace platforms.
                        Select your platform to explore custom plans.
                    </p>

                </div>

                {/* Platform Selection */}
                <div className="
                    flex
                    flex-wrap
                    justify-center
                    gap-3
                    sm:gap-4
                    mb-12
                    lg:mb-16
                ">

                    {platforms.map((platform, index) => (

                        <button
                            key={index}
                            onClick={() => setSelectedPlatform(platform.name)}
                            className={`
                                group
                                relative
                                overflow-hidden

                                flex
                                items-center
                                gap-2
                                sm:gap-3

                                px-4
                                sm:px-5

                                py-3
                                sm:py-3.5

                                rounded-2xl

                                transition-all
                                duration-500

                                backdrop-blur-md

                                border

                                hover:-translate-y-1
                                hover:scale-105

                                ${selectedPlatform === platform.name
                                    ? `
                                        bg-[#B06A8D]
                                        text-white
                                        border-[#B06A8D]

                                        shadow-[0_12px_35px_rgba(176,106,141,0.30)]

                                        scale-105
                                    `
                                    : `
                                        bg-white/80
                                        text-[#1E1E1E]
                                        border-white/60


                                        hover:border-[#E8C7D7]
                                    `
                                }
                            `}
                        >

                            {/* Glow */}
                            <div className={`
                                absolute
                                inset-0
                                opacity-0
                                transition-all
                                duration-500

                                bg-gradient-to-br
                                from-white/20
                                via-transparent
                                to-[#C89AB5]/20

                                ${selectedPlatform === platform.name
                                    ? "opacity-100"
                                    : "group-hover:opacity-100"
                                }
                            `}></div>

                            {/* Logo */}
                            <div className={`
                                relative
                                z-10

                                flex
                                items-center
                                justify-center

                                w-9 h-9
                                sm:w-10 sm:h-10

                                rounded-xl

                                transition-all
                                duration-500

                                ${selectedPlatform === platform.name
                                    ? `
                                        bg-white
                                        shadow-inner
                                    `
                                    : `
                                        bg-[#FFF7FA]
                                        group-hover:bg-white
                                    `
                                }
                            `}>

                                <img
                                    src={platform.logo}
                                    alt={platform.name}
                                    className="
                                        w-5 h-5
                                        sm:w-6 sm:h-6
                                        object-contain
                                    "
                                />

                            </div>

                            {/* Name */}
                            <span className="
                                relative
                                z-10

                                text-xs
                                sm:text-sm
                                md:text-[15px]

                                font-semibold
                                tracking-wide
                            ">
                                {platform.name}
                            </span>

                            {/* Active Dot */}
                            {selectedPlatform === platform.name && (
                                <div className="
                                    absolute
                                    top-2
                                    right-2

                                    w-2
                                    h-2

                                    rounded-full
                                    bg-white

                                    animate-pulse
                                "></div>
                            )}

                        </button>

                    ))}

                </div>

                {/* Pricing Cards */}
                <div className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    xl:grid-cols-3
                    gap-6
                    lg:gap-8
                ">

                    {pricingData[selectedPlatform]?.map((plan, index) => (

                        <div
                            key={index}
                            className={`
        relative
        overflow-hidden

        rounded-[28px]

        p-6
        sm:p-7
        lg:p-8

        transition-all
        duration-500

        flex
        flex-col
        h-full

        ${plan.popular
                                    ? `
                bg-[#B06A8D]
                text-white

                md:scale-[1.03]

                shadow-[0_20px_50px_rgba(176,106,141,0.25)]
            `
                                    : `
                bg-white/80
                backdrop-blur-md

                border border-white/60

                text-[#1E1E1E]

                shadow-[0_10px_30px_rgba(176,106,141,0.08)]

                hover:-translate-y-2
                hover:shadow-[0_20px_50px_rgba(176,106,141,0.15)]
            `
                                }
    `}
                        >

                            {/* Popular Badge */}
                            {plan.popular && (
                                <div className="
            absolute
            top-5
            right-5

            bg-white
            text-[#B06A8D]

            text-xs
            font-bold

            px-3
            py-1

            rounded-full
        ">
                                    Most Popular
                                </div>
                            )}

                            {/* Title */}
                            <h3 className="
        text-2xl
        font-bold
        mb-4
    ">
                                {plan.title}
                            </h3>

                            {/* Price */}
                            <div className="
        flex
        items-end
        gap-1
        mb-7
    ">

                                <span className="
            text-4xl
            font-bold
        ">
                                    {plan.price}
                                </span>

                                <span className="
            text-sm
            opacity-70
            mb-1
        ">
                                    /month
                                </span>

                            </div>

                            {/* Features */}
                            <div className="
        space-y-4
        mb-8
    ">

                                {plan.features.map((feature, i) => (

                                    <div
                                        key={i}
                                        className="
                    flex
                    items-start
                    gap-3
                "
                                    >

                                        <div className={`
                    min-w-[20px]
                    h-5

                    rounded-full

                    flex
                    items-center
                    justify-center

                    text-[11px]

                    mt-0.5

                    ${plan.popular
                                                ? "bg-white text-[#B06A8D]"
                                                : "bg-[#F8EEF3] text-[#B06A8D]"
                                            }
                `}>
                                            ✓
                                        </div>

                                        <span className="
                    text-sm
                    sm:text-[15px]
                    leading-relaxed
                ">
                                            {feature}
                                        </span>

                                    </div>

                                ))}

                            </div>

                            {/* Button Wrapper */}
                            <div className="mt-auto">

                                <button className={`
            w-full

            py-3.5

            rounded-2xl

            text-sm
            sm:text-base

            font-semibold

            transition-all
            duration-300

            ${plan.popular
                                        ? `
                    bg-white
                    text-[#B06A8D]

                    hover:bg-[#F8EEF3]
                `
                                        : `
                    bg-[#B06A8D]
                    text-white

                    hover:bg-[#9A5A7C]
                `
                                    }
        `}>
                                    Get Started
                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </section>
    )
}

export default PlanPricing