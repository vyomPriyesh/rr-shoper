import React, { useState, useRef } from 'react'
import SectionsUI from '../layouts/SectionsUI'
import { IoIosArrowUp } from 'react-icons/io'

const FAQItem = ({ id, question, answer }) => {
    
    const [open, setOpen] = useState({})
    const answerRef = useRef(null)

    const handleToggle = () => {
        setOpen(prev => ({
            ...prev?.Object?.keys(prev).reduce((acc, key) => {
                acc[key] = false
                return acc
            }, {}),
            [id]: !prev[id],
        }))
    }

    return (
        <div key={id}
            className={`bg-white rounded-3xl overflow-hidden border transition-all duration-300 hover:shadow-xl ${
                open[id]
                    ? 'border-primary shadow-[0_10px_35px_rgba(176,106,141,0.12)]'
                    : 'border-borderColor'
            }`}
        >
            <button
                onClick={handleToggle}
                className="w-full flex items-center justify-between text-left px-5 sm:px-6 py-5 transition-all duration-300"
            >
                <span
                    className={`text-base sm:text-lg font-semibold leading-7 transition-all duration-300 pr-4 ${
                        open[id]
                            ? 'text-primaryDark'
                            : 'text-heading'
                    }`}
                >
                    {question}
                </span>

                <div
                    className={`w-10 h-10  rounded-full flex-shrink-0 flex items-center justify-center text-2xl font-light transition-all duration-300 ${
                        open[id]
                            ? 'rotate-180 text-primary'
                            : ''
                    }`}
                >
                   <IoIosArrowUp />
                </div>
            </button>

            <div
                ref={answerRef}
                className="overflow-hidden transition-all duration-500 ease-in-out"
                style={{
                    maxHeight: open[id]
                        ? `${answerRef.current?.scrollHeight}px`
                        : '0px',
                }}
            >
                <div className="px-5 sm:px-6 pb-6">
                    <div className="w-full h-[1px] mb-4 bg-borderColor" />

                    <p className="leading-7 text-sm sm:text-base text-paragraph">
                        {answer}
                    </p>
                </div>
            </div>
        </div>
    )
}

const Faqs = () => {
    const faqs = [
    {
        id: 1,
        question: 'What marketplace management services do you provide?',
        answer:
            'We provide end-to-end seller operations, including marketplace account setup, brand registry assistance, catalog creation, keyword-optimized listings, policy compliance, and daily account maintenance.',
    },
    {
        id: 2,
        question: 'Which e-commerce platforms do you support?',
        answer:
            'We support all major Indian marketplaces: Amazon, Flipkart, Meesho, Myntra, Ajio, Snapdeal, and JioMart.',
    },
    {
        id: 3,
        question: 'How long does the onboarding and account setup take?',
        answer:
            'Initial seller account setup and onboarding usually take 3 to 7 business days, depending on document verification and your total catalog size.',
    },
    {
        id: 4,
        question: 'What is included in your Starter and Hot pricing plans?',
        answer:
            'Our Starter Plan (₹1,999/mo) includes new account creation, keyword optimization, brand registration assistance, and setup for up to 50 SKUs. Our Hot Plan (₹6,999/mo) includes listing management for up to 100 products, order keyword optimization, and dedicated seller support.',
    },
    {
        id: 5,
        question: 'Do you provide ongoing support after account setup?',
        answer:
            'Yes, we provide 24/7 seller support, ongoing catalog management, account health monitoring, and resolution of marketplace compliance issues.',
    },
    {
        id: 6,
        question: 'Can I request custom plans for multiple marketplaces?',
        answer:
            'Absolutely. We can create customized packages based on your total inventory count, number of marketplace accounts, and specific business goals.',
    },
];


    const Content = () => {
        return (
            <div className="space-y-6 max-w-[800px] mx-auto">
                {faqs.map((faq, index) => (
                    <FAQItem  key={faq.id} {...faq} />
                ))}
            </div>
        )
    }

    return (
            <SectionsUI
                topic="FAQ"
                heading="Frequently Asked Questions"
                text="Got questions? We've got answers."
                content={<Content />}
            />
    )
}

export default Faqs
