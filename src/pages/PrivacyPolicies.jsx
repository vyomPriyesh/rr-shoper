import React, { useMemo } from 'react'
import PoliciesPointsUi from '../components/ui/PoliciesPointsUi';
import { userState } from '../context/UserContext';

const PrivacyPolicies = () => {

    const { contactDetails } = userState();

    const policiesPoints = useMemo(() => {
        return [
            {
                title: 'Information We Collect',
                subtitle: 'We may collect the following information',
                points: [
                    'Name, phone number, email address',
                    'Business details and GST information (if applicable)',
                    'Marketplace account information required for onboarding and support services',
                    'Payment and billing details'
                ]
            },
            {
                title: 'How We Use Your Information',
                subtitle: 'We use your information to',
                points: [
                    'Provide and manage our services',
                    'Create and manage your e-commerce accounts',
                    'Communicate regarding services, updates, and support',
                    'Improve our services and customer experience'
                ]
            },
            {
                title: 'Data Protection',
                subtitle: 'We are committed to ensuring that your information is secure. We implement appropriate security measures to protect your data from unauthorized access or disclosure.',
            },
            {
                title: 'Information Sharing',
                subtitle: 'We do not sell, trade, or rent your personal information. Data may only be shared with',
                points: [
                    'E-commerce marketplaces such as Amazon, Flipkart, Meesho, Ajio, and other supported platforms for service-related purposes',
                    'Legal authorities if required by law'
                ]
            },
            {
                title: 'Business Compliance',
                subtitle: 'We operate in compliance with applicable business and data protection regulations.',
                points: [
                    'Customer information is used only for providing requested services',
                    'We maintain reasonable security practices to protect user information',
                    'We do not sell or misuse customer data'
                ]
            },
            {
                title: 'Payment Security',
                subtitle: 'All payment-related information is processed securely through authorized payment service providers.',
                points: [
                    'We do not store sensitive card or banking information on our servers',
                    'Payments are handled through secure and compliant payment gateways'
                ]
            },
            {
                title: 'Third-Party Services',
                subtitle: 'Our services may involve integration with third-party platforms.',
                points: [
                    'Marketplace platforms may have their own privacy policies and terms',
                    'We are not responsible for third-party platform practices beyond our service scope'
                ]
            }
            ,
            {
                title: 'Data Retention',
                subtitle: 'We retain your information only for the following purposes',
                points: [
                    'As long as necessary to provide our services',
                    'To comply with legal and regulatory obligations'
                ]
            },
            {
                title: 'Your Rights',
                subtitle: 'You have the right to',
                points: [
                    'Request access to your data',
                    'Request correction of inaccurate information',
                    'Request deletion of your personal data'
                ]
            },
            {
                title: 'Changes to Policy',
                subtitle: 'We may update this Privacy Policy from time to time',
                points: [
                    'Changes will be updated on our official website',
                    'Continued use of services indicates acceptance of updates'
                ]
            },
            {
                title: 'Marketplace Disclaimer',
                subtitle: 'We provide independent marketplace support services.',
                points: [
                    'We are not affiliated with, endorsed by, or officially connected with Amazon, Flipkart, Meesho, Ajio, or any other marketplace',
                    'All trademarks and logos belong to their respective owners'
                ]
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
                    <h1 className='md:text-4xl text-2xl font-bold'>Privacy Policy</h1>
                    <p>This Privacy Policy applies to RR SHOPER and its marketplace support services.</p>
                </div>
                <div className="md:px-10 flex flex-col gap-10">
                    <PoliciesPointsUi policiesPoints={policiesPoints} />
                </div>
            </div>
        </div>
    )
}

export default PrivacyPolicies
