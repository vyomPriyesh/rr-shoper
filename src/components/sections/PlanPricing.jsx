import React, { useState } from 'react'
import SectionsUI from '../layouts/SectionsUI'
import { userState } from '../../context/UserContext'
import apiList from '../../config/apiList';
import { useQuery } from '@tanstack/react-query';
import api from '../../config/api';

const PlanPricing = () => {

    const { user } = userState();
    const { packages, images } = apiList();

    const { data: { platforms = [], pricingData = {} } = {}, refetch: allPackagesRefetch } = useQuery({
        queryKey: ["all-packages", user],
        queryFn: () => api.post(packages.all),
        select: ({ data }) => {
            const response = data.data.data
            return {
                platforms: [
                    ...new Map(
                        response.map(item => [
                            item.platform._id,
                            item.platform
                        ])
                    ).values()
                ],
                pricingData: response.reduce((acc, item) => {
                    if (!acc[item.platform.name]) {
                        acc[item.platform.name] = [];
                    }

                    acc[item.platform.name].push({
                        name: item.name,
                        price: item.price,
                        services: item.services,
                        popular: item.popular,
                    });

                    return acc;
                }, {})
            }
        }
    })

    const [selectedPlatform, setSelectedPlatform] = useState('amazon')

    const Content = () => {
        return (
            <>
                {/* Platform Tabs */}
                <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12 lg:mb-16">
                    {platforms.map((platform, index) => (
                        <button
                            key={index}
                            onClick={() =>
                                setSelectedPlatform(platform.name)
                            }
                            className={`
                                group relative overflow-hidden
                                flex items-center gap-2 sm:gap-3
                                px-4 sm:px-5 py-3 sm:py-3.5
                                rounded-2xl
                                transition-all duration-500
                                backdrop-blur-md border
                                hover:-translate-y-1 hover:scale-105

                                ${selectedPlatform === platform.name
                                    ? `
                                            bg-primary text-white border-primary
                                            shadow-[0_12px_35px_rgba(176,106,141,0.30)]
                                            scale-105
                                        `
                                    : `
                                            bg-white/80 text-heading border-white/60
                                            hover:border-[#E8C7D7]
                                        `
                                }
                            `}
                        >

                            {/* Background Glow */}
                            <div
                                className={`
                                    absolute inset-0 opacity-0
                                    transition-all duration-500
                                    bg-gradient-to-br
                                    from-white/20 via-transparent to-secondary/20

                                    ${selectedPlatform === platform.name
                                        ? 'opacity-100'
                                        : 'group-hover:opacity-100'
                                    }
                                `}
                            />

                            {/* Logo */}
                            <div
                                className={`
                                    relative z-10
                                    flex items-center justify-center
                                    w-9 h-9 sm:w-10 sm:h-10
                                    rounded-xl transition-all duration-500

                                    ${selectedPlatform === platform.name
                                        ? 'bg-white shadow-inner'
                                        : 'bg-[#FFF7FA] group-hover:bg-white'
                                    }
                                `}
                            >
                                <img
                                    src={images.imgUrl + platform.image.image}
                                    alt={platform.name}
                                    className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
                                />
                            </div>

                            {/* Name */}
                            <span className="relative z-10 text-xs sm:text-sm md:text-[15px] font-semibold tracking-wide capitalize">
                                {platform.name}
                            </span>

                            {/* Active Dot */}
                            {selectedPlatform === platform.name && (
                                <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-white animate-pulse" />
                            )}
                        </button>

                    ))}
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">

                    {pricingData[selectedPlatform]?.map((plan, index) => (

                        <div
                            key={index}
                            className={`
                                relative overflow-hidden rounded-[28px]
                                p-6 sm:p-7 lg:p-8
                                transition-all duration-500
                                flex flex-col h-full

                                ${plan.popular
                                    ? `
                                            bg-primary text-white
                                            md:scale-[1.03]
                                            shadow-[0_20px_50px_rgba(176,106,141,0.25)]
                                        `
                                    : `
                                            bg-white/80 backdrop-blur-md
                                            border border-white/60
                                            text-heading
                                            shadow-[0_10px_30px_rgba(176,106,141,0.08)]
                                            hover:-translate-y-2
                                            hover:shadow-[0_20px_50px_rgba(176,106,141,0.15)]
                                        `
                                }
                            `}
                        >

                            {/* Badge */}
                            {plan?.popular && (
                                <div className="absolute top-5 right-5 bg-white text-primary text-xs font-bold px-3 py-1 rounded-full">
                                    Most Popular
                                </div>
                            )}

                            {/* Title */}
                            <h3 className="text-2xl font-bold mb-4 capitalize">
                                {plan.name}
                            </h3>

                            {/* Price */}
                            <div className="flex items-end gap-1 mb-7">

                                <span className="text-4xl font-bold">
                                    {plan.price}
                                </span>

                                <span className="text-sm opacity-70 mb-1">
                                    /month
                                </span>
                            </div>

                            {/* Services */}
                            <div className="space-y-4 mb-8">

                                {plan.services.map((feature, i) => (

                                    <div
                                        key={i}
                                        className="flex items-start gap-3"
                                    >

                                        <div
                                            className={`
                                                min-w-[20px] h-5 rounded-full
                                                flex items-center justify-center
                                                text-[11px] mt-0.5

                                                ${plan?.popular
                                                    ? 'bg-white text-primary'
                                                    : 'bg-[#F8EEF3] text-primary'
                                                }
                                            `}
                                        >
                                            ✓
                                        </div>

                                        <span className="text-sm sm:text-[15px] leading-relaxed capitalize">
                                            {feature}
                                        </span>
                                    </div>

                                ))}
                            </div>

                            {/* Button */}
                            <div className="mt-auto">

                                <button
                                    className={`
                                        w-full py-3.5 rounded-2xl
                                        text-sm sm:text-base font-semibold
                                        transition-all duration-300

                                        ${plan?.popular
                                            ? `
                                                    bg-white text-primary
                                                    hover:bg-[#F8EEF3]
                                                `
                                            : `
                                                    bg-primary text-white
                                                    hover:bg-primaryDark
                                                `
                                        }
                                    `}
                                >
                                    Get Started
                                </button>

                            </div>
                        </div>

                    ))}
                </div>
            </>
        )
    }

    return (
        <SectionsUI
            topic="Plans & Pricing"
            heading="Choose Your Marketplace Plan"
            text="Pricing changes based on marketplace platforms. Select your platform to explore custom plans."
            content={<Content />}
            id="platforms"
        />
    )
}

export default PlanPricing