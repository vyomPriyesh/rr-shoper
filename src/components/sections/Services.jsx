import React from 'react';
import { motion } from 'framer-motion'; // 🌟 ADDED: Framer Motion import
import SectionsUI from '../layouts/SectionsUI';
import { FaRegUser } from 'react-icons/fa';
import { LuTag } from 'react-icons/lu';
import { RiShieldCheckLine } from 'react-icons/ri';
import { TbRegistered } from 'react-icons/tb';
import { BsCardList } from 'react-icons/bs';
import { AiOutlineShop } from 'react-icons/ai';

const Services = () => {

    const SERVICES = [
        {
            img: "https://api.rrshoper.in/assets/png_1787493286865.png",
            icon: FaRegUser,
            title: "Seller Account Setup",
            description:
                "Assistance with marketplace seller account registration, documentation verification, and onboarding support across major ecommerce platforms.",
        },
        {
            img: "https://api.rrshoper.in/assets/png_1787495862476.png",
            icon: LuTag,
            title: "Product Listing Management",
            description:
                "Product catalog creation, attribute management, image uploads, SKU organization, and listing support for marketplace compliance.",
        },
        {
            img: "https://api.rrshoper.in/assets/png_1787496107383.png",
            icon: RiShieldCheckLine,
            title: "Marketplace Compliance Support",
            description:
                "Assistance with marketplace policies, seller documentation, restricted category guidance, and account health management.",
        },
        {
            img: "https://api.rrshoper.in/assets/png_1787496246065.png",
            icon: TbRegistered,
            title: "Brand Registry Assistance",
            description:
                "Guidance for marketplace brand registry processes, trademark documentation, and seller authorization support.",
        },
        {
            img: "https://api.rrshoper.in/assets/png_1787497718968.png",
            icon: AiOutlineShop,
            title: "Brand Store Setup Assistance",
            description:
                "Assistance with marketplace brand store setup, catalog structuring, and seller profile configuration.",
        },
        {
            img: "https://api.rrshoper.in/assets/png_1787497796477.png",
            icon: BsCardList,
            title: "Catalog Management",
            description:
                "Ongoing catalog maintenance, inventory updates, product information management, and listing organization support.",
        },
    ];

    // 🌟 ADDED: Animation Variants for Staggered & Entrance Effects
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12, // Stagger cards sequentially
            },
        },
    };

    const cardVariants = {
        hidden: { 
            opacity: 0, 
            scaleY: 0, 
            transformOrigin: "center" 
        },
        visible: { 
            opacity: 1, 
            scaleY: 1, 
            transition: { 
                duration: 0.8, 
                ease: [0.16, 1, 0.3, 1] 
            } 
        },
    };

    const imgVariants = {
        hidden: { opacity: 0, y: -30 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { 
                duration: 0.6, 
                ease: [0.34, 1.56, 0.64, 1],
                delay: 0.2
            } 
        },
    };

    const contentVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { 
                duration: 0.6, 
                ease: "easeOut",
                delay: 0.3
            } 
        },
    };

    const Content = () => {
        return (
            // 🌟 UPDATED: Wrapper container triggers child animations upon scroll into view
            <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-7 lg:gap-10"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
            >
                {SERVICES.map((service, index) => {
                    const Icon = service?.icon;

                    return (
                        <motion.div 
                            key={index} 
                            variants={cardVariants} // 🌟 UPDATED: Curtain Reveal Motion
                            className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white p-1 shadow-sm transition-all duration-400 ease-out hover:-translate-y-1.5 hover:shadow-xl hover:border-blue-500/40"
                        >
                            <div className="relative overflow-hidden rounded-t-xl">
                                <motion.img
                                    variants={imgVariants} // 🌟 UPDATED: Image Drop-In Motion
                                    src={service.img}
                                    alt={service.title}
                                    className="aspect-[16/9] w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                            <motion.div 
                                variants={contentVariants} // 🌟 UPDATED: Content Float-Up Motion
                                className="flex flex-1 flex-col px-4 pb-6 pt-8 sm:pt-7 sm:px-5 sm:pb-6 relative"
                            >
                                <span className='2xl:h-14 2xl:w-14 md:h-11 md:w-11 h-12 w-12 aspect-square bg-white rounded-full absolute top-0 -translate-y-1/2 p-1 transition-transform duration-300 ease-out group-hover:-translate-y-[60%] group-hover:scale-110'>
                                    <span className='bg-primary text-white h-full w-full flex justify-center items-center rounded-full shadow-lg 2xl:text-2xl md:text-base text-lg'>
                                        <Icon />
                                    </span>
                                </span>
                                <h3 className="2xl:text-lg xl:text-base font-bold leading-tight text-gray-900">
                                    {service.title}
                                </h3>
                                <p className="mt-3 xl:text-xs 2xl:text-base text-sm leading-6 text-gray-600 sm:leading-7">
                                    {service.description}
                                </p>
                                <span className="mt-auto pt-5">
                                    <span className="block h-1 w-12 rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-400 ease-in-out group-hover:w-24" />
                                </span>
                            </motion.div>
                        </motion.div>
                    );
                })}
            </motion.div>
        )
    }

    return (
        <SectionsUI
            topic="Our Services"
            heading="Ecommerce Operations & Seller Support"
            text="We provide operational support services for ecommerce sellers including account setup, catalog management, product listing assistance, and marketplace compliance support."
            content={<Content />}
            id="services"
        />
    )
}

export default Services;
