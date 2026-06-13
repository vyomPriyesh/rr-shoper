import React, { useMemo } from 'react'
import PoliciesPointsUi from '../components/ui/PoliciesPointsUi';
import { userState } from '../context/UserContext';

const RefundCancellationPolicies = () => {

    const { contactDetails } = userState();

    const policiesPoints = useMemo(() => {
        return [
            {
                title: 'Refund & Cancellation Policy',
                subtitle: 'RR SHOPER provides digital marketplace support services. Refund eligibility is subject to the conditions below.',
                points: [
                    'Payments made for completed, ongoing, or partially completed services are non-refundable',
                    'Once service work, onboarding, account setup, listing, or catalog processing has started, refunds will not be applicable',
                    'Customers are advised to review service details carefully before making payment',
                    'RR SHOPER reserves the right to refuse refund requests for completed digital or service-based work'
                ]
            },
            {
                title: 'Cancellation Policy',
                subtitle: 'Cancellation requests are subject to service status and work progress.',
                points: [
                    'Cancellation requests may only be considered before service processing begins',
                    'Once work has been initiated, cancellation requests will not be accepted',
                    'Any approved cancellation will be subject to management review and service status'
                ]
            },
            {
                title: 'Service Commitment',
                subtitle: 'We are committed to providing services according to the selected package and agreed scope of work.',
                points: [
                    'Services will be provided according to the selected package',
                    'Marketplace approvals, account performance, and sales outcomes are not guaranteed',
                    'Results may vary depending on marketplace policies, product quality, pricing, and competition'
                ]
            },
            {
                title: 'Third-Party Platforms',
                subtitle: 'Our services may involve third-party marketplace platforms.',
                points: [
                    'We are not responsible for marketplace policy changes',
                    'We are not responsible for account suspension or penalties imposed by platforms',
                    'Technical issues or delays caused by third-party platforms are beyond our control'
                ]
            },
            {
                title: 'Marketplace Disclaimer',
                subtitle: 'We provide independent marketplace support services.',
                points: [
                    'We are not affiliated with, endorsed by, or officially connected with Amazon, Flipkart, Meesho, Ajio, Myntra, Jiomart, or any other marketplace',
                    'All trademarks, logos, and brand names belong to their respective owners'
                ]
            },
            {
                title: 'Payment Security',
                subtitle: 'Payments are processed securely through authorized payment gateways.',
                points: [
                    'We do not store sensitive banking or card information on our servers',
                    'Transactions are handled securely through trusted payment partners'
                ]
            },
            {
                title: 'Policy Updates',
                subtitle: 'We may update this Refund & Cancellation Policy from time to time.',
                points: [
                    'Updated policies will be published on our official website',
                    'Continued use of our services indicates acceptance of the updated policy'
                ]
            },
            {
                title: 'Contact Information',
                subtitle: 'For any questions regarding this policy, contact us at:',
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
                    <h1 className='md:text-4xl text-2xl font-bold'>Refund & Cancellation Policy</h1>
                </div>
                <div className="md:px-10 flex flex-col gap-10">
                    <PoliciesPointsUi policiesPoints={policiesPoints} />
                </div>
            </div>
        </div>
    )
}

export default RefundCancellationPolicies
