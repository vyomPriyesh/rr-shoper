import React, { useMemo } from 'react'
import PoliciesPointsUi from '../components/ui/PoliciesPointsUi';
import { userState } from '../context/UserContext';

const RefundCancellationPolicies = () => {

    const { contactDetails } = userState();

    const policiesPoints = useMemo(() => {
        return [
            {
                title: 'No Refund Policy',
                subtitle: 'All payments made to RR Shoper are non-refundable under any circumstances.',
                points: [
                    'Once a service is purchased and payment is completed, no refunds will be issued',
                    'Refund requests will not be accepted after successful payment'
                ]
            },
            {
                title: 'Service Commitment',
                subtitle: 'We commit to delivering the agreed services as per the selected package.',
                points: [
                    'Services will be provided according to the purchased plan',
                    'Results such as sales, traffic, approvals, or business growth are not guaranteed'
                ]
            },
            {
                title: 'Cancellation Policy',
                subtitle: 'Clients may request cancellation only under limited conditions.',
                points: [
                    'Cancellation requests may be accepted before work begins',
                    'Once the service has started, cancellation requests will not be accepted'
                ]
            },
            {
                title: 'Partial Services',
                subtitle: 'If a client chooses to discontinue services midway.',
                points: [
                    'No refunds will be provided',
                    'Any pending or remaining work will be stopped'
                ]
            },
            {
                title: 'Non-Payment',
                subtitle: 'Failure to complete payments may result in the following actions.',
                points: [
                    'Suspension of ongoing services',
                    'Termination of services without prior notice'
                ]
            },
            {
                title: 'Agreement',
                subtitle: 'By purchasing our services, you agree to this Refund & Cancellation Policy.',
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
                    <h1 className='text-4xl font-bold'>Refund & Cancellation Policy</h1>
                </div>
                <div className="px-10 flex flex-col gap-10">
                    <PoliciesPointsUi policiesPoints={policiesPoints} />
                </div>
            </div>
        </div>
    )
}

export default RefundCancellationPolicies
