import React, {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";
import SectionsUI from "../layouts/SectionsUI";
import { userState } from "../../context/UserContext";
import apiList from "../../config/apiList";
import { useQuery } from "@tanstack/react-query";
import api from "../../config/api";
import { useParams } from "react-router-dom";
import { useToast } from "../../context/ToastContext";
import Loader from "../ui/Loader";
import { unixDisplayDate } from "../ui/DateDisplay";
import { FaCheck } from "react-icons/fa";
import GSTModal from "../ui/GSTModal";
import handlePayment from "../../hooks/handlePayment";

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
    policyAccepted,
    setPolicyAccepted,
}) => {
    const selectedPlans = pricingData[selectedPlatform] || [];

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

                    const isCurrent = planState === "CURRENT";
                    const isDowngrade = planState === "DOWNGRADE";

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

                            {!isCurrent && !isDowngrade && (
                                <div className="mt-auto">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handlePurchase(plan)
                                        }
                                        className={`
                                            w-full py-3.5 rounded-2xl
                                            text-sm sm:text-base font-semibold
                                            transition-all duration-300
                                            ${plan.popular
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
                                        {buttonText}
                                    </button>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <GSTModal open={gstModal} onClose={closeGstModal} onClick={handleGstSubmit} onChange={(e) => { setGstNumber(e?.gst_number || gstNumber), setPolicyAccepted(e?.all_policies_checked || policyAccepted) }} value={{ all_policies_checked: policyAccepted, gst_number: gstNumber }} />
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
    const [policyAccepted, setPolicyAccepted] = useState(false);

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
        setPolicyAccepted(false);
    }, []);

    const { handlePayment: requestPaymentHandle, paymentPending: requestPaymentPending } = handlePayment({ onSuccess: closeGstModal });

    const handlePurchase = useCallback(
        (plan) => {
            const state = getPlanState(plan);

            if (state === "CURRENT") {
                return;
            }

            setGstPlan(plan);
            setGstNumber("");
            setGstModal(true);
            setPolicyAccepted(false);
        },
        [getPlanState]
    );

    const handleGstSubmit = useCallback(() => {
        const gst =
            gstNumber.trim().toUpperCase();

        if (!gst) {
            showToast(
                "Please enter GST number",
                "error"
            );
            return;
        }

        if (gst.length !== 15) {
            showToast(
                "Please enter a valid GST number",
                "error"
            );
            return;
        }

        if (!policyAccepted) {
            showToast(
                "Please accept the Privacy Policy, Terms & Conditions and Refund & Cancellation Policy",
                "error"
            );
            return;
        }

        if (!gstPlan) {
            return;
        }

        requestPaymentHandle({
            amount: gstPlan.price,
            package_id: gstPlan.package_id,
            gst_number: gst,
            all_policies_checked: policyAccepted
        });
    }, [
        gstNumber,
        gstPlan,
        requestPaymentHandle,
        showToast,
        policyAccepted,
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
                closeGstModal={
                    closeGstModal
                }
                policyAccepted={policyAccepted}
                setPolicyAccepted={setPolicyAccepted}
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
        ]
    );

    return (
        <>
            {requestPaymentPending && (
                <Loader />
            )}

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