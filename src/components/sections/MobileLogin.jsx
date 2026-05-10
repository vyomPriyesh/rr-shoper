import axios from "axios";
import React, { useEffect, useState } from "react";

const FirstAuthModal = ({ isOpen = false, onClose }) => {
    const [mobile, setMobile] = useState("");
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [seconds, setSeconds] = useState(30);

    useEffect(() => {
        if (!otpSent || seconds === 0) return;

        const timer = setInterval(() => {
            setSeconds((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [otpSent, seconds]);

    const handleSendOtp = async () => {
        if (mobile.length === 10) {
            setOtpSent(true);
            setSeconds(30);
        }
    };

    const handleResend = () => {
        setOtp("");
        setSeconds(30);
    };

    const handleVerify = () => {
        if (otp.length === 6) {
            console.log("Verify:", mobile, otp);
        }
    };

    if (!isOpen) return null;

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

                                <div className="space-y-6">
                                    {/* Phone Input */}
                                    <div className="animate-slideUp">
                                        <input
                                            type="tel"
                                            maxLength={10}
                                            value={mobile}
                                            onChange={(e) =>
                                                setMobile(
                                                    e.target.value.replace(/\D/g, "")
                                                )
                                            }
                                            placeholder="Enter 10-digit mobile"
                                            className="
                        w-full h-14 md:h-16 px-5 md:px-6 py-4
                        rounded-2xl border-2 border-[#A36081]/30
                        bg-[#F3E8EE]/50 text-lg md:text-xl font-bold
                        text-[#A36081] placeholder-[#A36081]/50
                        outline-none shadow-inner
                        focus:border-[#A36081]
                        focus:shadow-lg
                        focus:ring-4 ring-[#A36081]/20
                        transition-all
                      "
                                        />
                                    </div>

                                    {!otpSent ? (
                                        <button
                                            onClick={handleSendOtp}
                                            disabled={mobile.length !== 10}
                                            className="
                        w-full h-14 md:h-16 rounded-2xl
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
                                                <input
                                                    type="text"
                                                    maxLength={6}
                                                    value={otp}
                                                    onChange={(e) =>
                                                        setOtp(
                                                            e.target.value.replace(/\D/g, "")
                                                        )
                                                    }
                                                    placeholder="Enter 6-digit OTP"
                                                    className="
                            w-full h-14 md:h-16 px-5 md:px-6 py-4
                            rounded-2xl border-2 border-[#A36081]/30
                            bg-[#F3E8EE]/50 text-xl md:text-2xl
                            font-bold tracking-[0.6em]
                            text-[#A36081]
                            placeholder-[#A36081]/50
                            outline-none shadow-inner
                            focus:border-[#A36081]
                            focus:shadow-lg
                            focus:ring-4 ring-[#A36081]/20
                            transition-all
                          "
                                                />
                                            </div>

                                            {/* Timer */}
                                            <div className="flex items-center justify-between p-4 md:p-5 rounded-2xl bg-[#F3E8EE]/70 border border-[#A36081]/20 animate-slideUp">
                                                <span className="text-lg md:text-xl font-bold text-[#A36081]/70">
                                                    {seconds > 0
                                                        ? `Resend in ${seconds}s`
                                                        : "Ready to resend"}
                                                </span>

                                                <button
                                                    onClick={handleResend}
                                                    disabled={seconds > 0}
                                                    className="
                            px-4 md:px-6 py-2 md:py-3
                            rounded-xl bg-[#A36081]/30
                            text-[#A36081] font-bold
                            hover:bg-[#A36081]/50
                            transition-all
                            disabled:opacity-40
                            disabled:cursor-not-allowed
                          "
                                                >
                                                    Resend OTP
                                                </button>
                                            </div>

                                            {/* Verify */}
                                            <button
                                                onClick={handleVerify}
                                                disabled={otp.length !== 6}
                                                className="
                          w-full h-14 md:h-16 rounded-2xl
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FirstAuthModal;