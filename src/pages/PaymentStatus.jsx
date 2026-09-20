import React, { useCallback, useEffect, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { userState } from '../context/UserContext'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import api from '../config/api'
import apiList from '../config/apiList'
import { Result, Skeleton } from 'antd'
import { socket } from '../config/socket'

const PaymentStatus = () => {

    const { payments } = apiList()
    const { user, options } = userState()
    const { id } = useParams()
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const { data, isFetching } = useQuery({
        queryKey: ['payment-status', id],
        queryFn: () => api.get(payments.status(id)),
        enabled: !!user && !!id,
        select: ({ data }) => data?.data?.result
    })

    useEffect(() => {
        if (isFetching) return

        queryClient.invalidateQueries({
            queryKey: ['profile', user?.token],
        })
    }, [isFetching, queryClient, user?.token])

    const packageData = useMemo(() => {
        if (!data) return {}

        return user?.package?.find(
            list => list?.package_id?._id == data?.package_id
        )?.package_id
    }, [data, user])

    const packageOrder = useMemo(() => {
        return options?.packageOrders || []
    }, [options?.packageOrders])

    const findPackageName = useCallback((name) => {
        return (
            packageOrder.find(
                item => item.value == name
            )?.label || name
        )
    }, [packageOrder])

    useEffect(() => {
        if (isFetching || !data || !packageData) return

        const timer = setTimeout(() => {
            navigate('/')
        }, 5000)

        return () => clearTimeout(timer)
    }, [isFetching, data, packageData, navigate])

    if (isFetching || !packageData) {
        return (
            <div className="bg-white flex justify-center items-center min-h-80">
                <div className="w-full max-w-3xl flex flex-col items-center px-6">
                    <Skeleton.Avatar active size={150} shape="circle" />
                    <Skeleton.Input active size="large" className="!w-80 mt-8" />
                    <Skeleton.Input active size="small" className="!w-full max-w-2xl mt-5" />
                </div>
            </div>
        )
    }

    const paymentStatus = data?.payment_status
    return (
        <div className="bg-white flex justify-center items-center min-h-80">
            <Result
                status={
                    paymentStatus === 'COMPLETED'
                        ? 'success'
                        : paymentStatus === 'FAILED'
                            ? 'error'
                            : '404'
                }
                title={
                    <span className="text-2xl md:text-3xl font-semibold">
                        {paymentStatus === 'COMPLETED'
                            ? `Successfully Purchased ${packageData?.platform?.name
                                ?.charAt(0)
                                .toUpperCase() +
                            packageData?.platform?.name
                                ?.slice(1)
                                .toLowerCase()
                            } ${findPackageName(packageData?.name)} Package`
                            : paymentStatus === 'FAILED'
                                ? 'Payment Failed'
                                : 'Payment Processing'}
                    </span>
                }
                subTitle={
                    <span className="text-base md:text-lg">
                        {paymentStatus === 'COMPLETED'
                            ? `Order ID: ${id} • Your package has been purchased successfully. Our team will start processing your services shortly.`
                            : paymentStatus === 'FAILED'
                                ? `Order ID: ${id} • Your payment could not be completed. Please try again or contact our support team.`
                                : `Order ID: ${id} • Your payment is being processed. Please wait for confirmation.`}
                    </span>
                }
            />
        </div>
    )
}

export default PaymentStatus