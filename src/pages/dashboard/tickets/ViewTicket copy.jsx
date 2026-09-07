import React, { useMemo } from 'react'
import PageTitleAddbtn from '../../ui/PageTitleAddbtn'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { userState } from '../../../context/UserContext'
import apiList from '../../../config/apiList'
import api from '../../../config/api'
import toOriginalFormat from '../../ui/HandleFormValues'
import { displayDateTime } from '../../../components/ui/DateDisplay'
import ImagesUploadUi from '../../../components/ui/ImagesUploadUi'

const ViewTicket = () => {

    const { tickets } = apiList()
    const { options, user } = userState()
    const { id } = useParams()

    const { data: ticketData = {}, isLoading = true } = useQuery({
        queryKey: ['ticket-view', id],
        queryFn: () => api.get(tickets.view(id)),
        enabled: !!user && !!id,
        select: ({ data }) => data.data.result
    })

    const status = useMemo(() => {
        const statusData = options?.ticketStatuses?.find(item => item.value == ticketData?.status)

        return (
            <span style={{ backgroundColor: statusData?.bgColor, color: statusData?.color }} className="inline-flex items-center rounded-full px-3 py-1 text-xs md:text-sm font-medium">
                {statusData?.label || '-'}
            </span>
        )
    }, [ticketData?.status, options?.ticketStatuses])

    const allDetails = useMemo(() => {
        return [
            ...(ticketData?.values?.input ?? []),
            ...(ticketData?.values?.select ?? []),
            ...(ticketData?.values?.number ?? []),
            ...(ticketData?.values?.textarea ?? []),
        ];
    }, [ticketData?.values]);

    if (isLoading) {
        return (
            <div className="w-full">
                <PageTitleAddbtn title="Ticket Details" />

                <div className="mt-4 rounded-xl bg-white p-5">
                    <div className="animate-pulse space-y-4">
                        <div className="h-6 w-1/3 rounded bg-gray-200" />
                        <div className="h-20 rounded bg-gray-200" />
                        <div className="h-32 rounded bg-gray-200" />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full">

            <PageTitleAddbtn title='Ticket Information' displayStatus={status} />

            <div className="mt-4 md:mt-5 rounded-xl md:rounded-2xl ">

                {/* Ticket Information */}
                <div>
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-3 md:gap-4">
                        <DetailItem label='Title' value={ticketData?.title?.title || '-'} />
                        <DetailItem label='Platform' value={ticketData?.platform?.name || '-'} />
                        {allDetails?.map((item, index) => (
                            <DetailItem key={index} label={item?.name} value={item?.value || '-'} />
                        ))}
                        {ticketData?.values?.upload?.map((item, i) => (
                            <div className="col-span-2 flex flex-col gap-2" key={i}>
                                <p className="mb-1.5 2xl:text-sm xl:text-xs font-medium text-gray-500 capitalize">
                                    {item?.name}
                                </p>
                                <ImagesUploadUi
                                    value={item?.value}
                                    multiple={Array.isArray(item?.value)}
                                    readOnly
                                />
                            </div>
                        ))}
                    </div>
                </div>


                {/* Description */}
                {/* <div className="mt-5">
                    <p className="mb-2 text-xs md:text-sm font-medium text-gray-500">
                        Description
                    </p>

                    <div className="min-h-[130px] md:min-h-[160px] rounded-xl border border-gray-200 bg-gray-50 px-4 py-4 text-sm md:text-base leading-6 text-gray-800 whitespace-pre-wrap break-words">
                        {ticketData?.description || '-'}
                    </div>
                </div> */}

                {/* Attachments */}
                {ticketData?.images?.length > 0 && (
                    <div className="mt-6">
                        <p className="mb-3 text-xs md:text-sm font-medium text-gray-500">
                            Attachments
                        </p>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                            {ticketData.images.map((image, index) => {
                                const imageUrl = image?.url || image?.image || image

                                return (
                                    <a key={index} href={imageUrl} target="_blank" rel="noreferrer" className="group relative aspect-square overflow-hidden rounded-xl border border-gray-200 bg-gray-100">
                                        <img src={imageUrl} alt={`Ticket attachment ${index + 1}`} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                                    </a>
                                )
                            })}
                        </div>
                    </div>
                )}

                {/* Additional Information */}
                <div className="mt-6 border-t border-gray-100 pt-6">
                    <h2 className="text-base md:text-lg font-semibold text-gray-900">
                        Additional Information
                    </h2>

                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                        <DetailItem label="Created At" value={displayDateTime(ticketData?.createdAt)} />

                        <DetailItem label="Updated At" value={displayDateTime(ticketData?.updatedAt)} />
                        {ticketData?.upload?.map((item, i) => (
                            <div className="col-span-2 flex flex-col gap-2" key={i}>
                                <p className="mb-1.5 2xl:text-sm xl:text-xs font-medium text-gray-500 capitalize">
                                    {item?.name}
                                </p>
                                <ImagesUploadUi
                                    value={item?.value}
                                    multiple={Array.isArray(item?.value)}
                                    readOnly
                                />
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}

const DetailItem = ({ label, value }) => {
    return (
        <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 min-w-0">
            <p className="text-xs md:text-sm font-medium capitalize text-gray-500">
                {label}
            </p>

            <div className="mt-1 text-sm md:text-base font-medium text-gray-900 break-words">
                {value || '-'}
            </div>
        </div>
    )
}

export default ViewTicket