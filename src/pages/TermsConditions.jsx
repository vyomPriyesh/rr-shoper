import React, { useMemo } from 'react'
import PoliciesPointsUi from '../components/ui/PoliciesPointsUi';
import { userState } from '../context/UserContext';

const TermsConditions = () => {

    const { contactDetails } = userState();

    const policiesPoints = useMemo(() => {
        return [
            {
                title: 'Services',
                subtitle: 'We provide e-commerce support services including',
                points: [
                    'Account setup',
                    'Product listing',
                    'Marketing and advertising',
                    'Brand approval and creation',
                    'Catalog management'
                ]
            },
            {
                title: 'Client Responsibilities',
                subtitle: 'Clients are responsible for the following',
                points: [
                    'Provide accurate and complete information',
                    'Share required access credentials securely',
                    'Ensure compliance with platform policies (Meesho, Amazon, Flipkart, Jiomart, and more.)'
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
                subtitle: 'We do not guarantee sales, profits, or business growth.',
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
                    'Updated terms will be reflected on our official platforms',
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
            <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-10'>
                <div className='flex flex-col gap-4 mb-10'>
                    <h1 className='text-4xl font-bold'>Privacy Policy</h1>
                    <p>Welcome to RR Shoper. By using our services, you agree to the following terms :</p>
                </div>
                <div className="px-10 flex flex-col gap-10">
                    <PoliciesPointsUi policiesPoints={policiesPoints} />
                </div>
            </div>
        </div>
    )
}

export default TermsConditions
