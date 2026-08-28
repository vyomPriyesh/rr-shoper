import React, { useState } from 'react'
import {
    FaPhoneAlt,
    FaEnvelope,
    FaWhatsapp,
    FaMapMarkerAlt,
    FaPaperPlane,
    FaRegClock,
} from 'react-icons/fa'
import InputField from '../ui/InputField'
import { userState } from '../../context/UserContext'

const ContactSection = () => {

    const { contactDetails } = userState();

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        businessType: '',
        services: [],
        message: '',
    })


    const contactInfo = [
        { title: "Phone", value: contactDetails?.mobile, icon: <FaPhoneAlt />, },
        { title: "Email", value: contactDetails?.email, icon: <FaEnvelope />, },
        { title: "WhatsApp", value: contactDetails?.mobile, icon: <FaWhatsapp />, },
        { title: "Business Hours", value: "Mon – Sat: 9:00 AM – 6:00 PM", icon: <FaRegClock />, },
        { title: "Office Address", value: (<> Amiras hotel pase, Time Shoppers, 216, Varachha Main Rd, Bhagavan Nagar, Sarthana Jakat Naka, Sarthi Society, <br /> Nana Varachha, Surat, Gujarat 395006 </>), icon: <FaMapMarkerAlt />, }
    ]

    

    return (
        <div className="px-4 pt-6 pb-10 sm:px-6 lg:px-8">
            <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">

                {/* Left Content */}
                <div className="lg:pr-10">

                    {/* Section Label */}
                    <span className="text-xs font-semibold uppercase tracking-[2px] text-primary sm:text-sm sm:tracking-[4px]">
                        Contact Us
                    </span>

                    {/* Main Heading */}
                    <h2 className="mt-2 text-2xl font-bold leading-tight text-heading sm:text-3xl lg:text-4xl">
                        Get Marketplace Assistance
                    </h2>

                    {/* Description */}
                    <p className="mt-3 max-w-xl text-sm leading-6 text-paragraph sm:text-base sm:leading-7 lg:text-lg lg:leading-8">
                        Contact us for seller account setup, marketplace onboarding,
                        product listing, and support services. Our team will respond
                        within 24 hours.
                    </p>

                    {/* Contact Info */}
                    <div className="mt-8 space-y-7 sm:space-y-8">
                        {contactInfo.map((item, index) => (
                            <div key={index} className="flex items-start gap-4 sm:gap-5" >
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-xl text-primary shadow-md sm:h-12 sm:w-12 sm:text-2xl lg:h-14 lg:w-14">
                                    {item.icon}
                                </div>
                                <div className="min-w-0">
                                    <h4 className="text-base font-semibold text-heading sm:text-lg lg:text-xl">
                                        {item.title}
                                    </h4>
                                    <p className="mt-1 break-words text-sm leading-6 text-paragraph sm:text-base sm:leading-7"> {item.value} </p>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>

                {/* Right Form */}
                <section className="rounded-[24px] border border-borderColor bg-white p-5 shadow-[0_10px_40px_rgba(176,106,141,0.08)] sm:rounded-[32px] sm:p-6 lg:p-8">

                    {/* Form Heading */}
                    <h3 className="text-2xl font-bold leading-tight text-heading sm:text-3xl lg:text-4xl">
                        Send Us a Message
                    </h3>

                    {/* Form Description */}
                    <p className="mt-3 text-sm leading-6 text-paragraph sm:text-base sm:leading-7 lg:text-lg">
                        Fill out the form below and we'll get back to you shortly.
                    </p>

                    <form className="mt-6 space-y-4 sm:mt-8">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                            <InputField
                                label="Full Name"
                                type="text"
                                placeholder="Your name"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        name: e.target.value,
                                    })
                                }
                            />

                            <InputField
                                label="Phone Number"
                                type="number"
                                placeholder="+91 XXXXX XXXXX"
                                value={formData.phone}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        phone: e.target.value,
                                    })
                                }
                            />
                        </div>

                        {/* Email */}
                        <InputField
                            label="Email Address"
                            type="email"
                            placeholder="your@email.com"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    email: e.target.value,
                                })
                            }
                        />

                        {/* Single Select */}
                        {/* <InputField
                            label="Business Type"
                            type="drop-single-select"
                            placeholder="Select business type"
                            value={formData.businessType}
                            onChange={(value) =>
                                setFormData({
                                    ...formData,
                                    businessType: value,
                                })
                            }
                            options={[
                                {
                                    label: 'Manufacturer',
                                    value: 'manufacturer',
                                },
                                {
                                    label: 'Wholesaler',
                                    value: 'wholesaler',
                                },
                                {
                                    label: 'Retailer',
                                    value: 'retailer',
                                },
                            ]}
                        /> */}

                        {/* Multi Select */}
                        {/* <InputField
                            label="Services Interested In"
                            type="drop-multi-select"
                            placeholder="Select services"
                            value={formData.services}
                            onChange={(value) =>
                                setFormData({
                                    ...formData,
                                    services: value,
                                })
                            }
                            options={[
                                {
                                    label: 'Amazon Management',
                                    value: 'amazon',
                                },
                                {
                                    label: 'Flipkart Management',
                                    value: 'flipkart',
                                },
                                {
                                    label: 'Website Development',
                                    value: 'website',
                                },
                                {
                                    label: 'SEO Optimization',
                                    value: 'seo',
                                },
                            ]}
                        /> */}

                        {/* Message */}
                        <InputField
                            label="Your Message"
                            type="textarea"
                            placeholder="Tell us about your requirements..."
                            value={formData.message}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    message: e.target.value,
                                })
                            }
                        />

                        {/* Submit */}
                        <button
                            type="submit"
                            className="
                                flex h-12 w-full items-center justify-center gap-3
                                rounded-2xl
                                bg-gradient-to-r from-primaryDark to-primary
                                text-base font-semibold text-white
                                shadow-[0_10px_30px_rgba(176,106,141,0.25)]
                                transition-all duration-300
                                hover:scale-[1.01]
                                hover:shadow-xl
                                sm:h-14 sm:text-lg
                            "
                        >
                            <FaPaperPlane className="text-sm sm:text-base" />
                            Contact Support
                        </button>
                    </form>
                </section>
            </div>
        </div>
    )
}

export default ContactSection