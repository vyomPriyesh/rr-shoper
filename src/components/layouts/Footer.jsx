import React from 'react'
import Logo from '../sections/Logo'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa'

const Footer = () => {



    return (
        <section className="py-6 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="container p-6 lg:p-10 mx-auto rounded-[32px] border border-borderColor bg-background">

                <div className="flex flex-col lg:flex-row gap-14">

                    {/* Left Side */}
                    <div className="w-full lg:max-w-[380px] flex flex-col gap-5">

                        <Logo />

                        <p className="text-paragraph leading-8 text-base">
                            Your trusted partner for complete e-commerce marketplace
                            solutions. Helping brands launch, list, market, and scale
                            on major platforms since 2019.
                        </p>

                        {/* Social Icons */}
                        <div className="mt-4 flex items-center flex-wrap gap-4">

                            {[
                                <FaFacebookF />,
                                <FaInstagram />,
                                <FaLinkedinIn />,
                                <FaYoutube />,
                            ].map((icon, index) => (
                                <button
                                    key={index}
                                    className="
                                w-12 h-12 rounded-2xl text-white
                                flex items-center justify-center
                                bg-primary
                                transition-all duration-300
                                hover:text-primary
                                hover:bg-white
                                hover:-translate-y-1
                                hover:shadow-xl
                                border border-transparent
                                hover:border-primary
                            "
                                >
                                    {icon}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full">

                        {/* Quick Links */}
                        <div>
                            <h3 className="text-xl font-semibold text-heading mb-6">
                                Quick Links
                            </h3>

                            <ul className="space-y-4">

                                {[
                                    'Home',
                                    'Services',
                                    'Platforms',
                                    'Packages',
                                    'About',
                                    'Contact',
                                ].map((item, index) => (
                                    <li key={index}>
                                        <a
                                            href="/"
                                            className="
                                        relative inline-block
                                        text-paragraph
                                        transition-all duration-300
                                        hover:text-primary
                                        
                                        after:absolute
                                        after:left-0
                                        after:-bottom-1
                                        after:h-[2px]
                                        after:w-0
                                        after:bg-primary
                                        after:transition-all
                                        after:duration-300
                                        hover:after:w-full
                                    "
                                        >
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Services */}
                        <div>
                            <h3 className="text-xl font-semibold text-heading mb-6">
                                Our Services
                            </h3>

                            <ul className="space-y-4">

                                {[
                                    'Account Opening',
                                    'Product Listing',
                                    'Marketing & Ads',
                                    'Brand Registration',
                                    'Catalog Management',
                                ].map((item, index) => (
                                    <li key={index}>
                                        <a
                                            href="/"
                                            className="
                                        relative inline-block
                                        text-paragraph
                                        transition-all duration-300
                                        hover:text-primary
                                        
                                        after:absolute
                                        after:left-0
                                        after:-bottom-1
                                        after:h-[2px]
                                        after:w-0
                                        after:bg-primary
                                        after:transition-all
                                        after:duration-300
                                        hover:after:w-full
                                    "
                                        >
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Platforms */}
                        <div>
                            <h3 className="text-xl font-semibold text-heading mb-6">
                                Platforms
                            </h3>

                            <ul className="space-y-4">

                                {[
                                    'Amazon India',
                                    'Flipkart',
                                    'Meesho',
                                    'Ajio',
                                    'Snapdeal',
                                    'Myntra',
                                ].map((item, index) => (
                                    <li key={index}>
                                        <a
                                            href="/"
                                            className="
                                        relative inline-block
                                        text-paragraph
                                        transition-all duration-300
                                        hover:text-primary
                                        
                                        after:absolute
                                        after:left-0
                                        after:-bottom-1
                                        after:h-[2px]
                                        after:w-0
                                        after:bg-primary
                                        after:transition-all
                                        after:duration-300
                                        hover:after:w-full
                                    "
                                        >
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-12 pt-6 border-t border-borderColor flex flex-col sm:flex-row items-center justify-between gap-4">

                    <p className="text-sm text-paragraph text-center sm:text-left">
                        © 2026 RR SHOPER. All rights reserved.
                    </p>

                    <div className="flex items-center gap-5 flex-wrap justify-center">
                        <a
                            href="/"
                            className="
                        relative inline-block text-sm text-paragraph
                        hover:text-primary transition-all duration-300
                        
                        after:absolute
                        after:left-0
                        after:-bottom-1
                        after:h-[2px]
                        after:w-0
                        after:bg-primary
                        after:transition-all
                        after:duration-300
                        hover:after:w-full
                    "
                        >
                            Privacy Policy
                        </a>

                        <a
                            href="/"
                            className="
                        relative inline-block text-sm text-paragraph
                        hover:text-primary transition-all duration-300
                        
                        after:absolute
                        after:left-0
                        after:-bottom-1
                        after:h-[2px]
                        after:w-0
                        after:bg-primary
                        after:transition-all
                        after:duration-300
                        hover:after:w-full
                    "
                        >
                            Terms & Conditions
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Footer