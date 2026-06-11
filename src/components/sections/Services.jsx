import React from 'react'
import SectionsUI from '../layouts/SectionsUI';
import dummyImg from '../../assets/images/dummyImg.jpg'


const Services = () => {

    const SERVICES = [
        {
            img: "https://api.rrshoper.in/assets/png_1781192791488.png",
            title: "Seller Account Setup",
            description:
                "Assistance with marketplace seller account registration, documentation verification, and onboarding support across major ecommerce platforms.",
        },
        {
            img: "https://api.rrshoper.in/assets/png_1781192787310.png",
            title: "Product Listing Management",
            description:
                "Product catalog creation, attribute management, image uploads, SKU organization, and listing support for marketplace compliance.",
        },
        {
            img: "https://api.rrshoper.in/assets/png_1781192783590.png",
            title: "Marketplace Compliance Support",
            description:
                "Assistance with marketplace policies, seller documentation, restricted category guidance, and account health management.",
        },
        {
            img: "https://api.rrshoper.in/assets/png_1781192775895.png",
            title: "Brand Registry Assistance",
            description:
                "Guidance for marketplace brand registry processes, trademark documentation, and seller authorization support.",
        },
        {
            img: "https://api.rrshoper.in/assets/png_1781192799977.png",
            title: "Brand Store Setup Assistance",
            description:
                "Assistance with marketplace brand store setup, catalog structuring, and seller profile configuration.",
        },
        {
            img: "https://api.rrshoper.in/assets/png_1781192779955.png",
            title: "Catalog Management",
            description:
                "Ongoing catalog maintenance, inventory updates, product information management, and listing organization support.",
        },
    ];

    const Content = () => {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5  md:gap-7 lg:gap-5">
                {SERVICES.map((service, index) => (
                    <div
                        key={index}
                        className="
                                group
                                relative
                                overflow-hidden
                                rounded-[24px]
                                md:rounded-[28px]
                                bg-white/80
                                backdrop-blur-md
                                border border-white/60
                                p-6
                                lg:p-7 
                                transition-all
                                duration-500
                                shadow-[0_8px_30px_rgba(176,106,141,0.08)]
                                hover:-translate-y-2
                                hover:shadow-[0_20px_50px_rgba(176,106,141,0.16)]
                            "
                    >

                        {/* Hover Glow */}
                        <div className="
                                absolute
                                inset-0
                                opacity-0
                                group-hover:opacity-100
                                transition-all
                                duration-500

                                bg-gradient-to-br
                                from-primary/5
                                via-transparent
                                to-secondary/10
                            "></div>

                        {/* img */}
                        <div
                            className="
                                    relative z-10

                                    w-14 h-14
                                    md:w-16 md:h-16

                                    rounded-2xl overflow-hidden

                                    flex
                                    items-center
                                    justify-center

                                    text-xl
                                    md:text-2xl

                                    bg-[#F8EEF3]
                                    text-primary

                                    transition-all
                                    duration-500

                                    group-hover:text-white
                                    group-hover:scale-110
                                "
                                    // group-hover:bg-primary
                        >
                            <img src={service.img || dummyImg} className='imgBlendColor' loading='lazy' />
                        </div>

                        {/* Title */}
                        <h3 className="
                                relative z-10

                                text-lg
                                sm:text-xl
                                md:text-2xl

                                font-bold
                                text-heading

                                my-3
                            ">
                            {service.title}
                        </h3>

                        {/* Description */}
                        <p className="
                                relative z-10

                                text-sm
                                sm:text-[15px]

                                text-paragraph
                                leading-relaxed
                            ">
                            {service.description}
                        </p>

                        {/* Bottom Accent */}
                        <div className="
                                relative z-10

                                w-12 h-1
                                rounded-full

                                bg-gradient-to-r
                                from-primary
                                to-secondary

                                mt-6

                                transition-all
                                duration-500

                                group-hover:w-24
                            "></div>

                    </div>
                ))}

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