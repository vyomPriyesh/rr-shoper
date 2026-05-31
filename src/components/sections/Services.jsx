import React from 'react'
import SectionsUI from '../layouts/SectionsUI';
import dummyImg from '../../assets/images/dummyImg.jpg'


const Services = () => {

    const SERVICES = [
        {
            img: "",
            title: "Account Opening",
            description:
                "Complete seller account setup on Amazon, Flipkart, Meesho, Ajio, and more. We handle documentation, verification, and ensure fast approval.",
        },
        {
            img: "",
            title: "Product Listing & Optimization",
            description:
                "Professional product listings with SEO-optimized titles, descriptions, keywords, and high-quality images that convert browsers into buyers.",
        },
        {
            img: "",
            title: "Marketing & Advertising",
            description:
                "Strategic PPC campaigns, sponsored ads management, and promotional strategies to boost visibility and drive targeted traffic to your listings.",
        },
        {
            img: "",
            title: "Brand Approval",
            description:
                "Navigate the brand approval process seamlessly. We help you get brand registry and authorization to sell restricted categories.",
        },
        {
            img: "",
            title: "Brand Creation & Registration",
            description:
                "Build your brand from scratch — logo design, brand identity, trademark registration, and brand store creation on marketplaces.",
        },
        {
            img: "",
            title: "Catalog Management",
            description:
                "Ongoing catalog maintenance, inventory updates, pricing optimization, and A+ content creation to keep your listings competitive.",
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

                                    group-hover:bg-primary
                                    group-hover:text-white
                                    group-hover:scale-110
                                "
                        >
                            <img src={service.img || dummyImg} />
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
            heading="End-to-End Marketplace Solutions"
            text="From account setup to scaling your sales, we provide comprehensive services to help your brand succeed on every major e-commerce platform."
            content={<Content />}
            id="services"
        />
    )
}

export default Services