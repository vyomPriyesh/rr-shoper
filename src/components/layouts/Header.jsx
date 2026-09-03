import { useEffect, useRef, useState } from "react";
import {
  FaBars,
  FaTimes,
  FaChevronDown,
  FaSignOutAlt,
} from "react-icons/fa";
import Logo from "../sections/Logo";
import { Link, NavLink } from "react-router-dom";
import { userState } from "../../context/UserContext";
import apiList from "../../config/apiList";
import { useToast } from "../../context/ToastContext";
import { useQuery } from "@tanstack/react-query";
import api from "../../config/api";

const Header = ({ dashboardRoutes }) => {

  const { user, logout, setUser } = userState();
  const { auth, images } = apiList();
  const { showToast } = useToast();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef(null);

  const NAV_LINKS = [
    {
      label: "Home",
      to: "/",
    },
    {
      label: "Services",
      to: "/services",
    },
    {
      label: "Platforms",
      to: "/platforms",
    },
    // {
    //   label: "About",
    //   to: "/about",
    // },
    {
      label: "Contact",
      to: "/contact",
    },
  ];

  const { data: profileData, error: profileErrorData, isError: profileError } = useQuery({
    queryKey: ["profile", user?.token],
    queryFn: async () => {
      const response = await api.get(auth.profile, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      return response.data.data.result;
    },
    refetchInterval: 60 * 60 * 1000,
    enabled: !!user?.token,
  });

  useEffect(() => {
    if (profileError) {
      if (profileErrorData?.response?.status == 401) {
        showToast(profileErrorData?.response?.data?.error?.error_message?.message, "error")
        logout();
        return
      }
    } else {
      if (profileData) {
        const newProdileData = {
          ...user,
          ...profileData
        }
        setUser(newProdileData)
      }
    }
  }, [profileData, profileError])

  // Close profile dropdown when clicking outside

  const linksClass = `
    relative text-[#000000]
    font-medium transition-all duration-300
    cursor-pointer hover:text-[#A36081]
    after:absolute after:bottom-0 after:left-0
    after:h-0.5 after:bg-[#A36081] 2xl:text-base md:text-xs lg:text-sm text-sm
    after:w-0 after:transition-all
    after:duration-300 after:ease-in-out hover:after:w-full`;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
  };

  return (
    <header className="fixed top-0 z-50 w-full border-b border-gray-200 bg-white">
      <div className="mx-auto container flex  2xl:h-20 xl:h-14 lg:h-20 md:h-14 h-14 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Logo />
        </div>
        <div className="flex items-center md:gap-10">
          <nav className="hidden items-center gap-10 lg:flex">
            {NAV_LINKS.map(
              ({ label, to }) => (
                <NavLink key={to} to={to}
                  // onClick={handleMenuClick}
                  className={({
                    isActive,
                  }) =>
                    `${linksClass} ${isActive ? "text-primary after:w-full" : ""}`
                  }
                >
                  {label}
                </NavLink>
              )
            )}
          </nav>
          {user &&
            <div ref={profileRef} className="relative">
              <button
                type="button"
                onClick={() => { setProfileOpen((prev) => !prev), setMobileMenuOpen(false)} }}
                className="flex items-center gap-3 rounded-lg p-1.5 transition hover:bg-gray-100"
              >
                <img src={user?.image?.image ? images?.imgUrl + user?.image?.image : `https://ui-avatars.com/api/?background=B06A8D&color=fff&name=${user?.name || 'RR'}`}
                  alt="Profile"
                  className="2xl:h-9 2xl:w-9 md:h-8 md:w-8 w-8 h-8 rounded-full object-cover"
                />

                <div className="hidden text-left sm:block">
                  <p className="2xl:text-sm md:text-sm text-xs font-semibold text-gray-900">
                    {user?.name}
                  </p>
                </div>

                <FaChevronDown
                  className={`hidden 2xl:text-sm md:text-[10px] text-[10px] text-gray-500 transition-transform duration-300 sm:block ${profileOpen ? "rotate-180" : "rotate-0"
                    }`}
                />
              </button>

              {/* PROFILE DROPDOWN */}
              <div
                className={`absolute right-0 z-10 top-full mt-2 w-56 origin-top-right overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl transition-all duration-200 ease-out ${profileOpen
                  ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
                  : "pointer-events-none -translate-y-2 scale-95 opacity-0"
                  }`}
              >
                <div className="border-b border-gray-100 px-4 py-3 sm:hidden">
                  <p className="font-semibold text-gray-900">
                    {user?.name}
                  </p>
                </div>
                <div className="py-2">
                  {dashboardRoutes?.map((list, index) => (
                    <Link
                      to={`/${list.to}`}
                      onClick={() => setProfileOpen(false)}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-gray-700 transition hover:bg-gray-100"
                    >
                      {list.icon && <list.icon className="text-gray-500" />}
                      {list.name}
                    </Link>
                  ))}
                  <div className="my-2 border-t border-gray-100" />
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
                  >
                    <FaSignOutAlt />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          }

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 transition hover:bg-gray-100 lg:hidden"
          >
            <div
              className={`transition-transform duration-300 ${mobileMenuOpen ? "rotate-180" : "rotate-0"
                }`}
            >
              {mobileMenuOpen ? (
                <FaTimes size={22} />
              ) : (
                <FaBars size={22} />
              )}
            </div>
          </button>
        </div>
      </div>

      {/* MOBILE MENU WITH OPEN / CLOSE ANIMATION */}
      <div
        className={`fixed left-0 right-0 top-14 z-40 overflow-hidden bg-white transition-all duration-300 ease-in-out md:top-20 lg:hidden ${mobileMenuOpen
          ? "max-h-[calc(100vh-3.5rem)] translate-y-0 opacity-100"
          : "pointer-events-none max-h-0 -translate-y-3 opacity-0"
          }`}
      >
        <nav className="space-y-1 px-4 py-4 flex flex-col gap-3">
          {NAV_LINKS.map(
            ({ label, to }, index) => (
              <NavLink key={to} to={to}
                // onClick={handleMenuClick}
                className={({ isActive }) =>
                  `${linksClass} ${isActive ? "text-primary after:w-full" : ""
                  } w-fit transition-all duration-300 ${mobileMenuOpen
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-6 opacity-0"
                  }`
                }
                style={{
                  transitionDelay: mobileMenuOpen
                    ? `${index * 70}ms`
                    : "0ms",
                }}
              >
                {label}
              </NavLink>
            )
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
