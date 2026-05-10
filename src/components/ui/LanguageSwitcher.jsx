import React, { useState } from "react";

const LanguageSwitcher = () => {
    const [language, setLanguage] = useState("EN");

    return (
        <div className="flex items-center justify-center xl:w-64 md:w-44 w-28">
            <div  className="relative flex w-full  max-w-[180px] rounded-full bg-[#F3E8EE] shadow-inner">
                {/* Sliding Background */}
                <div
                    className={`
                        absolute
                        top-1
                        bottom-1
                        w-[calc(50%-4px)]
                        rounded-full
                        bg-[#A36081]
                        transition-all
                        duration-300
                        ease-in-out
                        ${language === "EN" ? "left-1" : "left-1/2"}
                    `}
                />

                {/* English */}
                <button
                    onClick={() => setLanguage("EN")}
                    className={`
                        relative
                        z-10
                        flex-1
                        rounded-full
                        text-xs
                        sm:text-sm
                        md:text-base
                        font-semibold
                        transition-all
                        duration-300
                        whitespace-nowrap
                        ${language === "EN"
                            ? "text-white"
                            : "text-[#A36081]"
                        }
                    `}
                >
                    Eng
                </button>

                {/* Gujarati */}
                <button
                    onClick={() => setLanguage("GU")}
                    className={`
                        relative
                        z-10
                        flex-1
                        rounded-full
                        md:py-1.5 py-2
                        text-xs
                        sm:text-sm
                        md:text-base
                        font-semibold
                        transition-all
                        duration-300
                        whitespace-nowrap
                        ${language === "GU"
                            ? "text-white"
                            : "text-[#A36081]"
                        }
                    `}
                >
                    ગુજ
                </button>
            </div>
        </div>
    );
};

export default LanguageSwitcher;