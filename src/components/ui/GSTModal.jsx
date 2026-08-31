import React, { useEffect } from 'react'
import CommonModal from '../../pages/ui/CommonModal'
import InputField from './InputField'
import { userState } from '../../context/UserContext';

const GSTModal = ({ open, onClick, onClose, onChange, value }) => {

    const { user } = userState();

    useEffect(() => {
        if (user?.gst_number) {
            onChange({ gst_number: user?.gst_number })
        }
    }, [user?.gst_number])

    const handleInputChange = (e) => {
        const { name, value, checked, type } = e.target;
        onChange({
            [name]: type === "checkbox" ? checked : value
        });
    };

    return (
        <CommonModal
            key='modal'
            open={open}
            onDone={onClick}
            onClose={onClose}
            title="Enter GST Number"
        >
            <div className="space-y-5">
                <InputField
                    type="text"
                    name='gst_number'
                    placeholder="Enter GST number"
                    value={value?.gst_number}
                    onChange={handleInputChange}
                    maxLength={15}
                />
                <label className="flex items-start gap-3 cursor-pointer text-sm text-gray-600 leading-6">
                    <input
                        type="checkbox"
                        name='all_policies_checked'
                        checked={value?.all_policies_checked}
                        onChange={handleInputChange}
                        className="mt-1 w-4 h-4 accent-primary cursor-pointer"
                    />

                    <span>
                        I have read and agree to the{" "}
                        <button
                            type="button"
                            onClick={() =>
                                window.open(
                                    "/privacy-policy",
                                    "_blank",
                                    "noopener,noreferrer"
                                )
                            }
                            className="text-primary font-semibold hover:underline"
                        >
                            Privacy Policy
                        </button>
                        ,{" "}
                        <button
                            type="button"
                            onClick={() =>
                                window.open(
                                    "/terms-and-conditions",
                                    "_blank",
                                    "noopener,noreferrer"
                                )
                            }
                            className="text-primary font-semibold hover:underline"
                        >
                            Terms & Conditions
                        </button>{" "}
                        and{" "}
                        <button
                            type="button"
                            onClick={() =>
                                window.open(
                                    "/refund-cancellation-policy",
                                    "_blank",
                                    "noopener,noreferrer"
                                )
                            }
                            className="text-primary font-semibold hover:underline"
                        >
                            Refund & Cancellation Policy
                        </button>
                        .
                    </span>
                </label>
            </div>
        </CommonModal>
    )
}

export default GSTModal
