import React, { useEffect, useState } from "react";
import InputField from "../ui/InputField";
import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../../config/api";
import apiList from "../../config/apiList";
import { useToast } from "../../context/ToastContext";
import { userState } from "../../context/UserContext";

const FirstAuthModal = ({ isOpen, onClose }) => {

    const { auth } = apiList();
    const { setRefresh } = userState();
    const { showToast } = useToast();

    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("")
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [seconds, setSeconds] = useState(30);

    const { data: customerMobile, refetch: findUserRefetch, isError, } = useQuery({
        queryKey: ['findUser'],
        queryFn: () => api.get(auth.findCustomer(email)),
        enabled: false,
        select: ({ data }) => {
            return data.data.mobile
        }
    })

    useEffect(() => {
        if (customerMobile && !isError) {
            setMobile(customerMobile)
        } else {
            setMobile("")
        }
    }, [customerMobile, isError])

    useEffect(() => {
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || ""))
        if (isValid) {
            findUserRefetch()
        }
    }, [email])


    useEffect(() => {
        if (!otpSent || seconds === 0) return;

        const timer = setInterval(() => {
            setSeconds((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [otpSent, seconds]);

    const { mutate: handleSendOtp, isPending } = useMutation({
        mutationFn: async () => {
            const response = await api.post(auth.sendOtp, { mobile, email });
            return response.data;
        },
        onSuccess: ({ data, message }) => {
            if (mobile.length === 10) {
                showToast(message, "success")
                setOtp("");
                setOtpSent(true);
                setSeconds(30);
            }
        }
    })

    const { mutate: handleVerify } = useMutation({
        mutationFn: async () => {
            const response = await api.post(auth.verifyOtp, { mobile, otp });
            return response.data;
        },
        onSuccess: ({ message, data }) => {
            showToast(message, "success");
            setMobile("");
            setOtp("");
            setOtpSent(false);
            setRefresh((prev) => prev + 1);
            localStorage.setItem("user", JSON.stringify({
                ...data.result.user,
                token: data.result.token
            }));
        },
        onError: ({ response }) => {
            const message = response.data.error.error_message
            showToast(message, "warning");
        }
    });

    useEffect(() => {
        setEmail("")
    }, [isOpen])

    if (!isOpen) return null;

    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (!otpSent) {
            handleSendOtp();
        } else {
            handleVerify();
        }
    };

    return (
        <>
            {/* Backdrop */}
            <div className="fixed inset-0 z-[51] bg-black/60 backdrop-blur-sm animate-fadeIn" />

            {/* Modal Wrapper */}
            <div className="fixed inset-0 z-[51] flex flex-col px-4 md:px-8 animate-fadeIn">
                <div className="flex-1 flex items-end md:items-center justify-center pt-12 md:pt-0 pb-12 md:pb-0">
                    {/* Modal */}
                    <div
                        className="
              w-full max-w-4xl overflow-hidden rounded-3xl bg-white
              shadow-2xl md:shadow-3xl
              animate-modalMobile md:animate-modalDesktop
            "
                    >
                        {/* Mobile Header */}
                        <div className="md:hidden bg-gradient-to-r from-[#A36081] to-[#A36081]/90 text-white p-6 rounded-t-3xl">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-2xl font-black">
                                    Verify Mobile
                                </h2>

                                {onClose && (
                                    <button
                                        onClick={onClose}
                                        className="text-white text-2xl font-bold"
                                    >
                                        ×
                                    </button>
                                )}
                            </div>

                            <p className="text-lg opacity-90">
                                Enter your number to continue
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                            {/* LEFT SIDE */}
                            <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-[#F3E8EE] to-[#F3E8EE]/80 p-12 border-r border-[#A36081]/20">
                                <div className="w-32 h-32 mx-auto mb-8 rounded-2xl bg-gradient-to-r from-[#A36081]/30 to-[#F3E8EE]/50 flex items-center justify-center shadow-xl text-6xl animate-bounceSlow">
                                    🛒
                                </div>

                                <h2 className="text-4xl font-black text-[#A36081] mb-6 text-center leading-tight">
                                    Ecommerce
                                    <br />
                                    Made Simple
                                </h2>

                                <div className="max-w-sm mx-auto text-lg text-[#A36081]/80 leading-relaxed">
                                    <p>
                                        Secure mobile verification for faster
                                        logins.
                                    </p>

                                    <p className="mt-4 font-semibold">
                                        Join 10K+ merchants.
                                    </p>
                                </div>
                            </div>

                            {/* RIGHT SIDE */}
                            <div className="p-6 md:p-12 lg:p-16 flex flex-col justify-center relative">
                                {/* Desktop Header */}
                                <div className="lg:block hidden mb-12">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-4xl font-black text-[#A36081] mb-4">
                                                Verify Mobile
                                            </h3>

                                            <p className="text-xl text-[#A36081]/70">
                                                Enter your number to receive OTP
                                            </p>
                                        </div>

                                        {onClose && (
                                            <button
                                                onClick={onClose}
                                                className="text-[#A36081] text-4xl font-light hover:rotate-90 transition-transform duration-300"
                                            >
                                                ×
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <form onSubmit={handleFormSubmit} className="space-y-3">
                                    {/* Phone Input */}
                                    <div className="animate-slideUp space-y-5">
                                        <InputField
                                            type="text"
                                            value={email}
                                            placeholder="Enter your E-mail"
                                            onChange={(e) =>
                                                setEmail(
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <InputField
                                            type="tel"
                                            maxLength={10}
                                            value={mobile}
                                            disabled={customerMobile && !isError}
                                            placeholder="Enter 10-digit mobile"
                                            onChange={(e) =>
                                                setMobile(
                                                    e.target.value.replace(/\D/g, "")
                                                )
                                            }
                                        />
                                    </div>

                                    {!otpSent ? (
                                        <button
                                            type="submit"
                                            // onClick={handleSendOtp}
                                            disabled={!email || mobile.length !== 10}
                                            className="
                        w-full h-12 md:h-14 rounded-2xl
                        bg-gradient-to-r from-[#A36081] to-[#8D4F6C]
                        text-white text-lg md:text-xl font-bold
                        shadow-xl hover:shadow-2xl
                        hover:-translate-y-1
                        active:scale-[0.98]
                        transition-all duration-300
                        disabled:opacity-50
                        disabled:cursor-not-allowed
                        disabled:shadow-none
                      "
                                        >
                                            Send OTP
                                        </button>
                                    ) : (
                                        <>
                                            {/* OTP Input */}
                                            <div className="animate-slideUp">
                                                <InputField
                                                    maxLength={6}
                                                    value={otp}
                                                    onChange={(e) =>
                                                        setOtp(
                                                            e.target.value.replace(/\D/g, "")
                                                        )
                                                    }
                                                    placeholder="Enter 6-digit OTP"
                                                />
                                            </div>

                                            {/* Timer */}
                                            <div className="flex items-center justify-between rounded-2xl animate-slideUp">
                                                {/* <span className="text-lg md:text-xl font-bold text-[#A36081]/70">
                                                    {seconds > 0
                                                        ? `Resend in ${seconds}s`
                                                        : "Ready to resend"}
                                                </span> */}

                                                <button
                                                    type="button"
                                                    onClick={handleSendOtp}
                                                    disabled={seconds > 0}
                                                    className={` ${seconds > 0 ? '' : 'text-primary'}
                            rounded-xl ms-auto
                            transition-all 
                            disabled:opacity-40
                            disabled:cursor-not-allowed`}
                                                >
                                                    {seconds > 0
                                                        ? `Resend in ${seconds}s`
                                                        : "Resend OTP"}
                                                </button>
                                            </div>

                                            {/* Verify */}
                                            <button
                                                // onClick={handleVerify}
                                                type="submit"
                                                disabled={otp.length !== 6}
                                                className="
                          w-full h-14 rounded-2xl
                          bg-gradient-to-r from-[#A36081] to-[#8D4F6C]
                          text-white text-lg md:text-xl font-bold
                          shadow-xl hover:shadow-2xl
                          hover:-translate-y-1
                          active:scale-[0.98]
                          transition-all duration-300
                          disabled:opacity-50
                          disabled:cursor-not-allowed
                          disabled:shadow-none
                        "
                                            >
                                                Verify & Continue
                                            </button>
                                        </>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FirstAuthModal;