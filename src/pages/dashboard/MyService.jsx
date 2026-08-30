import React, { useCallback, useMemo } from "react";
import {
  FaCheck,
  FaCalendarAlt,
  FaClock,
  FaCrown,
  FaShoppingBag,
  FaHistory,
  FaArrowUp,
  FaRedo,
  FaEye,
} from "react-icons/fa";
import PageTitleAddbtn from "../ui/PageTitleAddbtn";
import { userState } from "../../context/UserContext";
import { displayDateTime, remainingDaysUnix, unixDisplayDate } from "../../components/ui/DateDisplay";
import { Link } from "react-router-dom";

const MyService = () => {

  const { user, options } = userState();

  const activeServices = useMemo(() => user?.package?.filter(list => !list.package_expire_status), [user?.package]);
  const oldServices = useMemo(() => user?.package?.filter(list => list.package_expire_status), [user?.package]);

  const packageOrder = useMemo(() => {
    return options?.packageOrders || [];
  }, [options?.packageOrders]);

  const getPackageName = useCallback((packageName) => {
    return packageOrder.find((item) => item.value === packageName)?.label;
  }, [packageOrder]);

  return (
    <div className="w-full">

      {/* HEADER */}
      <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <PageTitleAddbtn title="My Service" />

          <p className="mt-1 text-sm text-gray-600">
            Manage your active services and view your service history.
          </p>
        </div>

        <Link
          to="/platforms"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#b5688d] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#a4577d] sm:w-auto"
        >
          <FaShoppingBag />
          Explore Plans
        </Link>

      </div>


      {/* ===================================== */}
      {/* ACTIVE SERVICES */}
      {/* ===================================== */}

      <section>

        {/* Section Header */}
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-medium text-gray-900">
                Active Services
              </span>

              <span className="rounded-full bg-[#f8e8f0] px-2.5 py-1 text-xs font-bold text-[#b5688d]">
                {activeServices?.length}
              </span>
            </div>

            <p className="mt-1 text-sm text-gray-500">
              Your currently active marketplace services.
            </p>
          </div>

        </div>


        {activeServices?.length > 0 ? (

          <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">

            {activeServices?.map((service) => (

              <div
                key={service._id}
                className="overflow-hidden rounded-2xl border border-[#ead5df] bg-white shadow-sm transition hover:shadow-md"
              >

                {/* CARD TOP */}
                <div className="border-b border-[#ead5df] bg-[#fdf1f7] p-5 sm:p-6">

                  <div className="flex items-start justify-between gap-4">

                    <div>

                      <div className="mb-2 flex flex-wrap items-center gap-2">

                        <span className="rounded-full bg-[#b5688d] px-3 py-1 text-[11px] font-semibold text-white capitalize">
                          {service?.package_id?.platform?.name}
                        </span>

                        <span className="flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-[11px] font-semibold text-green-700">
                          <span className="h-2 w-2 rounded-full bg-green-500" />
                          Active
                        </span>

                      </div>

                      <h3 className="text-2xl font-bold text-gray-900">
                        {getPackageName(service?.package_id?.name)}
                      </h3>

                    </div>

                    <FaCrown className="mt-1 shrink-0 text-xl text-[#b5688d]" />

                  </div>


                  {/* PRICE */}
                  <div className="mt-4">

                    <span className="text-2xl font-bold text-[#a34f78]">
                      ₹ {service?.package_id?.price?.toLocaleString("en-IN")}
                    </span>

                    <span className="ml-1 text-sm text-gray-500">
                      /month
                    </span>

                  </div>

                </div>


                {/* CARD BODY */}
                <div className="p-5 sm:p-6">

                  {/* DATES */}
                  <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2">

                    <div className="flex items-center gap-3">

                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#fdf1f7] text-[#b5688d]">
                        <FaCalendarAlt />
                      </div>

                      <div>
                        <p className="text-xs text-gray-500">
                          Start Date
                        </p>

                        <p className="text-sm font-semibold text-gray-900">
                          {displayDateTime(service.createdAt)}
                        </p>
                      </div>

                    </div>


                    <div className="flex items-center gap-3">

                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#fdf1f7] text-[#b5688d]">
                        <FaCalendarAlt />
                      </div>

                      <div>
                        <p className="text-xs text-gray-500">
                          Valid Till
                        </p>

                        <p className="text-sm font-semibold text-gray-900">
                          {unixDisplayDate(service.package_expire)}
                        </p>
                      </div>

                    </div>

                  </div>


                  {/* REMAINING DAYS */}
                  <div className="mb-5 rounded-lg bg-[#fdf8fb] p-3">

                    <div className="flex items-center justify-between gap-3">

                      <div className="flex items-center gap-2">
                        <FaClock className="text-[#b5688d]" />

                        <span className="text-sm text-gray-600">
                          Service Validity
                        </span>
                      </div>

                      <span className="text-sm font-bold text-[#b5688d]">
                        {remainingDaysUnix(service.createdAt, service.package_expire)} days remaining
                      </span>

                    </div>

                    {/* Progress */}
                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-gray-200">

                      <div
                        className="h-full rounded-full bg-[#b5688d]"
                        style={{ width: `${Math.min((remainingDaysUnix(service.createdAt, service.package_expire) / 30) * 100, 100)}%`, }}
                      />

                    </div>

                  </div>


                  {/* FEATURES */}
                  <div>

                    <h4 className="mb-3 text-sm font-bold text-gray-900">
                      Included Features
                    </h4>

                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">

                      {service?.package_id?.services?.slice(0, 4).map((feature, index) => (

                        <div
                          key={index}
                          className="flex items-start gap-2 text-xs text-gray-600"
                        >
                          <FaCheck className="mt-0.5 shrink-0 text-[#b5688d]" />

                          <span>
                            {feature}
                          </span>
                        </div>

                      ))}

                    </div>

                  </div>


                  {/* ACTIONS */}
                  <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                    <button
                      type="button"
                      className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#b5688d] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#a4577d]"
                    >
                      <FaArrowUp />
                      Upgrade
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        ) : (

          <div className="rounded-xl border border-dashed border-gray-300 bg-white px-5 py-12 text-cente flex flex-col gap-3 justify-center items-center">

            <FaShoppingBag className="mx-auto text-3xl text-gray-300" />

            <h3 className="font-semibold text-gray-700">
              No Active Services
            </h3>

            <p className=" text-sm text-gray-500">
              You don't have any active services right now.
            </p>

            <Link
              to="/platforms"
              className="rounded-lg bg-[#b5688d] px-5 py-2.5 text-sm font-semibold text-white"
            >
              Explore Plans
            </Link>

          </div>

        )}

      </section>


      {/* ===================================== */}
      {/* SERVICE HISTORY */}
      {/* ===================================== */}

      {oldServices?.length > 0 &&
        <section className="mt-10">

          <div className="mb-4 flex items-center gap-3">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f8e8f0] text-[#b5688d]">
              <FaHistory />
            </div>

            <div>
              <h2 className="text-lg font-medium text-gray-900">
                Service History
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Your previously purchased services.
              </p>
            </div>

          </div>


          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">

            {oldServices?.map((service) => (

              <div
                key={service._id}
                className="rounded-xl border border-gray-200 bg-white p-5 transition hover:border-[#d8a9bf] hover:shadow-sm"
              >

                <div className="flex items-start justify-between gap-3">

                  <div>
                    <h3 className="font-bold text-gray-900">
                      {getPackageName(service?.package_id?.name)}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      ₹ {service?.package_id?.price?.toLocaleString("en-IN")} /month
                    </p>
                  </div>

                  <span className="rounded-full border border-red-200 bg-red-50 px-3 py-1 text-[11px] font-semibold text-red-600">
                    Expired
                  </span>

                </div>


                <div className="my-4 border-t border-gray-100" />


                <div className="space-y-3">

                  <div className="flex items-center justify-between gap-3">

                    <span className="text-xs text-gray-500">
                      Start Date
                    </span>

                    <span className="text-xs font-semibold text-gray-800">
                      {displayDateTime(service.createdAt)}
                    </span>

                  </div>

                  <div className="flex items-center justify-between gap-3">

                    <span className="text-xs text-gray-500">
                      Expired On
                    </span>

                    <span className="text-xs font-semibold text-gray-800">
                      {unixDisplayDate(service.package_expire)}
                    </span>

                  </div>

                </div>


                <button
                  type="button"
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg border border-[#b5688d] px-4 py-2.5 text-sm font-semibold text-[#b5688d] transition hover:bg-[#b5688d] hover:text-white"
                >
                  <FaRedo />
                  Renew Plan
                </button>

              </div>

            ))}

          </div>

        </section>
      }

      {/* ===================================== */}
      {/* BOTTOM CTA */}
      {/* ===================================== */}

      {/* <div className="mt-8 flex flex-col gap-4 rounded-xl border border-[#ead5df] bg-white p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">

        <div>
          <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
            Need a Different Plan?
          </h3>

          <p className="mt-1 text-sm text-gray-600">
            Explore more plans and grow your business.
          </p>
        </div>

        <button
          type="button"
          className="flex w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-[#b5688d] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#a4577d] sm:w-auto"
        >
          <FaCrown />
          View All Plans
        </button>

      </div> */}

    </div>
  );
};

export default MyService;