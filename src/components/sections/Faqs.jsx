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
            question: 'What services do you provide?',
            answer:
                'We provide web development, mobile app development, UI/UX design, and cloud deployment services.',
        },
        {
            id: 2,
            question: 'How long does a project take?',
            answer:
                'Project timelines depend on complexity, but most projects are completed within 2–8 weeks.',
        },
        {
            id: 3,
            question: 'Do you provide support after delivery?',
            answer:
                'Yes, we provide post-launch support and maintenance packages for all projects.',
        },
        {
            id: 4,
            question: 'Can I request custom features?',
            answer:
                'Absolutely. We build fully customized solutions based on your requirements.',
        },
    ]

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