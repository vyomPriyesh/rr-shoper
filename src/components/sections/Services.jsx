import React from 'react'

const Services = () => {

    const SERVICES = [
        {
            icon: "fas fa-user-plus",
            title: "Account Opening",
            description:
                "Complete seller account setup on Amazon, Flipkart, Meesho, Ajio, and more. We handle documentation, verification, and ensure fast approval.",
        },
        {
            icon: "fas fa-list-check",
            title: "Product Listing & Optimization",
            description:
                "Professional product listings with SEO-optimized titles, descriptions, keywords, and high-quality images that convert browsers into buyers.",
        },
        {
            icon: "fas fa-bullhorn",
            title: "Marketing & Advertising",
            description:
                "Strategic PPC campaigns, sponsored ads management, and promotional strategies to boost visibility and drive targeted traffic to your listings.",
        },
        {
            icon: "fas fa-certificate",
            title: "Brand Approval",
            description:
                "Navigate the brand approval process seamlessly. We help you get brand registry and authorization to sell restricted categories.",
        },
        {
            icon: "fas fa-trademark",
            title: "Brand Creation & Registration",
            description:
                "Build your brand from scratch — logo design, brand identity, trademark registration, and brand store creation on marketplaces.",
        },
        {
            icon: "fas fa-boxes-stacked",
            title: "Catalog Management",
            description:
                "Ongoing catalog maintenance, inventory updates, pricing optimization, and A+ content creation to keep your listings competitive.",
        },
    ];

    return (
        <section className="py-14 md:pt-20">

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                {/* Heading */}
                <div className="max-w-3xl mx-auto mb-12 md:mb-14 text-center">

                    <h2 className="
                        text-sm
                        sm:text-base
                        md:text-lg
                        font-semibold
                        text-[#B06A8D]
                        mb-3
                        tracking-[3px]
                        uppercase
                    ">
                        Our Services
                    </h2>

                    <h1 className="
                        text-3xl
                        md:text-4xl
                        font-bold
                        text-[#1E1E1E]
                        leading-tight
                        mb-5
                    ">
                        End-to-End Marketplace Solutions
                    </h1>

                    <p className="
                        text-sm
                        sm:text-base
                        md:text-lg
                        text-[#5F6673]
                        leading-relaxed
                        max-w-2xl
                        mx-auto
                    ">
                        From account setup to scaling your sales, we provide comprehensive
                        services to help your brand succeed on every major e-commerce platform.
                    </p>

                </div>

                {/* Cards */}
                <div className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    xl:grid-cols-3
                    gap-5
                    md:gap-7
                    lg:gap-5
                ">

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
                                from-[#B06A8D]/5
                                via-transparent
                                to-[#C89AB5]/10
                            "></div>

                            {/* Icon */}
                            <div
                                className="
                                    relative z-10

                                    w-14 h-14
                                    md:w-16 md:h-16

                                    rounded-2xl

                                    flex
                                    items-center
                                    justify-center

                                    text-xl
                                    md:text-2xl

                                    bg-[#F8EEF3]
                                    text-[#B06A8D]

                                    transition-all
                                    duration-500

                                    group-hover:bg-[#B06A8D]
                                    group-hover:text-white
                                    group-hover:scale-110
                                "
                            >
                                <i className={service.icon}></i>
                            </div>

                            {/* Title */}
                            <h3 className="
                                relative z-10

                                text-lg
                                sm:text-xl
                                md:text-2xl

                                font-bold
                                text-[#1E1E1E]

                                my-3
                            ">
                                {service.title}
                            </h3>

                            {/* Description */}
                            <p className="
                                relative z-10

                                text-sm
                                sm:text-[15px]

                                text-[#5F6673]
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
                                from-[#B06A8D]
                                to-[#C89AB5]

                                mt-6

                                transition-all
                                duration-500

                                group-hover:w-24
                            "></div>

                        </div>
                    ))}

                </div>

            </div>

        </section>
    )
}

export default Services