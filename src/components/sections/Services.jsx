import React from 'react'
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

    const Content = () => {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-7 lg:gap-10">
                {SERVICES.map((service, index) => {
                    const Icon = service?.icon;
                    return (
                        <div key={index} className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white p-1 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                            <div className="relative overflow-hidden rounded-t-xl">
                                <img
                                    src={service.img}
                                    alt="Seller Account Setup"
                                    className="aspect-[16/9] w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                            <div className="flex flex-1 flex-col px-4 pb-6 pt-8 sm:pt-7 sm:px-5 sm:pb-6 relative">
                                <span className='h-14 w-14 aspect-square bg-white rounded-full absolute top-0 -translate-y-1/2 p-1'>
                                    <span className='bg-primary text-white h-full w-full flex justify-center items-center rounded-full shadow-lg text-2xl'>
                                        <Icon />
                                    </span>
                                </span>
                                <h3 className="text-lg font-bold leading-tight text-gray-900 sm:text-xl">
                                    {service.title}
                                </h3>
                                <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-base sm:leading-7">
                                    {service.description}
                                </p>
                                <span className="mt-auto pt-5">
                                    <span className="block h-1 w-12 rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-300 group-hover:w-16" />
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
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

export default Services