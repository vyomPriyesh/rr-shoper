import React, { useEffect, useMemo, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import api from '../../config/api'
import apiList from '../../config/apiList'
import { useToast } from '../../context/ToastContext'
import { userState } from '../../context/UserContext'
import PageTitleAddbtn from '../ui/PageTitleAddbtn'
import { useNavigate } from 'react-router-dom'
import ButtonUi from '../ui/ButtonUi'
import { timeAgo } from '../../components/ui/DateDisplay'
import PaginationData from '../ui/PaginationData'
import dummyImg from '../../assets/images/dummyImg.jpg'
import { Empty } from 'antd'


const Tickets = () => {

    const navigate = useNavigate();

    const { tickets } = apiList()
    const { showToast } = useToast()
    const { options, user } = userState()

    const [pagination, setPagination] = useState({ page: 1, limit: 5 })
    const [selectedStatus, setSelectedStatus] = useState(null)

    const { data: { data: allTickets, pagination: paginationData = {}, statusCounts = [] } = {}, isLoading = true, isPending } = useQuery({
        queryKey: ['all-platforms', pagination, selectedStatus],
        queryFn: () => api.post(tickets.all, { ...pagination, status: selectedStatus }),
        enabled: !!user && !!selectedStatus,
        select: ({ data }) => data.data.result
    })

    const statusOptions = useMemo(() => {
        return options?.ticketStatuses?.map(list => ({
            ...list,
            counts: statusCounts.find(item => item._id == list.value)?.count || 0
        }))
    }, [statusCounts, options?.ticketStatuses])

    useEffect(() => {
        setSelectedStatus((options?.ticketStatuses?.[0]?.value))
    }, [options?.ticketStatuses])

    const description = (data) => {
        const textareaKey = Object.keys(data).find(list => list.includes('textarea'))
        return data[textareaKey]
    }

    const handlePagination = (data) => {
        setPagination(data)
    }

    return (
        <div className="space-y-4">
            <PageTitleAddbtn
                title="Tickets"
                add
                addClick={() => navigate('add-ticket')}
            />
            <div className="bg-white p-3 rounded-lg overflow-y-auto dashboard-menu">
                {!statusOptions ?
                    <div className="bg-gray-300 rounded-md aspect-square w-40 h-8 flex flex-col items-center justify-center animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse">
                    </div>
                    :
                    <div className="flex flex-row w-fit rounded-md border border-primary overflow-hidden">
                        {statusOptions?.map((list, i) => (
                            <ButtonUi
                                key={i}
                                onClick={() => setSelectedStatus(list.value)}
                                text={<span className='flex flex-row gap-2 text-nowrap items-center'>{list.label} <span className={`${selectedStatus == list.value ? 'bg-white text-primary' : 'bg-primary text-white'} transition-all duration-300 ease-out rounded-full aspect-square w-5 h-5 flex justify-center items-center text-xs`}>{list.counts}</span></span>}
                                className={`${selectedStatus == list.value ? '!bg-primary hover:bg-primary hover:text-white rounded-none' : 'rounded-none !font-medium !bg-transparent text-primary border-white hover:bg-transparent hover:text-primary'} !text-xs md:!text-sm`}
                            />
                        ))}
                    </div>
                }
            </div>
            <div className="bg-white p-2 rounded-lg">
                <div className="flex flex-col gap-2">
                    {isPending || isLoading ? (
                        <>
                            {Array.from({ length: 5 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="flex flex-col sm:flex-row py-4 px-2 gap-3 sm:gap-0 animate-pulse border-b border-gray-100 last:border-b-0 bg-secondary/10"
                                >
                                    {/* Left */}
                                    <div className="w-full sm:w-1/2 flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gray-300 shrink-0" />

                                        <div className="flex flex-col gap-2 flex-1">
                                            <div className="h-4 w-36 max-w-[70%] rounded bg-gray-300" />
                                            <div className="h-3 w-24 max-w-[50%] rounded bg-gray-200" />
                                        </div>
                                    </div>

                                    {/* Right */}
                                    <div className="w-full sm:w-1/2 flex justify-start sm:justify-end">
                                        <div className="flex flex-col gap-2 items-start sm:items-end w-full">
                                            <div className="h-3 w-20 rounded bg-gray-300" />
                                            <div className="h-4 w-full sm:w-48 rounded bg-gray-200" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </>
                    ) : (
                        <>
                            {allTickets?.length == 0 && <Empty
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                                description="No tickets found"
                            />}
                            {allTickets?.map((list, i) => (
                                <div className="flex flex-col sm:flex-row py-3 px-2 sm:items-center hover:bg-secondary/20 rounded hover:shadow-lg transition-all duration-300 ease-out cursor-pointer bg-secondary/10" key={i}>
                                    <div className="sm:w-1/2 flex flex-row items-center gap-3">
                                        <img
                                            className="w-10 h-10 rounded-full"
                                            src={
                                                list?.user?.image ||
                                                `https://ui-avatars.com/api/?background=B06A8D&color=fff&name=${list?.user?.name}`
                                            }
                                            alt=""
                                        />

                                        <div className="flex flex-col">
                                            <h6 className="font-semibold">{list?.title?.title}</h6>
                                            <span className="capitalize text-sm">
                                                Platform :{" "}
                                                <span className="text-base">
                                                    {list?.platform?.name}
                                                </span>
                                            </span>
                                        </div>
                                    </div>

                                    <div className="w-full sm:w-1/2 flex justify-start sm:justify-end">
                                        <div className="flex flex-col gap-2 items-start sm:items-end w-full">
                                            <h6 className="font-semibold text-sm">
                                                {timeAgo(list?.createdAt)}
                                            </h6>
                                            <span className="text-base line-clamp-1">
                                                {description(list?.values)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                    <div className="flex justify-end">
                        <PaginationData {...paginationData} onChange={handlePagination} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tickets
