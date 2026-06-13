import React, { useState } from 'react'
import {
    FaPhoneAlt,
    FaEnvelope,
    FaWhatsapp,
    FaMapMarkerAlt,
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaYoutube,
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

    return (
        <section className="pb-10 pt-6 px-4 lg:px-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

                {/* Left Content */}
                <div className="lg:pr-10">

                    <span className="text-primary font-semibold uppercase tracking-[4px] text-sm">
                        Contact Us
                    </span>

                    <h2 className="mt-4 text-2xl lg:text-4xl font-bold leading-tight text-heading">
                        Get Marketplace Assistance
                    </h2>

                    <p className="mt-4 text-paragraph text-lg leading-8 max-w-xl">
                        Contact us for seller account setup, marketplace onboarding, product listing, and support services. Our team will respond within 24 hours.
                    </p>

                    {/* Contact Info */}
                    <div className="mt-8 space-y-8">

                        {/* Phone */}
                        <div className="flex items-start gap-5">
                            <div className="md:w-14 md:h-14 w-12 h-12 text-2xl rounded-xl bg-white flex items-center justify-center text-primary shadow-md">
                                <FaPhoneAlt />
                            </div>

                            <div>
                                <h4 className="text-base md:text-lg font-semibold text-heading">
                                    Phone
                                </h4>

                                <p className=" text-paragraph text-sm md:text-base">
                                    {contactDetails?.mobile}
                                </p>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="flex items-start gap-5">
                            <div className="md:w-14 md:h-14 w-12 h-12 text-2xl rounded-xl bg-white flex items-center justify-center text-primary shadow-md">
                                <FaEnvelope />
                            </div>

                            <div>
                                <h4 className="text-base md:text-lg font-semibold text-heading">
                                    Email
                                </h4>

                                <p className=" text-paragraph text-sm md:text-base">
                                    {contactDetails?.email}
                                </p>
                            </div>
                        </div>

                        {/* WhatsApp */}
                        <div className="flex items-start gap-5">
                            <div className="md:w-14 md:h-14 w-12 h-12 text-2xl rounded-xl bg-white flex items-center justify-center text-primary shadow-md">
                                <FaWhatsapp />
                            </div>

                            <div>
                                <h4 className="text-base md:text-lg font-semibold text-heading">
                                    WhatsApp
                                </h4>

                                <p className=" text-paragraph text-sm md:text-base">
                                    {contactDetails?.mobile}
                                </p>
                            </div>
                        </div>
                        {/* Business Hours */}
                        <div className="flex items-start gap-5">
                            <div className="md:w-14 md:h-14 w-12 h-12 text-2xl rounded-xl bg-white flex items-center justify-center text-primary shadow-md">
                                <FaRegClock />
                            </div>

                            <div>
                                <h4 className="text-base md:text-lg font-semibold text-heading">
                                    Business Hours
                                </h4>

                                <p className=" text-paragraph text-sm md:text-base leading-7">
                                    Mon – Sat: 9:00 AM – 6:00 PM
                                </p>
                            </div>
                        </div>
                        {/* Address */}
                        <div className="flex items-start gap-5">
                            <div className="md:w-14 md:h-14 w-12 h-12 text-2xl rounded-xl bg-white flex items-center justify-center text-primary shadow-md">
                                <FaMapMarkerAlt />
                            </div>

                            <div>
                                <h4 className="text-base md:text-lg font-semibold text-heading">
                                    Address
                                </h4>

                                <p className=" text-paragraph text-sm md:text-base leading-7">
                                    123 Business Park, Sector 45
                                    <br />
                                    Surat, Gujarat 395006
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Form */}
                <div className="bg-white rounded-[32px] p-6 lg:p-6 shadow-[0_10px_40px_rgba(176,106,141,0.08)] border border-borderColor">

                    <h3 className="text-3xl font-bold text-heading">
                        Send Us a Message
                    </h3>

                    <p className="mt-3 text-paragraph leading-7">
                        Fill out the form below and we'll get back to you shortly.
                    </p>

                    <form className="mt-8 space-y-4">

                        {/* Name + Phone */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

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
            w-full h-14 rounded-2xl
            bg-gradient-to-r from-primaryDark to-primary
            text-white font-semibold text-lg
            flex items-center justify-center gap-3
            transition-all duration-300
            hover:scale-[1.01]
            hover:shadow-xl
            shadow-[0_10px_30px_rgba(176,106,141,0.25)]
        "
                        >
                            <FaPaperPlane />
                            Contact Support
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default ContactSection