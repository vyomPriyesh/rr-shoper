import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../sections/Logo'

import { BiSupport } from 'react-icons/bi'
import SocialMedia from '../ui/SocialMedia'
import { LuBadgeInfo } from 'react-icons/lu'
import { StateStore } from '../../context/StateStoreContext'

const Footer = () => {

    const { platFormData } = StateStore();

    const footerData = useMemo(() => {
        return [
            {
                title: 'Quick Links',
                links: [
                    { label: "Home", path: "/" },
                    { label: "Services", path: "services" },
                    { label: "Platforms", path: "platforms" },
                    { label: "About", path: "about" },
                    { label: "Contact", path: "contact" },
                ]
            },
            // {
            //     title: 'Our Services',
            //     links: [
            //         {
            //             label: 'Account Opening',
            //             path: '/services/account-opening',
            //         },
            //         {
            //             label: 'Product Listing',
            //             path: '/services/product-listing',
            //         },
            //         {
            //             label: 'Marketing & Ads',
            //             path: '/services/marketing',
            //         },
            //         {
            //             label: 'Brand Registration',
            //             path: '/services/brand-registration',
            //         },
            //         {
            //             label: 'Catalog Management',
            //             path: '/services/catalog-management',
            //         },
            //     ],
            // },
            {
                title: 'Platforms',
                links: platFormData.map((item, i) => ({
                    label: item.name,
                    path: `/platforms/${item.name}`
                }))
            },
        ]
    }, [platFormData])

    const linkClass = `
        relative inline-block
        text-paragraph
        transition-all duration-300
        hover:text-primary
        text-sm md:text-base
        after:absolute
        after:left-0
        after:-bottom-1
        after:h-[2px]
        after:w-0
        after:bg-primary
        after:transition-all
        after:duration-300
        hover:after:w-full capitalize`

    return (
        <footer className="py-3 px-3 sm:px-6 lg:px-8 bg-white">

            <div className="container mx-auto p-2 md:p-6 !pb-0 lg:p-10 rounded-[32px] border border-borderColor bg-background">

                {/* Top */}
                <div className="flex flex-col lg:flex-row gap-14">

                    {/* Left */}
                    <div className="w-full lg:max-w-[380px] flex flex-col gap-5">

                        <Logo />

                        <p className="text-paragraph leading-8 text-base">
                            Your trusted partner for seller account setup, product listing, catalog management, and marketplace support services.
                        </p>

                        {/* Social */}
                        <div className="mt-4 flex items-center flex-wrap gap-4">
                            <SocialMedia />
                        </div>
                    </div>

                    {/* Right */}
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-10 w-full">
                        {footerData.map((section, index) => (
                            <div key={index}>
                                <h3 className="md:text-xl text-base font-semibold text-primary mb-6">
                                    {section.title}
                                </h3>
                                <ul className="md:space-y-3 space-y-2">
                                    {section.links.map((link, i) => (
                                        <li key={i}>
                                            <Link
                                                to={link.path}
                                                className={linkClass}
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                        {/* <div className="md:col-span-1 col-span-2">
                            <h3 className="md:text-xl text-base font-semibold text-primary mb-6">
                                Need Help ?
                            </h3>
                            <p>Our team is here to help you with your seller account journey.</p>
                            <button className='text-white bg-primary px-4 py-2 mt-5 rounded-lg flex flow-row items-center gap-3 hover:scale-105 transition-all duration-500 hover:shadow-lg'>
                                <BiSupport className='text-xl' />
                                <spam className='font-semibold'>Contact Support</spam>
                            </button>
                        </div> */}
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-12 pt-6 border-t border-borderColor flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex flex-row md:items-center gap-3 md:w-1/2 md:border-0 border border-primary rounded-lg p-3">
                        <span className='text-primary text-2xl'><LuBadgeInfo /></span>
                        <p className="md:text-base text-sm text-paragraph">
                            We provide independent marketplace support services and are not affiliated with, endorsed by, or officially connected to Amazon, Flipkart, Meesho, or any other marketplace.
                            All trademarks and logos belong to their respective owners.
                        </p>
                    </div>

                    <div className="flex items-center gap-5 flex-wrap justify-center">
                        <Link
                            to="/privacy-policy"
                            className={linkClass}
                        >
                            Privacy Policy
                        </Link>
                        <span className='border-r-2 border-gray-300 h-5'></span>
                        <Link
                            to="/terms-and-conditions"
                            className={linkClass}
                        >
                            Terms & Conditions
                        </Link>
                        <span className='border-r-2 border-gray-300 h-5'></span>
                        <Link
                            to="/refund-cancellation-policy"
                            className={linkClass}
                        >
                            Refund & Cancellation Policy
                        </Link>
                    </div>
                </div>
                <div className="mt-12 border-t border-borderColor py-3 flex justify-center">
                    <p className="text-base text-paragraph text-center">
                        © 2026 RR SHOPER. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer