import React, { useMemo } from 'react'
import PoliciesPointsUi from '../components/ui/PoliciesPointsUi';

const PrivacyPolicies = () => {

    const policiesPoints = useMemo(() => {
        return [
            {
                title: 'Information We Collect',
                subtitle: 'We may collect the following information',
                points: [
                    'Name, phone number, email address',
                    'Business details and GST information (if applicable)',
                    'Login credentials for e-commerce platforms (only when required for service)',
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
                    'E-commerce platforms (Meesho, Amazon, Flipkart, Jiomart, and etc.) for service purposes',
                    'Legal authorities if required by law'
                ]
            },
            {
                title: 'Data Retention',
                subtitle: 'We retain your information only',
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
                    'Changes will be updated on our official platforms',
                    'Continued use of services indicates acceptance of updates'
                ]
            },
            {
                title: 'Contact Information',
                subtitle: 'For any questions, contact us at:',
                points: [
                    'Email : sellersupport@rrshoper.in',
                    'Mobile No. : +91 95741 41000'
                ]
            }
        ];
    }, []);

    return (
        <div className="!bg-white">
            <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-10'>
                <div className='flex flex-col gap-4 mb-10'>
                    <h1 className='text-4xl font-bold'>Privacy Policy</h1>
                    <p>This Privacy Policy describes how RR Shoper collects, uses, and protects your information when you use our services.</p>
                </div>
                <div className="px-10 flex flex-col gap-10">
                    <PoliciesPointsUi policiesPoints={policiesPoints} />
                </div>
            </div>
        </div>
    )
}

export default PrivacyPolicies
