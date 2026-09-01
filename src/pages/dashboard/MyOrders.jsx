import React, { useState } from "react";
import {
    FaCalendarAlt,
    FaCheckCircle,
    FaClock,
    FaDownload,
    FaEye,
    FaFileInvoice,
    FaShoppingBag,
    FaTimesCircle,
} from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import PageTitleAddbtn from "../ui/PageTitleAddbtn";
import apiList from "../../config/apiList";
import api from "../../config/api";
import { userState } from "../../context/UserContext";
import PaginationData from "../ui/PaginationData";
import { displayDateTime } from "../../components/ui/DateDisplay";


const STATUS_CONFIG = {
    COMPLETED: {
        label: "Completed",
        badge: "bg-green-50 text-green-600 border-green-200",
        icon: FaCheckCircle,
    },

    PENDING: {
        label: "Pending",
        badge: "bg-orange-50 text-orange-600 border-orange-200",
        icon: FaClock,
    },

    FAILED: {
        label: "Failed",
        badge: "bg-red-50 text-red-500 border-red-200",
        icon: FaTimesCircle,
    },
};


const TABS = [
    {
        label: "All Orders",
        value: "all",
        icon: FaShoppingBag,
    },
    {
        label: "Completed",
        value: "COMPLETED",
        icon: FaCheckCircle,
    },
    {
        label: "Failed",
        value: "FAILED",
        icon: FaTimesCircle,
    },
];


const SUMMARY_CARDS = [
    {
        label: "Total Orders",
        type: "all",
        icon: FaShoppingBag,
        iconClass: "bg-primary/10 text-primary",
    },
    {
        label: "Completed",
        type: "completed",
        icon: FaCheckCircle,
        iconClass: "bg-green-50 text-green-500",
    },
    {
        label: "Failed",
        type: "failed",
        icon: FaTimesCircle,
        iconClass: "bg-red-50 text-red-500",
    },
];


