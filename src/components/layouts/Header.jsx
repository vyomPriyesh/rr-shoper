import { useEffect, useRef, useState } from "react";
import Logo from "../sections/Logo";

import {
  HiMenu,
  HiX,
} from "react-icons/hi";

import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  FaChevronDown,
  FaRegUser,
} from "react-icons/fa";

import CommonButton from "../ui/CommonButton";
import LanguageSwitcher from "../ui/LanguageSwitcher";
import { userState } from "../../context/UserContext";
import { useQuery } from "@tanstack/react-query";
import apiList from "../../config/apiList";
import api from "../../config/api";
import { useToast } from "../../context/ToastContext";

const Header = () => {

  const { user, logout, setUser } = userState();
  const { auth } = apiList();
  const { showToast } = useToast();

  const navigate = useNavigate();


  const [menuOpen, setMenuOpen] = useState(false);

  const [profileOpen, setProfileOpen] =
    useState(false);

  const [isScrolled, setIsScrolled] =
    useState(false);

  const profileRef = useRef(null);

  const { pathname } = useLocation();

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
    {
      label: "About",
      to: "/about",
    },
    {
      label: "Contact",
      to: "/contact",
    },
  ];

  const btnProps = {
    bgColor: "#A36081",
    color: "#fff",
    borderRadius: "999px",
    variant: "contained",
  };

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


  useEffect(() => {

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  }, [pathname]);

  useEffect(() => {

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () => {

      window.removeEventListener(
        "scroll",
        handleScroll
      );

    };

  }, []);

  useEffect(() => {

    const handleClickOutside = (
      event
    ) => {

      if (
        profileRef.current &&
        !profileRef.current.contains(
          event.target
        )
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener(
      "click",
      handleClickOutside
    );

    return () => {

      document.removeEventListener(
        "click",
        handleClickOutside
      );

    };

  }, []);

  const handleProfileToggle = (
    e
  ) => {

    e.stopPropagation();

    setProfileOpen((prev) => !prev);

  };

  const handleCloseDropdown = () => {
    setProfileOpen(false);
  };

  const linksClass = `
    relative text-[#000000]
    font-medium transition-all duration-300
    cursor-pointer hover:text-[#A36081]

    after:absolute after:bottom-0 after:left-0
    after:h-0.5 after:bg-[#A36081]
    after:w-0 after:transition-all
    after:duration-300 after:ease-in-out

    hover:after:w-full
  `;

  return (
    <header
      className={`
        ${menuOpen
          ? isScrolled
            ? "sticky"
            : ""
          : "sticky"
        }

        top-0 left-0 right-0 z-50
        bg-[#FFFFFF]/95 backdrop-blur-md
      `}
    >

      <div className="container mx-auto md:px-5 px-2">

        <nav className="flex items-center justify-between md:h-20 h-14">

          {/* Logo */}
          <div>
            <Logo />
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">

            {/* Nav Links */}
            <div className="flex items-center gap-8 text-nowrap">

              {NAV_LINKS.map(
                ({ label, to }) => (

                  <NavLink
                    key={to}
                    to={to}
                    className={({
                      isActive,
                    }) =>
                      `
                        ${linksClass}

                        ${isActive
                        ? "text-primary after:w-full"
                        : ""
                      }
                      `
                    }
                  >
                    {label}
                  </NavLink>

                )
              )}
            </div>

            {/* <LanguageSwitcher /> */}

            {/* Desktop Profile */}
            {user &&
              <div
                ref={profileRef}
                className="relative"
              >

                <button
                  onClick={
                    handleProfileToggle
                  }
                  className="
                  flex items-center gap-3
                  transition-all duration-300
                "
                >

                  {/* Avatar */}
                  <div
                    className="
                    w-10 h-10 rounded-full
                    bg-primary text-white

                    flex items-center
                    justify-center

                    text-sm font-semibold
                  "
                  >
                    <FaRegUser />
                  </div>

                  {/* Name */}
                  <div className="text-left">

                    <p
                      className="
                      text-sm font-semibold capitalize
                      text-heading leading-none
                    "
                    >
                      {user?.name || user?.email || user?.mobile}
                    </p>

                  </div>

                  {/* Arrow */}
                  <FaChevronDown
                    className={`
                    text-sm
                    transition-all duration-300

                    ${profileOpen
                        ? "rotate-180"
                        : ""
                      }
                  `}
                  />
                </button>

                {/* Dropdown */}
                <div
                  className={`
                  absolute right-0 top-[120%]
                  w-[220px]

                  rounded-2xl overflow-hidden

                  bg-white
                  border border-[#E8DDE3]

                  shadow-[0_10px_40px_rgba(0,0,0,0.08)]

                  transition-all duration-300
                  origin-top-right

                  ${profileOpen
                      ? `
                          opacity-100 visible
                          scale-100 translate-y-0
                        `
                      : `
                          opacity-0 invisible
                          scale-95 -translate-y-2
                          pointer-events-none
                        `
                    }
                `}
                >

                  <div className="p-2">

                    <Link
                      to="/my-profile"
                      onClick={
                        handleCloseDropdown
                      }
                      className="
                      flex items-center gap-3

                      px-4 py-3 rounded-xl

                      text-sm font-medium
                      text-heading

                      hover:bg-[#F8F1F5]
                      hover:text-primary

                      transition-all duration-300
                    "
                    >
                      <FaRegUser />

                      My Profile
                    </Link>

                    <button
                      onClick={() => {
                        logout();
                        handleCloseDropdown();

                        // logout logic

                      }}
                      className="
                      w-full text-left

                      flex items-center gap-3

                      px-4 py-3 rounded-xl

                      text-sm font-medium
                      text-red-500

                      hover:bg-red-50

                      transition-all duration-300
                    "
                    >
                      <HiX className="text-lg" />

                      Logout
                    </button>

                  </div>
                </div>
              </div>
            }
          </div>

          {/* Mobile Right */}
          <div className="flex items-center gap-2 lg:hidden">

            {/* Mobile Profile */}
            <div
              ref={profileRef}
              className="relative"
            >

              <button
                onClick={
                  handleProfileToggle
                }
                className="
                  w-10 h-10 rounded-full
                  bg-primary text-white

                  flex items-center
                  justify-center
                "
              >
                <FaRegUser />
              </button>

              {/* Mobile Dropdown */}
              <div
                className={`
                  absolute right-0 top-[120%]
                  w-[220px]

                  rounded-2xl overflow-hidden

                  bg-white
                  border border-[#E8DDE3]

                  shadow-[0_10px_40px_rgba(0,0,0,0.08)]

                  transition-all duration-300
                  origin-top-right

                  ${profileOpen
                    ? `
                          opacity-100 visible
                          scale-100 translate-y-0
                        `
                    : `
                          opacity-0 invisible
                          scale-95 -translate-y-2
                          pointer-events-none
                        `
                  }
                `}
              >

                {/* User Info */}
                {/* <div
                  className="
                    px-4 py-4
                    border-b border-[#F1E5EB]
                  "
                >

                  <p
                    className="
                      text-sm font-semibold
                      text-heading capitalize
                    "
                  >
                     {user?.name || user?.mobile}
                  </p>

                  <p
                    className="
                      text-xs text-paragraph capitalize
                      mt-1
                    "
                  >
                     {user?.name || user?.email}
                  </p>

                </div> */}

                <div className="p-2">

                  <Link
                    to="/profile"
                    onClick={
                      handleCloseDropdown
                    }
                    className="
                      flex items-center gap-3

                      px-4 py-3 rounded-xl

                      text-sm font-medium
                      text-heading

                      hover:bg-[#F8F1F5]
                      hover:text-primary

                      transition-all duration-300
                    "
                  >
                    <FaRegUser />

                    My Profile
                  </Link>

                  <button
                    onClick={() => {

                      handleCloseDropdown();

                      // logout logic

                    }}
                    className="
                      w-full text-left

                      flex items-center gap-3

                      px-4 py-3 rounded-xl

                      text-sm font-medium
                      text-red-500

                      hover:bg-red-50

                      transition-all duration-300
                    "
                  >
                    <HiX className="text-lg" />

                    Logout
                  </button>

                </div>
              </div>
            </div>

            {/* Mobile Toggle */}
            <button
              className="p-2 pe-0"
              onClick={() =>
                setMenuOpen(!menuOpen)
              }
            >
              {
                menuOpen
                  ? <HiX size={28} />
                  : <HiMenu size={28} />
              }
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div
        className={`
          lg:hidden bg-[#FFFFFF]

          shadow-xl overflow-hidden

          transition-all duration-300

          ${menuOpen
            ? `
                  max-h-[500px]
                  border-b border-[#EDEDED]
                `
            : "max-h-0"
          }
        `}
      >

        <div className="flex flex-col gap-4 px-5 py-6">

          {NAV_LINKS.map(
            ({ label, to }) => (

              <Link
                key={to}
                to={to}
                onClick={() =>
                  setMenuOpen(false)
                }
                className={linksClass}
              >
                {label}
              </Link>

            )
          )}

          <CommonButton bgColor="#A36081"
            color="white"
            className="w-full sm:w-auto justify-center shadow-xl hover:scale-105 transition-all duration-300"
            text="Book Consultation"
            {...btnProps}
          />

          {/* <LanguageSwitcher /> */}
        </div>
      </div>
    </header>
  );
};

export default Header;