import React, { useEffect, useRef, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import PageTitleAddbtn from '../ui/PageTitleAddbtn'
import { userState } from '../../context/UserContext'
import { FaPencil, FaCheck, FaXmark, FaCamera } from 'react-icons/fa6'
import apiList from '../../config/apiList'
import { useToast } from '../../context/ToastContext'
import api from '../../config/api'
import Loader from '../../components/ui/Loader'

const MyProfile = () => {

    const { user } = userState()
    const { auth, images } = apiList()
    const { showToast } = useToast()

    const fileInputRef = useRef(null)
    const queryClient = useQueryClient();

    const [isEditing, setIsEditing] = useState(false)
    const [profileImage, setProfileImage] = useState('')

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
    })

    useEffect(() => {
        if (user) {
            setFormData({
                name: user?.name || '',
                email: user?.email || '',
                mobile: user?.mobile || user?.phoneNumber || '',
            })
            setProfileImage(user?.image?.image ? images?.imgUrl + user?.image?.image : null)
        }
    }, [user])

    const handleChange = (e) => {
        const { name, value } = e.target

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const {
        mutate: updateProfile,
        isPending: isProfileUpdating,
    } = useMutation({
        mutationFn: (data) => {
            return api.post(auth.updateProfile, data)
        },

        onSuccess: ({ data }) => {
            showToast(data?.message || 'Profile updated successfully', 'success')
            setIsEditing(false)
            queryClient.invalidateQueries({
                queryKey: ["profile", user?.token],
            });
        },

        onError: (error) => {
            showToast(
                error?.response?.data?.message || 'Failed to update profile',
                'error'
            )
        },
    })

    const {
        mutate: uploadImage,
        isPending: isImageUploading,
    } = useMutation({
        mutationFn: (file) => {

            const formData = new FormData()

            formData.append('images', file)

            return api.post(images.upload, formData, {
                baseURL: `${import.meta.env.VITE_IMAGES_URL}/api/`,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
        },

        onSuccess: ({ data }) => {
            updateProfile({ ...formData, image: data?.data?.result[0]?._id })
        },

        onError: (error) => {
            showToast(
                error?.response?.data?.message || 'Failed to upload profile image',
                'error'
            )
        },
    })

    const handleImageClick = () => {
        if (isImageUploading) return

        fileInputRef.current?.click()
    }

    const handleImageChange = (e) => {
        const file = e.target.files?.[0]

        if (!file) return

        if (!file.type.startsWith('image/')) {
            showToast('Please select a valid image', 'error')
            return
        }

        if (file.size > 5 * 1024 * 1024) {
            showToast('Image size must be less than 5MB', 'error')
            return
        }

        uploadImage(file)
        e.target.value = ''
    }

    const handleEdit = () => {
        setIsEditing(true)
    }

    const handleCancel = () => {
        setFormData({
            name: user?.name || '',
            email: user?.email || '',
            mobile: user?.mobile || user?.phoneNumber || '',
        })

        setIsEditing(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        updateProfile({
            name: formData.name,
            email: formData.email,
            mobile: formData.mobile,
        })
    }

    return (
        <div className="w-full">
            {(isImageUploading || isProfileUpdating) && <Loader />}
            <PageTitleAddbtn title="My Profile" />

            <div className="mt-5 bg-white rounded-xl border border-gray-200 p-4 sm:p-6">

                {/* Profile Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">

                    {/* Profile Image */}
                    <div className="flex justify-center sm:justify-start">

                        <span className="relative w-fit">

                            <img
                                src={profileImage || `https://ui-avatars.com/api/?background=B06A8D&color=fff&name=${encodeURIComponent(user?.name || 'RR')}`
                                }
                                alt="Profile"
                                className="2xl:h-24 2xl:w-24 md:h-20 md:w-20 h-24 w-24 rounded-full object-cover border-2 border-gray-100"
                            />

                            {/* Image Upload Button */}
                            <button
                                type="button"
                                onClick={handleImageClick}
                                disabled={isImageUploading}
                                className="absolute bottom-0 right-0 bg-white rounded-full h-7 w-7 flex items-center justify-center border border-primary text-primary shadow-sm hover:bg-primary hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isImageUploading ? (
                                    <span className="h-3 w-3 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <FaCamera className="text-xs" />
                                )}
                            </button>

                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />

                        </span>

                    </div>

                    {/* Edit Profile Button */}
                    {!isEditing && (
                        <button
                            type="button"
                            onClick={handleEdit}
                            className="w-full sm:w-auto h-10 px-5 rounded-lg bg-primary text-white text-sm font-medium flex items-center justify-center gap-2 hover:opacity-90 transition"
                        >
                            <FaPencil className="text-xs" />
                            Edit Profile
                        </button>
                    )}

                </div>

                {/* Profile Form */}
                <form
                    onSubmit={handleSubmit}
                    className="mt-7"
                >

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">

                        {/* Name */}
                        <div className="flex flex-col gap-2">

                            <label
                                htmlFor="name"
                                className="text-sm font-medium text-gray-600"
                            >
                                Name
                            </label>

                            {isEditing ? (
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                    disabled={isProfileUpdating}
                                    className="w-full h-11 px-4 rounded-lg border border-gray-300 bg-white text-gray-800 text-sm sm:text-base outline-none focus:border-primary focus:ring-1 focus:ring-primary disabled:bg-gray-100 disabled:cursor-not-allowed"
                                />
                            ) : (
                                <div className="w-full min-h-[44px] flex items-center px-4 rounded-lg border border-gray-200 bg-gray-50 text-gray-800 text-sm sm:text-base">
                                    {formData?.name || '-'}
                                </div>
                            )}

                        </div>

                        {/* Email */}
                        <div className="flex flex-col gap-2">

                            <label
                                htmlFor="email"
                                className="text-sm font-medium text-gray-600"
                            >
                                Email
                            </label>

                            {isEditing ? (
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    disabled={isProfileUpdating}
                                    className="w-full h-11 px-4 rounded-lg border border-gray-300 bg-white text-gray-800 text-sm sm:text-base outline-none focus:border-primary focus:ring-1 focus:ring-primary disabled:bg-gray-100 disabled:cursor-not-allowed"
                                />
                            ) : (
                                <div className="w-full min-h-[44px] flex items-center px-4 rounded-lg border border-gray-200 bg-gray-50 text-gray-800 text-sm sm:text-base break-all">
                                    {formData?.email || '-'}
                                </div>
                            )}

                        </div>

                        {/* Mobile */}
                        <div className="flex flex-col gap-2">

                            <label
                                htmlFor="mobile"
                                className="text-sm font-medium text-gray-600"
                            >
                                Mobile
                            </label>

                            {isEditing ? (
                                <input
                                    id="mobile"
                                    type="tel"
                                    name="mobile"
                                    value={formData.mobile}
                                    onChange={handleChange}
                                    placeholder="Enter your mobile number"
                                    disabled={isProfileUpdating}
                                    className="w-full h-11 px-4 rounded-lg border border-gray-300 bg-white text-gray-800 text-sm sm:text-base outline-none focus:border-primary focus:ring-1 focus:ring-primary disabled:bg-gray-100 disabled:cursor-not-allowed"
                                />
                            ) : (
                                <div className="w-full min-h-[44px] flex items-center px-4 rounded-lg border border-gray-200 bg-gray-50 text-gray-800 text-sm sm:text-base">
                                    {formData?.mobile || formData?.phoneNumber || '-'}
                                </div>
                            )}

                        </div>

                    </div>

                    {/* Edit Mode Buttons */}
                    {isEditing && (
                        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-7">

                            {/* Cancel */}
                            <button
                                type="button"
                                onClick={handleCancel}
                                disabled={isProfileUpdating}
                                className="h-10 px-5 rounded-lg border border-gray-300 text-gray-600 text-sm font-medium flex items-center justify-center gap-2 hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <FaXmark />
                                Cancel
                            </button>

                            {/* Save */}
                            <button
                                type="submit"
                                disabled={isProfileUpdating}
                                className="h-10 px-5 rounded-lg bg-primary text-white text-sm font-medium flex items-center justify-center gap-2 hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isProfileUpdating ? (
                                    <>
                                        <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <FaCheck />
                                        Save Changes
                                    </>
                                )}
                            </button>

                        </div>
                    )}

                </form>

            </div>

        </div>
    )
}

export default MyProfile