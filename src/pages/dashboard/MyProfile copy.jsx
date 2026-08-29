import React, { useEffect, useState } from 'react'
import PageTitleAddbtn from '../ui/PageTitleAddbtn'
import { userState } from '../../context/UserContext'
import { FaPencil, FaCheck, FaXmark } from 'react-icons/fa6'
import InputField from '../../components/ui/InputField'

const MyProfile = () => {
    const { user } = userState()

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

            setProfileImage({
                url: user?.image || `https://ui-avatars.com/api/?background=B06A8D&color=fff&name=${encodeURIComponent(user?.name || 'User')}`,
                image: user?.image || `https://ui-avatars.com/api/?background=B06A8D&color=fff&name=${encodeURIComponent(user?.name || 'User')}`
            })
        }
    }, [user])

    const handleChange = (e) => {
        const { name, value } = e.target

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
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

        // TODO: Call update profile API here
        console.log('Updated Profile:', formData)

        setIsEditing(false)
    }

    return (
        <div className="w-full">
            <PageTitleAddbtn title="My Profile" />

            <div className="mt-5 bg-white rounded-xl border border-gray-200 p-4 sm:p-6">

                {/* Profile Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">

                    {/* Profile Image */}
                    <div className="flex justify-center sm:justify-start">
                        <span className="relative w-fit">
                            <InputField
                                type='upload'
                                listType="picture-circle"
                                className='!h-12'
                                multiple={false}
                                value={profileImage}
                                onChange={setProfileImage}
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
                            <FaPencil />
                            Edit Profile
                        </button>
                    )}
                </div>

                {/* Profile Form */}
                <form onSubmit={handleSubmit} className="mt-7">
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
                                    className="w-full h-11 px-4 rounded-lg border border-gray-300 bg-white text-gray-800 text-sm sm:text-base outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                                />
                            ) : (
                                <div className="w-full min-h-[44px] flex items-center px-4 rounded-lg border border-gray-200 bg-gray-50 text-gray-800 text-sm sm:text-base">
                                    {user?.name || '-'}
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
                                    className="w-full h-11 px-4 rounded-lg border border-gray-300 bg-white text-gray-800 text-sm sm:text-base outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                                />
                            ) : (
                                <div className="w-full min-h-[44px] flex items-center px-4 rounded-lg border border-gray-200 bg-gray-50 text-gray-800 text-sm sm:text-base break-all">
                                    {user?.email || '-'}
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
                                    className="w-full h-11 px-4 rounded-lg border border-gray-300 bg-white text-gray-800 text-sm sm:text-base outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                                />
                            ) : (
                                <div className="w-full min-h-[44px] flex items-center px-4 rounded-lg border border-gray-200 bg-gray-50 text-gray-800 text-sm sm:text-base">
                                    {user?.mobile || user?.phoneNumber || '-'}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Edit Mode Buttons */}
                    {isEditing && (
                        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-7">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="h-10 px-5 rounded-lg border border-gray-300 text-gray-600 text-sm font-medium flex items-center justify-center gap-2 hover:bg-gray-50 transition"
                            >
                                <FaXmark />
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="h-10 px-5 rounded-lg bg-primary text-white text-sm font-medium flex items-center justify-center gap-2 hover:opacity-90 transition"
                            >
                                <FaCheck />
                                Save Changes
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    )
}

export default MyProfile