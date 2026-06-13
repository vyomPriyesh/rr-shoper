import React, { useMemo } from 'react'
import PoliciesPointsUi from '../components/ui/PoliciesPointsUi';
import { userState } from '../context/UserContext';

const TermsConditions = () => {

    const { contactDetails } = userState();

    const policiesPoints = useMemo(() => {
        return [
            {
                title: 'Services',
                subtitle: 'We provide marketplace support services including',
                points: [
                    'Seller account setup',
                    'Product listing',
                    'Catalog management',
                    'Marketplace assistance',
                    'Seller support services'
                ]
            },
            {
                title: 'Client Responsibilities',
                subtitle: 'Clients are responsible for the following',
                points: [
                    'Provide accurate and complete information',
                    'Provide required marketplace account information for service purposes',
                    'Ensure compliance with marketplace platform policies and applicable regulations'
                ]
            },
            {
                title: 'Marketplace Disclaimer',
                subtitle: 'We provide independent marketplace support services.',
                points: [
                    'We are not affiliated with, endorsed by, or officially connected with Amazon, Flipkart, Meesho, Ajio, Myntra, or any other marketplace',
                    'All trademarks, logos, and brand names belong to their respective owners'
                ]
            },
            {
                title: 'Payment Terms',
                subtitle: 'Payments for services are subject to the following conditions.',
                points: [
                    'Payments are processed securely through authorized payment gateways',
                    'All invoices and service charges must be paid as agreed',
                    'Refund requests are handled according to our Refund & Cancellation Policy.'
                ]
            },
            {
                title: 'Data & Security',
                subtitle: 'We implement reasonable measures to protect customer information.',
                points: [
                    'Customer data is used only for service-related purposes',
                    'We do not sell or misuse customer information',
                    'Sensitive payment details are not stored on our servers'
                ]
            },
            {
                title: 'Service Fees',
                subtitle: 'Service charges and payments are governed by the selected package.',
                points: [
                    'Fees depend on selected service packages',
                    'Payments must be made in advance unless agreed otherwise',
                    'Additional services may incur extra charges'
                ]
            },
            {
                title: 'No Guarantee of Sales',
                subtitle: 'We do not guarantee marketplace approval, sales performance, or business outcomes.',
                points: [
                    'Results depend on market conditions',
                    'Product quality, pricing, and competition affect performance',
                    'Approval and success on marketplaces are not guaranteed'
                ]
            },
            {
                title: 'Third-Party Platforms',
                subtitle: 'We are not responsible for issues caused by third-party platforms.',
                points: [
                    'Policy changes by platforms',
                    'Account suspension or penalties by platforms',
                    'Technical issues on third-party platforms'
                ]
            },
            {
                title: 'Limitation of Liability',
                subtitle: 'We are not liable for losses arising from the use of our services.',
                points: [
                    'Direct losses',
                    'Indirect losses',
                    'Business or financial damages related to platform decisions'
                ]
            },
            {
                title: 'Termination',
                subtitle: 'We reserve the right to suspend or terminate services if',
                points: [
                    'Terms are violated',
                    'Payments are not made',
                    'Misuse of services occurs'
                ]
            },
            {
                title: 'Changes to Terms',
                subtitle: 'We may update these terms from time to time.',
                points: [
                    'Updated terms will be published on our official website',
                    'Continued use of services means acceptance of updated terms'
                ]
            },
            {
                title: 'Governing Law',
                subtitle: 'These terms are governed by the laws of India.',
            },
            {
                title: 'Contact Information',
                subtitle: 'For any questions, contact us at:',
                points: [
                    ...(contactDetails?.email
                        ? [`Email : ${contactDetails.email}`]
                        : []),

                    ...(contactDetails?.mobile
                        ? [`Mobile No. : ${contactDetails.mobile}`]
                        : [])
                ]
            }
        ];
    }, []);

    return (
        <div className="!bg-white">
            <div className='container mx-auto px-2 sm:px-6 lg:px-8 py-10'>
                <div className='flex flex-col gap-4 mb-10'>
                    <span className='text-sm md:text-base'>Effective Date: 01 June 2026</span>
                    <h1 className='md:text-4xl text-2xl font-bold'>Terms & Conditions</h1>
                    <p>These Terms & Conditions apply to RR SHOPER and its marketplace support services.</p>
                </div>
                <div className="md:px-10 flex flex-col gap-10">
                    <PoliciesPointsUi policiesPoints={policiesPoints} />
                </div>
            </div>
        </div>
    )
}

export default TermsConditions
