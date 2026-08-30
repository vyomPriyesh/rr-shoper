import React, {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";
import SectionsUI from "../layouts/SectionsUI";
import { userState } from "../../context/UserContext";
import apiList from "../../config/apiList";
import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../../config/api";
import { useParams } from "react-router-dom";
import { useToast } from "../../context/ToastContext";
import Loader from "../ui/Loader";
import { unixDisplayDate } from "../ui/DateDisplay";
import { FaCheck } from "react-icons/fa";
import InputField from "../ui/InputField";
import CommonModal from "../../pages/ui/CommonModal";

const PlanPricingContent = ({
    platforms,
    pricingData,
    selectedPlatform,
    setSelectedPlatform,
    images,
    getPlanState,
    getPlanButtonText,
    getPurchaseData,
    findPackageName,
    handlePurchase,
    gstModal,
    gstNumber,
    setGstNumber,
    handleGstSubmit,
    closeGstModal,
    downgradeModal,
    downgradePlan,
    currentPackageName,
    handleDowngradeSubmit,
    closeDowngradeModal,
    downgradeRequest,
    currentPackage,
}) => {
    const selectedPlans = pricingData[selectedPlatform] || [];

    const isCurrentPackageActive = Boolean(
        currentPackage && !currentPackage.package_expire_status
    );

    return (
        <>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12 lg:mb-16">
                {platforms.map((platform) => (
                    <button
                        key={platform._id}
                        type="button"
                        onClick={() =>
                            setSelectedPlatform(platform.name)
                        }
                        className={`
                            group relative overflow-hidden
                            flex items-center gap-2 sm:gap-3
                            px-4 sm:px-5 py-3 sm:py-3.5
                            rounded-2xl
                            transition-all duration-500
                            backdrop-blur-md border
                            hover:-translate-y-1 hover:scale-105
                            ${selectedPlatform === platform.name
                                ? `
                                        bg-primary text-white border-primary
                                        shadow-[0_12px_35px_rgba(176,106,141,0.30)]
                                        scale-105
                                    `
                                : `
                                        bg-white/80 text-heading border-white/60
                                        hover:border-[#E8C7D7]
                                    `
                            }
                        `}
                    >
                        <div
                            className={`
                                absolute inset-0 opacity-0
                                transition-all duration-500
                                bg-gradient-to-br
                                from-white/20 via-transparent to-secondary/20
                                ${selectedPlatform === platform.name
                                    ? "opacity-100"
                                    : "group-hover:opacity-100"
                                }
                            `}
                        />

                        <div
                            className={`
                                relative z-10
                                flex items-center justify-center
                                w-9 h-9 sm:w-10 sm:h-10
                                overflow-hidden rounded-xl
                                transition-all duration-500
                                ${selectedPlatform === platform.name
                                    ? "bg-white shadow-inner"
                                    : "bg-[#FFF7FA] group-hover:bg-white"
                                }
                            `}
                        >
                            <img
                                src={
                                    images.imgUrl +
                                    platform?.image?.image
                                }
                                alt={platform.name}
                                className="w-7 h-7 object-contain"
                            />
                        </div>

                        <span className="relative z-10 text-xs sm:text-sm md:text-[15px] font-semibold tracking-wide capitalize">
                            {platform.name}
                        </span>

                        {selectedPlatform === platform.name && (
                            <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-white animate-pulse" />
                        )}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                {selectedPlans.map((plan) => {
                    const planState = getPlanState(plan);
                    const buttonText = getPlanButtonText(plan);
                    const purchase = getPurchaseData(plan.package_id);

                    const isPendingDowngrade =
                        isCurrentPackageActive &&
                        downgradeRequest?.requested_package_id ===
                        plan.package_id;

                    const isCurrent =
                        planState === "CURRENT";

                    return (
                        <div
                            key={plan.package_id}
                            className={`
                                relative overflow-hidden rounded-[28px]
                                p-6
                                transition-all duration-500
                                flex flex-col h-full
                                ${plan.popular
                                    ? `
                                            bg-primary text-white
                                            md:scale-[1.03]
                                            shadow-[0_20px_50px_rgba(176,106,141,0.25)]
                                        `
                                    : `
                                            bg-white/80 backdrop-blur-md
                                            border border-white/60
                                            text-heading
                                            shadow-[0_10px_30px_rgba(176,106,141,0.08)]
                                            hover:-translate-y-2
                                            hover:shadow-[0_20px_50px_rgba(176,106,141,0.15)]
                                        `
                                }
                            `}
                        >
                            {plan.popular && (
                                <div className="absolute top-5 right-6 bg-white text-primary text-xs font-bold px-3 py-1 rounded-full">
                                    Most Popular
                                </div>
                            )}

                            <div
                                className={`
                                    flex justify-between flex-row mb-5
                                    place-items-center
                                    ${plan.popular ? "mt-7" : ""}
                                `}
                            >
                                <h3 className="2xl:text-2xl lg:text-lg text-base font-bold capitalize">
                                    {findPackageName(plan.name)}
                                </h3>

                                {purchase.expireTime && (
                                    <span
                                        className={`
                                            md:text-sm xl:text-xs text-xs
                                            font-medium px-2 py-1 rounded-xl
                                            ${plan.popular
                                                ? "bg-white text-primary"
                                                : "text-white bg-primary"
                                            }
                                        `}
                                    >
                                        {purchase.expireTime}
                                    </span>
                                )}
                            </div>

                            <div className="flex items-end gap-1 mb-7">
                                <span className="2xl:text-4xl lg:text-xl text-xl font-bold">
                                    {plan.price}
                                </span>

                                <span className="2xl:text-sm text-xs opacity-70 mb-1">
                                    /month
                                </span>
                            </div>

                            <div className="space-y-4 mb-8">
                                {plan.services.map((feature, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-3"
                                    >
                                        <div
                                            className={`
                                                w-5 h-5
                                                2xl:h-6 2xl:w-6
                                                aspect-square rounded-full
                                                flex items-center justify-center
                                                2xl:text-xs md:text-xs text-xs
                                                ${plan.popular
                                                    ? "bg-white text-primary"
                                                    : "bg-[#F8EEF3] text-primary"
                                                }
                                            `}
                                        >
                                            <FaCheck />
                                        </div>

                                        <span className="2xl:text-base xl:text-xs text-sm leading-relaxed capitalize">
                                            {feature}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {!isCurrent && (
                                <div className="mt-auto">
                                    <button
                                        type="button"
                                        disabled={isPendingDowngrade}
                                        onClick={() =>
                                            handlePurchase(plan)
                                        }
                                        className={`
                                            w-full py-3.5 rounded-2xl
                                            text-sm sm:text-base font-semibold
                                            transition-all duration-300
                                            ${isPendingDowngrade
                                                ? "bg-primary/40 text-white cursor-not-allowed"
                                                : plan.popular
                                                    ? `
                                                            bg-white text-primary
                                                            hover:bg-[#F8EEF3]
                                                        `
                                                    : `
                                                            bg-primary text-white
                                                            hover:bg-primaryDark
                                                        `
                                            }
                                        `}
                                    >
                                        {isPendingDowngrade
                                            ? "Request Pending"
                                            : buttonText}
                                    </button>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <CommonModal
                open={gstModal}
                onDone={handleGstSubmit}
                onClose={closeGstModal}
                title="Enter GST Number"
            >
                <div className="space-y-5">
                    <InputField
                        type="text"
                        placeholder="Enter GST number"
                        value={gstNumber}
                        onChange={(e) =>
                            setGstNumber(
                                e.target.value
                                    .toUpperCase()
                                    .replace(
                                        /[^A-Z0-9]/g,
                                        ""
                                    )
                            )
                        }
                        maxLength={15}
                    />
                </div>
            </CommonModal>

            <CommonModal
                open={downgradeModal}
                onDone={handleDowngradeSubmit}
                onClose={closeDowngradeModal}
                title="Request Downgrade"
            >
                <div className="space-y-5">
                    <p className="text-sm text-gray-600 leading-6">
                        You are requesting to downgrade from{" "}
                        <span className="font-semibold text-heading">
                            {findPackageName(currentPackageName)}
                        </span>{" "}
                        to{" "}
                        <span className="font-semibold text-heading">
                            {findPackageName(
                                downgradePlan?.name
                            )}
                        </span>
                        .
                    </p>

                    <p className="text-sm text-gray-500 leading-6">
                        Your downgrade request will be reviewed before
                        the plan is changed.
                    </p>
                </div>
            </CommonModal>
        </>
    );
};

const PlanPricing = () => {
    const { user, options } = userState();
    const { packages, images, payments } = apiList();
    const { showToast } = useToast();
    const { platformName } = useParams();

    const [selectedPlatform, setSelectedPlatform] =
        useState("amazon");

    const [gstModal, setGstModal] = useState(false);
    const [gstPlan, setGstPlan] = useState(null);
    const [gstNumber, setGstNumber] = useState("");

    const [downgradeModal, setDowngradeModal] =
        useState(false);
    const [downgradePlan, setDowngradePlan] =
        useState(null);

    const {
        data: { platforms = [], pricingData = {} } = {},
    } = useQuery({
        queryKey: ["all-packages"],
        queryFn: () => api.post(packages.all),
        select: ({ data }) => {
            const response = data?.data?.data || [];

            const platforms = [
                ...new Map(
                    response.map((item) => [
                        item.platform?._id,
                        item.platform,
                    ])
                ).values(),
            ];

            const pricingData = [...response]
                .sort((a, b) =>
                    a.name.localeCompare(b.name)
                )
                .reduce((acc, item) => {
                    const platformName =
                        item.platform?.name;

                    if (!platformName) {
                        return acc;
                    }

                    if (!acc[platformName]) {
                        acc[platformName] = [];
                    }

                    acc[platformName].push({
                        package_id: item._id,
                        name: item.name,
                        price: item.price,
                        services: item.services,
                        popular: item.popular,
                    });

                    return acc;
                }, {});

            return {
                platforms,
                pricingData,
            };
        },
    });

    useEffect(() => {
        if (
            platformName &&
            pricingData[platformName]
        ) {
            setSelectedPlatform(platformName);
        }
    }, [platformName, pricingData]);

    const currentPackage = useMemo(() => {
        return user?.package?.find(
            (item) =>
                item.package_id?.platform?.name ===
                selectedPlatform &&
                !item.package_expire_status
        );
    }, [user?.package, selectedPlatform]);

    const expiredPackage = useMemo(() => {
        return user?.package?.find(
            (item) =>
                item.package_id?.platform?.name ===
                selectedPlatform &&
                item.package_expire_status
        );
    }, [user?.package, selectedPlatform]);

    const currentPackageName =
        currentPackage?.package_id?.name || null;

    const packageOrder = useMemo(() => {
        return options?.packageOrders || [];
    }, [options?.packageOrders]);

    const getPackageIndex = useCallback(
        (packageName) => {
            return packageOrder.findIndex(
                (item) => item.value === packageName
            );
        },
        [packageOrder]
    );

    const findPackageName = useCallback(
        (name) => {
            return (
                packageOrder.find(
                    (item) => item.value === name
                )?.label || name
            );
        },
        [packageOrder]
    );

    const downgradeRequest = useMemo(() => {
        if (!user?.downgradeRequests?.length) {
            return null;
        }

        return [...user.downgradeRequests]
            .reverse()
            .find((request) => request?.requested_package_id);
    }, [user?.downgradeRequests]);


    const getPurchaseData = useCallback(
        (packageId) => {
            const purchasedPackage =
                user?.package?.find(
                    (item) =>
                        item.package_id?._id ===
                        packageId
                );

            if (!purchasedPackage) {
                return {
                    purchased: false,
                    expired: false,
                    expireTime: null,
                };
            }

            const expired = Boolean(
                purchasedPackage.package_expire_status
            );

            return {
                purchased: true,
                expired,
                expireTime: expired
                    ? "Renew Package"
                    : purchasedPackage.package_expire
                        ? `Expired At ${unixDisplayDate(
                            purchasedPackage.package_expire
                        )}`
                        : null,
            };
        },
        [user?.package]
    );

    const getPlanState = useCallback(
        (plan) => {
            if (!currentPackageName) {
                return "NEW";
            }

            if (currentPackageName === plan.name) {
                return "CURRENT";
            }

            const currentIndex =
                getPackageIndex(currentPackageName);

            const selectedIndex =
                getPackageIndex(plan.name);

            if (
                currentIndex === -1 ||
                selectedIndex === -1
            ) {
                return "NEW";
            }

            if (selectedIndex > currentIndex) {
                return "UPGRADE";
            }

            if (selectedIndex < currentIndex) {
                return "DOWNGRADE";
            }

            return "NEW";
        },
        [
            currentPackageName,
            getPackageIndex,
        ]
    );

    const getPlanButtonText = useCallback(
        (plan) => {
            const state = getPlanState(plan);

            if (state === "UPGRADE") {
                return "Upgrade";
            }

            if (state === "DOWNGRADE") {
                return "Downgrade";
            }

            if (state === "NEW") {
                return "Get Started";
            }

            return null;
        },
        [getPlanState]
    );

    const closeGstModal = useCallback(() => {
        setGstModal(false);
        setGstPlan(null);
        setGstNumber("");
    }, []);

    const closeDowngradeModal =
        useCallback(() => {
            setDowngradeModal(false);
            setDowngradePlan(null);
        }, []);

    const {
        mutate: requestPaymentHandle,
        isPending: requestPaymentPending,
    } = useMutation({
        mutationFn: (payload) =>
            api.post(
                payments.requestPayment,
                payload
            ),

        onSuccess: ({ data }) => {
            const redirectUrl =
                data?.data?.result?.redirectUrl;

            if (redirectUrl) {
                closeGstModal();
                window.location.href =
                    redirectUrl;
                return;
            }

            showToast(
                "Unable to start payment",
                "error"
            );
        },

        onError: ({ response }) => {
            showToast(
                response?.data?.error
                    ?.error_message ||
                "Unable to start payment",
                "error"
            );
        },
    });

    const {
        mutate: requestDowngradeHandle,
        isPending: requestDowngradePending,
    } = useMutation({
        mutationFn: (payload) =>
            api.post(
                payments.requestDowngrade,
                payload
            ),

        onSuccess: ({ data }) => {
            showToast(
                data?.message ||
                "Downgrade request submitted successfully",
                "success"
            );

            closeDowngradeModal();
        },

        onError: ({ response }) => {
            showToast(
                response?.data?.error
                    ?.error_message ||
                "Unable to submit downgrade request",
                "error"
            );
        },
    });

    const handlePurchase = useCallback(
        (plan) => {
            const state = getPlanState(plan);

            if (state === "CURRENT") {
                return;
            }

            if (state === "DOWNGRADE") {
                setDowngradePlan(plan);
                setDowngradeModal(true);
                return;
            }

            setGstPlan(plan);
            setGstNumber("");
            setGstModal(true);
        },
        [getPlanState]
    );

    const handleGstSubmit = useCallback(() => {
        const gst = gstNumber.trim().toUpperCase();

        if (!gst) {
            showToast("Please enter GST number", "error");
            return;
        }

        if (gst.length !== 15) {
            showToast("Please enter a valid GST number", "error");
            return;
        }

        if (!gstPlan) {
            return;
        }

        const payload = {
            amount: gstPlan.price,
            package_id: gstPlan.package_id,
            gst_number: gst,
        };

        if (downgradeRequest?.requested_package_id) {
            payload.request_package_id =
                downgradeRequest.requested_package_id;
        }

        requestPaymentHandle(payload);
    }, [
        gstNumber,
        gstPlan,
        downgradeRequest,
        requestPaymentHandle,
        showToast,
    ]);

    const handleDowngradeSubmit =
        useCallback(() => {
            if (
                !downgradePlan ||
                !currentPackage
            ) {
                return;
            }

            requestDowngradeHandle({
                current_package_id:
                    currentPackage.package_id?._id,
                requested_package_id:
                    downgradePlan.package_id,
            });
        }, [
            currentPackage,
            downgradePlan,
            requestDowngradeHandle,
        ]);

    const content = useMemo(
        () => (
            <PlanPricingContent
                platforms={platforms}
                pricingData={pricingData}
                selectedPlatform={selectedPlatform}
                setSelectedPlatform={
                    setSelectedPlatform
                }
                images={images}
                getPlanState={getPlanState}
                getPlanButtonText={
                    getPlanButtonText
                }
                getPurchaseData={
                    getPurchaseData
                }
                findPackageName={
                    findPackageName
                }
                handlePurchase={
                    handlePurchase
                }
                gstModal={gstModal}
                gstNumber={gstNumber}
                setGstNumber={setGstNumber}
                handleGstSubmit={
                    handleGstSubmit
                }
                closeGstModal={closeGstModal}
                downgradeModal={
                    downgradeModal
                }
                downgradePlan={downgradePlan}
                currentPackageName={
                    currentPackageName
                }
                handleDowngradeSubmit={
                    handleDowngradeSubmit
                }
                closeDowngradeModal={
                    closeDowngradeModal
                }
                downgradeRequest={
                    downgradeRequest
                }
                currentPackage={currentPackage}
                expiredPackage={expiredPackage}
            />
        ),
        [
            platforms,
            pricingData,
            selectedPlatform,
            images,
            getPlanState,
            getPlanButtonText,
            getPurchaseData,
            findPackageName,
            handlePurchase,
            gstModal,
            gstNumber,
            handleGstSubmit,
            closeGstModal,
            downgradeModal,
            downgradePlan,
            currentPackageName,
            handleDowngradeSubmit,
            closeDowngradeModal,
            downgradeRequest,
            currentPackage,
            expiredPackage,
        ]
    );

    return (
        <>
            {(
                requestPaymentPending ||
                requestDowngradePending
            ) && <Loader />}

            <SectionsUI
                topic="Plans & Pricing"
                heading="Choose Your Marketplace Plan"
                text="Pricing changes based on marketplace platforms. Select your platform to explore custom plans."
                content={content}
                id="platforms"
            />
        </>
    );
};

export default PlanPricing;