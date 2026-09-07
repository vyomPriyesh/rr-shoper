import React, { useEffect, useMemo, useRef, useState } from 'react'
import InputField from '../../../components/ui/InputField'
import { useMutation, useQuery } from '@tanstack/react-query';
import api from '../../../config/api';
import apiList from '../../../config/apiList';
import { useToast } from '../../../context/ToastContext';
import { userState } from '../../../context/UserContext';
import PageTitleAddbtn from '../../ui/PageTitleAddbtn';
import { useNavigate } from 'react-router-dom';
import LoadFrom from '../../LoadFrom';

const normalizeFormFields = (payload) => {
    if (Array.isArray(payload)) return payload

    if (Array.isArray(payload?.fields)) return payload.fields
    if (Array.isArray(payload?.data)) return payload.data
    if (Array.isArray(payload?.form)) return payload.form

    if (payload && typeof payload === 'object') {
        return Object.entries(payload).map(([key, value]) => {
            if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                return {
                    name: key,
                    label: value.label || key,
                    type: value.type || 'text',
                    placeholder: value.placeholder || '',
                    options: value.options || [],
                }
            }

            return {
                name: key,
                label: key,
                type: 'text',
                placeholder: '',
                options: [],
            }
        })
    }

    return []
}

const AddTickets = () => {

    const { tickets } = apiList()
    const { showToast } = useToast()
    const { options } = userState()

    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [platform, setPlatform] = useState('');
    const [formValues, setFormValues] = useState({});
    const childRef = useRef();

    useEffect(() => {
        setFormValues({})
    }, [title])

    const { data: ticketForm, isLoading } = useQuery({
        queryKey: ['ticket-form', title],
        queryFn: () => api.get(tickets.getTicketForm(title)),
        enabled: Boolean(title),
        select: (response) => response?.data?.data ?? response?.data ?? response ?? {},
    })

    const fields = normalizeFormFields(ticketForm)

    const { mutate: submitTicket, isPending } = useMutation({
        mutationFn: async (payload) => api.post(tickets.add, payload),
        onSuccess: (response) => {
            showToast(response?.data?.message, 'success')
            setTitle('')
            navigate(-1)
            setFormValues({})
        },
        onError: (error) => {
            const message = error?.response?.data?.message || error?.response?.data?.error?.error_message || 'Unable to submit ticket right now.'
            showToast(message, 'warning')
        },
    })

    const handleDone = () => {
        if (!title) {
            showToast('Please select a ticket title.', 'warning')
            return
        }

        if (!platform) {
            showToast('Please select a platform.', 'warning')
            return
        }

        const isValid = childRef.current.handleValidate();
        if (isValid) {
            const payload = {
                platform,
                title,
                values: formValues
            }
            submitTicket(payload)
        }
    }


    return (
        <div className="space-y-4">
            <PageTitleAddbtn
                title="Add Ticket"
                add
                addText='Save'
                // disabled={!title || isLoading || requiredFields.length > 0}
                addClick={handleDone}
            // otherButtons={
            //     [
            //         {
            //             addText: 'Draft',
            //             addClick: () => (''),
            //             className:'bg-green-600 !border-0'
            //         }
            //     ]
            // }
            />
            <div className="bg-white md:p-5 p-2 rounded-xl space-y-3">
                <div className="flex md:flex-row flex-col gap-3">
                    <InputField
                        type='drop-single-select'
                        className='!h-12'
                        placeholder='Select ticket title'
                        options={options?.ticketsTitles}
                        value={title}
                        onChange={(e) => setTitle(e)}
                    />
                    <InputField
                        type='drop-single-select'
                        className='!h-12'
                        placeholder='Select Platform'
                        options={options?.platforms}
                        value={platform}
                        onChange={(e) => setPlatform(e)}
                    />
                </div>

                <LoadFrom ref={childRef} formFields={ticketForm?.fields || []} title={ticketForm?.ticketTitle} isLoading={isLoading} formValues={formValues} setFormValues={setFormValues} />
            </div>
        </div>
    )
}

export default AddTickets
