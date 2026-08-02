import React, { useEffect, useMemo, useState } from 'react'
import InputField from '../../../components/ui/InputField'
import { useMutation, useQuery } from '@tanstack/react-query';
import api from '../../../config/api';
import apiList from '../../../config/apiList';
import { useToast } from '../../../context/ToastContext';
import { userState } from '../../../context/UserContext';
import PageTitleAddbtn from '../../ui/PageTitleAddbtn';
import { useNavigate } from 'react-router-dom';

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
    const [errors, setErrors] = useState({})

    useEffect(() => {
        setFormValues({})
    }, [title])

    const { data: ticketForm, isLoading, isFetching } = useQuery({
        queryKey: ['ticket-form', title],
        queryFn: () => api.get(tickets.getTicketForm(title)),
        enabled: Boolean(title),
        select: (response) => response?.data?.data ?? response?.data ?? response ?? {},
    })

    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    const fields = normalizeFormFields(ticketForm)
    const requiredFields = useMemo(() => fields.filter(list => list.required).map(list => list.label).filter(label => !formValues[label]), [fields, formValues])

    const handleFieldChange = (name, value, type, multiple) => {
        setFormValues((prev) => ({
            ...prev,
            [name]: value,
            ...(multiple && {
                [`add_mutiple_${name}`]: true,
            }),
            [`${type}_${name}_for_manage`]: value
        }))

        const isFieldEmpty = ({ type, multiple, value }) => {
            if (multiple) {
                return !Array.isArray(value) || value.length === 0
            }

            if (type === "upload") {
                return value == null
            }

            return value == null || (typeof value === "string" && value.trim() === "")
        }

        setErrors((prev) => {
            const updatedErrors = { ...prev }

            const field = fields.find((item) => item.label === name)

            if (!field?.required) {
                delete updatedErrors[name]
                return updatedErrors
            }

            if (isFieldEmpty({ type, multiple, value })) {
                updatedErrors[name] = `${capitalize(name)} is required`
            } else {
                delete updatedErrors[name]
            }

            return updatedErrors
        })
    }

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

        const requiredFieldsErrors = requiredFields.reduce((acc, field) => {
            acc[field] = `${capitalize(field)} is required`;
            return acc;
        }, {});

        setErrors(requiredFieldsErrors)
        if (Object.keys(requiredFieldsErrors).length > 0) {
            return
        }

        const payload = {
            platform,
            title,
            values: formValues
        }
        submitTicket(payload)
    }

    const renderField = (field, index, errors) => {
        const fieldName = field.name || field.key || field.field_name || field.label || `field_${index}`
        const fieldLabel = field.label || field.title || fieldName
        const errorMsg = errors[fieldLabel]
        const fieldType = field.type || 'text'
        const optionsData = field.manully ? options[field.dynamic] : Array.isArray(field.options) ? field.options : []
        const selectOptions = optionsData.map((option) => {
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
                    <div key={fieldName} className='flex flex-col gap-2'>
                        <InputField
                            type='textarea'
                            className='!h-12'
                            placeholder={field.placeholder || `Enter ${fieldLabel}`}
                            value={formValues[fieldName]}
                            onChange={(e) => handleFieldChange(fieldName, e.target.value, fieldType)}
                            rows={4}
                        />
                        <span className='text-red-500 text-sm'>{errorMsg}</span>
                    </div>
                )
            case 'select':
            case 'dropdown':
                return (
                    <div key={fieldName} className='flex flex-col gap-2'>
                        <InputField
                            type={field?.multipleSelect ? 'drop-multi-select' : 'drop-single-select'}
                            className='!h-12'
                            placeholder={field.placeholder || `Select ${fieldLabel}`}
                            options={selectOptions}
                            value={formValues[fieldName]}
                            onChange={(e) => handleFieldChange(fieldName, e, fieldType, field?.multipleSelect)}
                        />
                        <span className='text-red-500 text-sm'>{errorMsg}</span>
                    </div>
                )
            case 'input':
                return (
                    <div key={fieldName} className='flex flex-col gap-2'>
                        <InputField
                            type='text'
                            className='!h-12'
                            placeholder={field.placeholder || `Enter ${fieldLabel}`}
                            value={formValues[fieldName]}
                            onChange={(e) => handleFieldChange(fieldName, e.target.value, fieldType)}
                        />
                        <span className='text-red-500 text-sm'>{errorMsg}</span>
                    </div>
                )
            case 'upload':
                return (
                    <div key={fieldName} className='flex flex-col gap-2'>
                        <InputField
                            type='upload'
                            className='!h-12'
                            multiple={field.multiple || false}
                            value={formValues[fieldName]}
                            imageLimit={field.imageLimit}
                            onChange={(e) => handleFieldChange(fieldName, e, fieldType, field.multiple)}
                        />
                        <span className='text-red-500 text-sm'>{errorMsg}</span>
                    </div>
                )
            default:
                return (
                    <div key={fieldName} className='flex flex-col gap-2'>
                        <InputField
                            type='text'
                            className='!h-12'
                            placeholder={field.placeholder || `Enter ${fieldLabel}`}
                            value={formValues[fieldName]}
                            onChange={(e) => handleFieldChange(fieldName, e.target.value, fieldType)}
                        />
                        <span className='text-red-500 text-sm'>{errorMsg}</span>
                    </div>
                )
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

                {title && (
                    <>
                        {isLoading || isFetching ? (
                            <p className="text-sm text-gray-500">Loading form...</p>
                        ) : fields.length > 0 ? (
                            fields.map((field, index) => renderField(field, index, errors))
                        ) : (
                            <p className="text-sm text-gray-500">No form fields found for this ticket.</p>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

export default AddTickets