const MyOrders = () => {
    const { payments } = apiList();
    const { user, options } = userState();

    const [activeTab, setActiveTab] = useState("all");

    const [pagination, setPagination] = useState({
        page: 1,
        limit: 5,
    });

    const { data: statusCounts = {} } = useQuery({
        queryKey: ["customerOrdersCounts"],
        queryFn: () => api.get(payments.customerOrdersCounts),
        enabled: !!user,
        select: ({ data }) => data.data.result,
    });

    const {
        data: {
            data: allOrders,
            pagination: paginationData = {},
        } = {},
        isFetching,
    } = useQuery({
        queryKey: ["customerOrders", pagination, activeTab],

        queryFn: () =>
            api.post(payments.customerOrders, {
                ...pagination,
                payment_status: activeTab,
            }),

        enabled: !!user,

        select: ({ data }) => data.data.result,
    });

    const getPackageName = (packageName) => {
        const packageOrder =
            options?.packageOrders || [];

        return (
            packageOrder.find(
                (item) => item.value === packageName
            )?.label || packageName || "-"
        );
    };

    const getStatus = (status) => {
        return (
            STATUS_CONFIG[status?.toUpperCase()] || {
                label: status || "Unknown",
                badge:
                    "bg-gray-50 text-gray-600 border-gray-200",
                icon: FaClock,
            }
        );
    };

    const getTabCount = (value) => {
        if (value === "all") {
            return statusCounts?.total || 0;
        }

        return (
            statusCounts?.[value.toLowerCase()] || 0
        );
    };

    const handleTabChange = (value) => {
        setActiveTab(value);

        setPagination((prev) => ({
            ...prev,
            page: 1,
        }));
    };

    const handlePagination = (data) => {
        setPagination(data);
    };


    const handleDownloadReceipt = (order) => {
        console.log("Download receipt:", order);

        // Add your PDF receipt API here
    };

    // if (isLoading) {
    //     return <MyOrdersSkeleton />;
    // }

    return (
        <div className="w-full">

            {/* Header */}
            <div className="mb-7">
                <PageTitleAddbtn title="My Orders" />

                <p className="mt-2 text-sm text-paragraph">
                    View your package purchase history and payment details.
                </p>
            </div>
            <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">

                {SUMMARY_CARDS.map((card) => {
                    const Icon = card.icon;

                    const count =
                        card.type === "all"
                            ? statusCounts?.total || 0
                            : statusCounts?.[card.type] || 0;

                    return (
                        <div
                            key={card.type}
                            className="rounded-2xl border border-borderColor bg-white p-5 shadow-sm"
                        >
                            <div className="flex items-center gap-4">

                                <div
                                    className={`flex h-12 w-12 items-center justify-center rounded-xl text-lg ${card.iconClass}`}
                                >
                                    <Icon />
                                </div>

                                <div>
                                    <p className="text-sm text-paragraph">
                                        {card.label}
                                    </p>

                                    <h3 className="mt-1 text-2xl font-bold text-heading">
                                        {count}
                                    </h3>
                                </div>

                            </div>
                        </div>
                    );
                })}

            </div>

            <div className="overflow-hidden rounded-2xl border border-borderColor bg-white shadow-sm">
                <div className="border-b border-borderColor p-5 sm:p-6">

                    <h2 className="text-xl font-bold text-heading">
                        Purchase History
                    </h2>

                    <p className="mt-1 text-sm text-paragraph">
                        View all your package orders and payment transactions.
                    </p>
                    <div className="mt-5 flex w-full gap-2 overflow-x-auto border-b border-borderColor">

                        {TABS.map((tab) => {
                            const Icon = tab.icon;

                            return (
                                <button
                                    key={tab.value}
                                    onClick={() =>
                                        handleTabChange(tab.value)
                                    }
                                    className={`flex shrink-0 items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition ${activeTab === tab.value
                                        ? "border-primary text-primary"
                                        : "border-transparent text-paragraph hover:text-primary"
                                        }`}
                                >
                                    <Icon />

                                    {tab.label}

                                    <span
                                        className={`rounded-full px-2 py-0.5 text-xs ${activeTab === tab.value
                                            ? "bg-primary/10 text-primary"
                                            : "bg-background text-paragraph"
                                            }`}
                                    >
                                        {getTabCount(tab.value)}
                                    </span>

                                </button>
                            );
                        })}

                    </div>

                </div>
                {/* Fetching */}
                {isFetching ? (
                    <OrdersDataSkeleton />
                ) :
                    <div className="divide-y divide-borderColor">

                        {allOrders?.length > 0 ? (
                            allOrders.map((order) => {
                                const status = getStatus(
                                    order?.payment_status
                                );

                                const StatusIcon = status.icon;

                                const packageName = getPackageName(
                                    order?.package_id?.name
                                );

                                return (
                                    <div
                                        key={order?._id}
                                        className="p-5 transition hover:bg-background/40 sm:p-6"
                                    >
                                        <div className="flex flex-col gap-6">

                                            {/* Top */}

                                            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                                                {/* Package Info */}

                                                <div className="flex items-start gap-4">

                                                    <div>

                                                        <div className="flex flex-wrap items-center gap-3">

                                                            <h3 className="text-lg font-bold text-heading capitalize">
                                                                {packageName}
                                                            </h3>


                                                            {/* Status */}

                                                            <span
                                                                className={`flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium ${status.badge}`}
                                                            >
                                                                <StatusIcon />

                                                                {status.label}
                                                            </span>

                                                        </div>


                                                        {/* Marketplace */}

                                                        <p className="mt-2 text-sm text-paragraph">

                                                            Marketplace:

                                                            <span className="ml-1 font-semibold capitalize text-heading">
                                                                {order?.package_id?.platform?.name ||
                                                                    order?.platform ||
                                                                    "-"}
                                                            </span>

                                                        </p>


                                                        {/* Order ID */}

                                                        <p className="mt-1 text-sm text-paragraph">

                                                            Order ID:

                                                            <span className="ml-1 font-medium text-heading">
                                                                #
                                                                {order?.merchant_order_id ||
                                                                    order?.orderId ||
                                                                    order?._id}
                                                            </span>

                                                        </p>

                                                    </div>

                                                </div>


                                                {/* Amount */}

                                                <div className="lg:text-right">

                                                    <p className="text-xs text-paragraph">
                                                        Amount Paid
                                                    </p>

                                                    <p className="mt-1 text-xl font-bold text-primary">
                                                        ₹
                                                        {order?.amount ||
                                                            order?.price ||
                                                            0}
                                                    </p>

                                                </div>

                                            </div>


                                            {/* Bottom Details */}

                                            <div className="grid grid-cols-1 gap-4 rounded-xl bg-background/60 p-4 sm:grid-cols-2 lg:grid-cols-4">


                                                {/* Order Date */}

                                                <div>

                                                    <div className="flex items-center gap-2 text-xs text-paragraph">
                                                        <FaCalendarAlt className="text-primary" />

                                                        Order Date
                                                    </div>

                                                    <p className="mt-2 text-sm font-semibold text-heading">
                                                        {displayDateTime(order?.createdAt)}
                                                    </p>

                                                </div>


                                                {/* Payment Status */}

                                                <div>

                                                    <div className="flex items-center gap-2 text-xs text-paragraph">
                                                        <StatusIcon className="text-primary" />

                                                        Payment Status
                                                    </div>

                                                    <p className="mt-2 text-sm font-semibold text-heading">
                                                        {status.label}
                                                    </p>

                                                </div>


                                                {/* View Details */}

                                                {/* <button className="flex items-center justify-center gap-2 rounded-lg border border-primary bg-white px-4 py-3 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white">

                                                <FaEye />

                                                View Details

                                            </button> */}


                                                {/* Receipt */}

                                                {/* <button
                                                onClick={() =>
                                                    handleDownloadReceipt(order)
                                                }
                                                disabled={
                                                    order?.payment_status?.toUpperCase() !==
                                                    "COMPLETED"
                                                }
                                                className={`flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold text-white transition ${order?.payment_status?.toUpperCase() ===
                                                    "COMPLETED"
                                                    ? "bg-primary hover:bg-primaryDark"
                                                    : "cursor-not-allowed bg-gray-300"
                                                    }`}
                                            >
                                                <FaDownload />

                                                Download Receipt

                                            </button> */}

                                            </div>

                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <EmptyOrders activeTab={activeTab} />
                        )}

                    </div>
                }
            </div>


            {/* Pagination */}

            {paginationData?.total > 0 && (
                <div className="mt-5 flex justify-end">

                    <PaginationData
                        {...paginationData}
                        onChange={handlePagination}
                    />

                </div>
            )}

        </div>
    );
};

const EmptyOrders = ({ activeTab }) => {
    return (
        <div className="flex flex-col items-center justify-center px-5 py-16 text-center">

            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-2xl text-primary">
                <FaFileInvoice />
            </div>

            <h3 className="mt-5 text-lg font-bold text-heading">
                No{" "}
                {activeTab !== "all"
                    ? activeTab.toLowerCase()
                    : ""}{" "}
                orders found
            </h3>

            <p className="mt-2 max-w-sm text-sm text-paragraph">
                You don't have any orders in this category yet.
            </p>

        </div>
    );
};

const SkeletonBox = ({ className = "" }) => {
    return (
        <div
            className={`rounded bg-borderColor ${className}`}
        />
    );
};


const OrderSkeletonItem = () => {
    return (
        <div className="border-b border-borderColor p-5 sm:p-6">

            <div className="flex flex-col gap-6">

                {/* Top */}

                <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">

                    {/* Package Information */}

                    <div className="space-y-3">

                        <SkeletonBox className="h-5 w-40" />

                        <SkeletonBox className="h-4 w-48" />

                        <SkeletonBox className="h-4 w-36" />

                    </div>


                    {/* Amount */}

                    <div className="space-y-3 lg:text-right">

                        <SkeletonBox className="h-3 w-20" />

                        <SkeletonBox className="h-7 w-24" />

                    </div>

                </div>


                {/* Details */}

                <div className="grid grid-cols-1 gap-4 rounded-xl bg-background/60 p-4 sm:grid-cols-2 lg:grid-cols-4">

                    {[1, 2, 3, 4].map((item) => (
                        <div key={item}>

                            <SkeletonBox className="h-3 w-24" />

                            <SkeletonBox className="mt-3 h-5 w-32" />

                        </div>
                    ))}

                </div>

            </div>

        </div>
    );
};


const OrdersDataSkeleton = () => {
    return (
        <div className="animate-pulse divide-y divide-borderColor">

            {[1, 2, 3].map((item) => (
                <OrderSkeletonItem key={item} />
            ))}

        </div>
    );
};


const MyOrdersSkeleton = () => {
    return (
        <div className="w-full animate-pulse">

            {/* Header */}

            <div className="mb-7">

                <SkeletonBox className="h-8 w-40 rounded-lg" />

                <SkeletonBox className="mt-3 h-4 w-72 max-w-full" />

            </div>


            {/* Summary */}

            <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">

                {[1, 2, 3].map((item) => (
                    <div
                        key={item}
                        className="rounded-2xl border border-borderColor bg-white p-5 shadow-sm"
                    >

                        <div className="flex items-center gap-4">

                            <SkeletonBox className="h-12 w-12 rounded-xl" />

                            <div>

                                <SkeletonBox className="h-4 w-24" />

                                <SkeletonBox className="mt-3 h-7 w-14" />

                            </div>

                        </div>

                    </div>
                ))}

            </div>


            {/* Orders */}

            <div className="overflow-hidden rounded-2xl border border-borderColor bg-white shadow-sm">

                {/* Orders Header */}

                <div className="border-b border-borderColor p-5 sm:p-6">

                    <SkeletonBox className="h-6 w-48" />

                    <SkeletonBox className="mt-3 h-4 w-72 max-w-full" />


                    {/* Tabs */}

                    <div className="mt-6 flex gap-3">

                        {[1, 2, 3].map((item) => (
                            <SkeletonBox
                                key={item}
                                className="h-10 w-28 rounded-lg"
                            />
                        ))}

                    </div>

                </div>


                {/* Orders List */}

                <OrdersDataSkeleton />

            </div>

        </div>
    );
};


export default MyOrders;