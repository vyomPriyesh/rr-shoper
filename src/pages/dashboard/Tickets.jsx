import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import api from '../../config/api'
import apiList from '../../config/apiList'
import { useToast } from '../../context/ToastContext'
import { userState } from '../../context/UserContext'
import CommanModal from '../ui/CommanModal'
import PageTitleAddbtn from '../ui/PageTitleAddbtn'
import InputField from '../../components/ui/InputField'

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

const Tickets = () => {
    const { tickets } = apiList()
    const { showToast } = useToast()
    const { options } = userState()

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedTicket, setSelectedTicket] = useState('')
    const [formValues, setFormValues] = useState({})

    const { data: ticketForm, isLoading, isFetching } = useQuery({
        queryKey: ['ticket-form', selectedTicket],
        queryFn: () => api.get(tickets.getTicketForm(selectedTicket)),
        enabled: Boolean(selectedTicket),
        select: (response) => response?.data?.data ?? response?.data ?? response ?? {},
    })

    useEffect(() => {
        setFormValues({})
    }, [selectedTicket])

    const fields = normalizeFormFields(ticketForm)

    const { mutate: submitTicket, isPending } = useMutation({
        mutationFn: async () => api.post(tickets.create(selectedTicket), {
            ticketTitle: selectedTicket,
            ...formValues,
        }),
        onSuccess: (response) => {
            showToast(response?.data?.message || 'Ticket submitted successfully.', 'success')
            setIsModalOpen(false)
            setSelectedTicket('')
            setFormValues({})
        },
        onError: (error) => {
            const message = error?.response?.data?.message || error?.response?.data?.error?.error_message || 'Unable to submit ticket right now.'
            showToast(message, 'warning')
        },
    })

    const handleFieldChange = (name, value) => {
        setFormValues((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleDone = () => {
        if (!selectedTicket) {
            showToast('Please select a ticket title first.', 'warning')
            return
        }

        // submitTicket()
    }

    const renderField = (field, index) => {
        const fieldName = field.name || field.key || field.field_name || `field_${index}`
        const fieldLabel = field.label || field.title || fieldName
        const fieldType = field.type || 'text'
        const options = Array.isArray(field.options) ? field.options : []
        const selectOptions = options.map((option) => {
            if (typeof option === 'string') {
                return { label: option, value: option }
            }

            return {
                label: option.label || option.value || option.name || '',
                value: option.value || option.name || '',
            }
        })

        switch (fieldType) {
            case 'textarea':
                return (
                    <div key={fieldName} className="space-y-2">
                        <InputField
                            type='textarea'
                            className='!h-12'
                            placeholder={field.placeholder || `Enter ${fieldLabel}`}
                            value={formValues[fieldName]}
                            onChange={(e) => handleFieldChange(fieldName, e.target.value)}
                            rows={4}
                        />
                    </div>
                )
            case 'select':
            case 'dropdown':
                return (
                    <div key={fieldName} className="space-y-2">
                        <InputField
                            type='drop-single-select'
                            className='!h-12'
                            placeholder={field.placeholder || `Select ${fieldLabel}`}
                            options={selectOptions}
                            value={formValues[fieldName]}
                            onChange={(e) => handleFieldChange(fieldName, e)}
                        />
                    </div>
                )
            case 'input':
                return (
                    <div key={fieldName} className="space-y-2">
                        <InputField
                            type='text'
                            className='!h-12'
                            placeholder={field.placeholder || `Enter ${fieldLabel}`}
                            value={formValues[fieldName]}
                            onChange={(e) => handleFieldChange(fieldName, e.target.value)}
                        />
                    </div>
                )
            case 'upload':
                return (
                    <div key={fieldName} className="space-y-2">
                        <InputField
                            type='upload'
                            className='!h-12'
                            multiple={field.multiple || false}
                            value={formValues[fieldName]}
                            imageLimit={field.imageLimit}
                            onChange={(e) => handleFieldChange(fieldName, e)}
                        />
                    </div>
                )
            default:
                return (
                    <div key={fieldName} className="space-y-2">
                        <InputField
                            type='text'
                            className='!h-12'
                            placeholder={field.placeholder || `Enter ${fieldLabel}`}
                            value={formValues[fieldName]}
                            onChange={(e) => handleFieldChange(fieldName, e.target.value)}
                        />
                    </div>
                )
        }
    }

    return (
        <div className="space-y-4">
            <PageTitleAddbtn
                title="Tickets"
                add
                addClick={() => setIsModalOpen(true)}
            />

            <CommanModal
                open={isModalOpen}
                title="Create Ticket"
                onClose={() => {
                    setIsModalOpen(false)
                    setSelectedTicket('')
                    setFormValues({})
                }}
                onDone={handleDone}
                width={800}
            >
                <div className="space-y-4">
                    <div className="space-y-2">
                        <InputField
                            type='drop-single-select'
                            className='!h-12'
                            placeholder='Select ticket title'
                            options={options?.ticketsTitles}
                            value={selectedTicket}
                            onChange={(e) => setSelectedTicket(e)}
                        />
                    </div>

                    {selectedTicket && (
                        <div className="space-y-3 rounded-2xl border border-gray-200 bg-gray-50 p-4">
                            {isLoading || isFetching ? (
                                <p className="text-sm text-gray-500">Loading form...</p>
                            ) : fields.length > 0 ? (
                                fields.map((field, index) => renderField(field, index))
                            ) : (
                                <p className="text-sm text-gray-500">No form fields found for this ticket.</p>
                            )}
                        </div>
                    )}
                </div>
            </CommanModal>
        </div>
    )
}

export default Tickets
