import React from 'react'
import { useParams } from 'react-router-dom'
import { userState } from '../context/UserContext';
import { useQuery } from '@tanstack/react-query';
import api from '../config/api';
import apiList from '../config/apiList';

const PaymentStatus = () => {

    const { payments } = apiList();
    const { user } = userState();

    const { id } = useParams();

    const { } = useQuery({
        queryKey: ['payment-status', id],
        queryFn: () => api.get(payments.status(id)),
        enabled: !!user && !!id
    })



    return (
        <div>

        </div>
    )
}

export default PaymentStatus
