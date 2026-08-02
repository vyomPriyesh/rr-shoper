import React, { useMemo } from 'react'
import PageTitleAddbtn from '../../ui/PageTitleAddbtn'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';
import { userState } from '../../../context/UserContext';
import { useToast } from '../../../context/ToastContext';
import apiList from '../../../config/apiList';
import api from '../../../config/api';

const ViewTicket = () => {

    const { tickets } = apiList()
    const { showToast } = useToast()
    const { options, user } = userState()

    const { id } = useParams();

    const { data: ticketData = {}, isLoading = true, isPending } = useQuery({
        queryKey: ['all-platforms', id],
        queryFn: () => api.get(tickets.view(id)),
        enabled: !!user && !!id,
        select: ({ data }) => data.data.result
    })

    const status = useMemo(() => {
        const statusData = options?.ticketStatuses?.find(list => list.value == ticketData?.status)

        return <span
            style={{ backgroundColor: statusData?.bgColor, color: statusData?.color }}
            className="inline-flex items-center rounded-full px-2.5 py-1 md:text-sm text-xs font-medium">
            {statusData?.label}
        </span>
    }, [ticketData?.status, options?.ticketStatuses])

    return (
        <div className='bg-white rounded-md p-3'>
            <PageTitleAddbtn
                title={"Ticket : " + (ticketData?.title?.title || '')}
                displayStatus={<span className=''>{status}</span>}
            // disabled={!title || isLoading || requiredFields.length > 0}
            // addClick={handleDone}
            />
        </div>
    )
}

export default ViewTicket
