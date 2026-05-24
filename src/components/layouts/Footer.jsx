import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../sections/Logo'
import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaYoutube,
} from 'react-icons/fa'

const Footer = () => {

    const footerData = [
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
        {
            title: 'Our Services',
            links: [
                {
                    label: 'Account Opening',
                    path: '/services/account-opening',
                },
                {
                    label: 'Product Listing',
                    path: '/services/product-listing',
                },
                {
                    label: 'Marketing & Ads',
                    path: '/services/marketing',
                },
                {
                    label: 'Brand Registration',
                    path: '/services/brand-registration',
                },
                {
                    label: 'Catalog Management',
                    path: '/services/catalog-management',
                },
            ],
        },
        {
            title: 'Platforms',
            links: [
                { label: 'Amazon India', path: '/platforms/amazon' },
                { label: 'Flipkart', path: '/platforms/flipkart' },
                { label: 'Meesho', path: '/platforms/meesho' },
                { label: 'Ajio', path: '/platforms/ajio' },
                { label: 'Snapdeal', path: '/platforms/snapdeal' },
                { label: 'Myntra', path: '/platforms/myntra' },
            ],
        },
    ]

    const socialLinks = [
        {
            icon: <FaFacebookF />,
            path: '/',
        },
        {
            icon: <FaInstagram />,
            path: '/',
        },
        {
            icon: <FaLinkedinIn />,
            path: '/',
        },
        {
            icon: <FaYoutube />,
            path: '/',
        },
    ]

    const linkClass = `
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
    `

    return (
        <footer className="py-6 px-4 sm:px-6 lg:px-8 bg-white">

            <div className="container mx-auto p-6 lg:p-10 rounded-[32px] border border-borderColor bg-background">

                {/* Top */}
                <div className="flex flex-col lg:flex-row gap-14">

                    {/* Left */}
                    <div className="w-full lg:max-w-[380px] flex flex-col gap-5">

                        <Logo />

                        <p className="text-paragraph leading-8 text-base">
                            Your trusted partner for complete e-commerce
                            marketplace solutions. Helping brands launch,
                            list, market, and scale on major platforms
                            since 2019.
                        </p>

                        {/* Social */}
                        <div className="mt-4 flex items-center flex-wrap gap-4">

                            {socialLinks.map((item, index) => (
                                <Link
                                    key={index}
                                    to={item.path}
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
                                    {item.icon}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Right */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full">

                        {footerData.map((section, index) => (
                            <div key={index}>

                                <h3 className="text-xl font-semibold text-heading mb-6">
                                    {section.title}
                                </h3>

                                <ul className="space-y-4">

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
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-12 pt-6 border-t border-borderColor flex flex-col sm:flex-row items-center justify-between gap-4">

                    <p className="text-sm text-paragraph text-center sm:text-left">
                        © 2026 RR SHOPER. All rights reserved.
                    </p>

                    <div className="flex items-center gap-5 flex-wrap justify-center">

                        <Link
                            to="/privacy-policy"
                            className={linkClass}
                        >
                            Privacy Policy
                        </Link>

                        <Link
                            to="/terms-and-conditions"
                            className={linkClass}
                        >
                            Terms & Conditions
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer