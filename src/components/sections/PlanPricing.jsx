import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { userState } from '../../context/UserContext';
import apiList from '../../config/apiList';
import { useToast } from '../../context/ToastContext';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../../config/api';
import starterPlan from '../../assets/starterPlan.svg'
import proPlan from '../../assets/proPlan.svg'
import proMaxPlan from '../../assets/proMaxPlan.svg'
import { FaArrowRight, FaCheck } from 'react-icons/fa';
import SectionsUI from '../layouts/SectionsUI';
import GSTModal from '../ui/GSTModal';
import handlePayment from '../../hooks/handlePayment';
import { unixDisplayDate } from '../ui/DateDisplay';

const PlanPricing = () => {

    return (
        <SectionsUI
            topic="Plans & Pricing"
            heading="Choose Your Marketplace Plan"
            text="Pricing changes based on marketplace platforms. Select your platform to explore custom plans."
            content={<Content />}
            id="platforms"
        />
    )
}

const Content = () => {

    const { user, options, setOpen } = userState();
    const { packages, images } = apiList();
    const { showToast } = useToast();
    const { platformName } = useParams();

    const [gstModal, setGstModal] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [gstNumber, setGstNumber] = useState("");
    const [policyAccepted, setPolicyAccepted] = useState(false);
    const [selectedPlatform, setSelectedPlatform] = useState(null);
    const [billingCycle, setBillingCycle] = useState("monthly");
    const [payloadValidity, setPayloadValidity] = useState(null)

    const { data: { platforms = [], pricingData = {} } = {}, } = useQuery({
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
            ].sort((a, b) => {
                if (a?.index == null) return 1;
                if (b?.index == null) return -1;

                return Number(a.index) - Number(b.index);
            });

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

                    const havePurchased = user?.package?.find(list => list.package_id._id == item._id)
                    const packageExpire = havePurchased?.package_expire_status

                    acc[platformName].push({
                        package_id: item._id,
                        name: item.name,
                        image: item.name == '1' ? starterPlan : item.name == '2' ? proPlan : proMaxPlan,
                        priceData: {
                            month_price: item.month_price,
                            year_price: item.year_price,
                            onetime_price: item.onetime_price,
                        },
                        purchasedPackage: !!havePurchased,
                        validTill: unixDisplayDate(havePurchased?.package_expire),
                        packageExpire: !!packageExpire,
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

    useEffect(() => {
        if (platforms?.length) {
            setSelectedPlatform(platforms[0]?.name);
        }
    }, [platforms]);

    const packageOrder = useMemo(() => {
        return options?.packageOrders || [];
    }, [options?.packageOrders]);

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

    const getPriceValidity = useCallback((priceData) => {
        return {
            price: priceData?.onetime_price ? priceData?.onetime_price : billingCycle == "monthly" ? priceData?.month_price : priceData?.year_price,
            validity: priceData?.onetime_price ? 'one time' : billingCycle == 'monthly' ? 'month' : 'year'
        }
    }, [billingCycle])

    const handleGetStarted = useCallback((plan, validity) => {
        if (!user?.token) {
            setOpen(true)
            return
        }

        setSelectedPackage(plan);
        setPayloadValidity(validity);
        setGstModal(true);
        setPolicyAccepted(false);
    }, [user]);

    const closeGstModal = useCallback(() => {
        setGstModal(false);
        setSelectedPackage(null);
        setGstNumber("");
        setPolicyAccepted(false);
    }, []);

    const { handlePayment: requestPaymentHandle, paymentPending: requestPaymentPending } = handlePayment({ onSuccess: closeGstModal });

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

        if (!policyAccepted) {
            showToast("Please accept the Privacy Policy, Terms & Conditions and Refund & Cancellation Policy", "error");
            return;
        }

        if (!selectedPackage) return;

        requestPaymentHandle({ package_id: selectedPackage, gst_number: gst, all_policies_checked: policyAccepted, billing_period: payloadValidity.replace(/\s/g, "") });
    }, [gstNumber, selectedPackage, requestPaymentHandle, showToast, policyAccepted, payloadValidity]);

    const currentPackageRank = useMemo(() => {
        const currentPackage = user?.package?.find(pkg => !pkg.package_expire_status && pkg.package_id?.platform?.name === selectedPlatform);
        return currentPackage?.package_id?.name
    }, [user?.package, selectedPlatform])

    return (
        <div className='mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-6 px-2 sm:px-0'>
            <div className="grid w-full grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:justify-center sm:gap-4">
                {platforms?.map((list, i) => (
                    <PlatFormBtn name={list?.name} key={i} image={images?.imgUrl + list?.image?.image} active={list.name == selectedPlatform} onClick={setSelectedPlatform} />
                ))}
            </div>
            <div className="flex justify-center">
                <div className="relative flex w-full max-w-[280px] items-center rounded-full border border-[#DCC5D1] bg-white p-1 shadow-sm">
                    <button
                        type="button"
                        onClick={() => setBillingCycle("monthly")}
                        className={`flex-1 rounded-full px-6 py-2.5 text-sm font-semibold transition-all ${billingCycle === "monthly"
                            ? "bg-primary text-white shadow-md"
                            : "text-gray-600 hover:text-primary"
                            }`}
                    >
                        Monthly
                    </button>

                    <button
                        type="button"
                        onClick={() => setBillingCycle("yearly")}
                        className={`relative flex-1 rounded-full px-6 py-2.5 text-sm font-semibold transition-all ${billingCycle === "yearly"
                            ? "bg-primary text-white shadow-md"
                            : "text-gray-600 hover:text-primary"
                            }`}
                    >
                        Yearly

                    </button>
                </div>
            </div>
            <div className="grid w-full grid-cols-1 items-stretch gap-5 md:grid-cols-2 xl:grid-cols-3 sm:gap-8">
                {pricingData[selectedPlatform]?.map((list) => (
                    <PackageUi
                        services={list.services}
                        name={findPackageName(list.name)}
                        package_id={list.package_id}
                        ss={list}
                        popular={list.popular}
                        price={getPriceValidity(list.priceData)?.price}
                        image={list.image}
                        validity={getPriceValidity(list.priceData)?.validity}
                        onClick={handleGetStarted}
                        purchasedPackage={list.purchasedPackage}
                        packageExpire={list.packageExpire}
                        rank={list.name}
                        validTill={list.validTill}
                        currentPackageRank={currentPackageRank}
                    />
                ))}
            </div>
            {gstModal && (
                <GSTModal
                    open={gstModal}
                    onClose={closeGstModal}
                    onClick={handleGstSubmit}
                    onChange={(e) => { setGstNumber(e?.gst_number ?? gstNumber), setPolicyAccepted(Object.hasOwn(e, "all_policies_checked") ? e?.all_policies_checked : policyAccepted) }}
                    value={{ all_policies_checked: policyAccepted, gst_number: gstNumber }}
                />
            )}
        </div>
    )
}

const PackageUi = ({ services, name, price, popular, image, validity, onClick, package_id, purchasedPackage, rank, currentPackageRank, packageExpire, validTill }) => {

    const isCurrentPackage = purchasedPackage && !packageExpire && rank === currentPackageRank;
    const isUpgrade = !packageExpire && currentPackageRank && rank > currentPackageRank;

    const buttonConfig = packageExpire
        ? {
            label: "Renew Plan",
            disabled: false,
        }
        : isCurrentPackage
            ? {
                label: validity === "one time"
                    ? "Current Plan"
                    : `Expired At ${validTill}`,
                disabled: true,
            }
            : isUpgrade
                ? {
                    label: "Upgrade",
                    disabled: false,
                }
                : {
                    label: "Get Started",
                    disabled: false,
                };

    return (
        <div key={package_id}
            className={`relative flex h-full min-h-[420px] w-full flex-col rounded-xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${popular
                ? "border-2 border-primary md:scale-105"
                : "border border-gray-100"
                }`}
        >
            {popular &&
                <div className="absolute left-0 top-0 w-fit rounded-br-lg rounded-tl-lg bg-primary px-3 py-1 text-xs font-medium text-white">
                    Most popular
                </div>
            }

            <div className="flex w-full flex-1 flex-col p-5">
                <div className="flex items-center justify-between gap-2 sm:gap-3">
                    <div className="flex min-w-0 flex-col gap-3">
                        <span className="text-lg font-bold  text-primary">
                            {name}
                        </span>

                        <div className="flex flex-wrap items-end gap-2">
                            <span className="text-3xl font-bold leading-none text-[#211B4A] sm:text-4xl">
                                &#8377;{price}
                            </span>

                            <span className="mb-1 text-sm text-gray-500 sm:text-base capitalize">
                                / {validity}
                            </span>
                        </div>
                    </div>

                    {image && (
                        <img
                            src={image}
                            alt={name}
                            className="h-20 w-20 shrink-0 object-contain sm:h-24 sm:w-24 lg:h-32 lg:w-32"
                        />
                    )}
                </div>

                <div className="mt-7">
                    <p className="mb-4 text-sm font-semibold text-gray-700">
                        Included
                    </p>

                    <div className="flex flex-col gap-3">
                        {services?.map((service, index) => (
                            <div
                                key={index}
                                className="flex items-start gap-2 text-sm leading-5 text-gray-600"
                            >
                                <div className="flex h-5 w-5 shrink-0 aspect-square items-center justify-center rounded-full bg-[#F8EEF3] text-xs text-primary 2xl:h-6 2xl:w-6">
                                    <FaCheck />
                                </div>

                                <span className="min-w-0 break-words">{service}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-auto pt-8">
                    <button
                        type="button"
                        disabled={buttonConfig.disabled}
                        onClick={
                            buttonConfig.disabled
                                ? undefined
                                : () => onClick(package_id, validity)
                        }
                        className={`flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all ${buttonConfig.disabled
                                ? "cursor-not-allowed bg-gray-200 text-gray-500"
                                : "bg-primary text-white hover:shadow-lg"
                            }`}
                    >
                        <span>{buttonConfig.label}</span>

                        {!buttonConfig.disabled && (
                            <FaArrowRight aria-hidden="true" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

const PlatFormBtn = ({ key, image, name, active, onClick }) => {
    return (
        <button
            key={key}
            type="button"
            onClick={() => onClick(name)}
            className={`flex min-h-14 w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-center shadow-xl transition-all duration-300 ease-out hover:scale-[1.02] sm:min-h-0 sm:w-auto sm:gap-4 sm:px-6 sm:py-3 ${active ? 'bg-primary text-white' : 'bg-white'}`}
        >
            <img src={image} alt="" className='h-8 w-8 shrink-0 rounded-lg object-contain sm:h-9 sm:w-9' />
            <span className='capitalize font-semibold leading-tight'>
                {name}
            </span>
        </button>
    )
}

export default PlanPricing
