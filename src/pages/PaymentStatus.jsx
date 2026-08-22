import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { userState } from '../context/UserContext';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../config/api';
import apiList from '../config/apiList';

const PaymentStatus = () => {

    const { payments } = apiList();
    const { user } = userState();

    const { id } = useParams();

    const { data, isFetching } = useQuery({
        queryKey: ['payment-status', id],
        queryFn: () => api.get(payments.status(id)),
        enabled: !!user && !!id
    })

    const queryClient = useQueryClient();

    // useEffect(() => {
    //     if (isFetching) return
    //     queryClient.invalidateQueries({
    //         queryKey: ["profile", user?.token],
    //     });
    // }, [isFetching, isFetching])

    return (
        <div>

        </div>
    )
}

export default PaymentStatus
