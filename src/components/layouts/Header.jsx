import { useState } from "react";
import Logo from "../sections/Logo";
import { HiMenu, HiX } from "react-icons/hi";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import CommonButton from "../ui/CommonButton";
import LanguageSwitcher from "../ui/LanguageSwitcher";

const Header = ({ setOpen }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const NAV_LINKS = [
    { label: "Home", to: "home" },
    { label: "Services", to: "services" },
    { label: "Platforms", to: "platforms" },
    { label: "Packages", to: "packages" },
    { label: "About", to: "about" },
    { label: "Contact", to: "contact" },
  ];

  const btnProps = {
    bgColor: "#A36081",
    color: "#fff",
    borderRadius: "999px",
    variant: "contained",
  }

  const linksClass = "relative text-[#000000] font-medium transition-all duration-300 cursor-pointer hover:text-[#A36081] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-[#A36081] after:w-0 after:transition-all after:duration-300 after:ease-in-out hover:after:w-full";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#FFFFFF]/95 backdrop-blur-md">
      <div className="container mx-auto md:px-5 px-2">
        <nav className="flex flex-row justify-between md:h-20 h-14">
          <div className="col-span-1">
            <Logo />
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex place-content-center items-center">
            <div className="hidden lg:flex place-content-center items-center gap-8 text-nowrap">
              {NAV_LINKS.map(({ label, to }) => (
                <Link
                  key={to}
                  to={to}
                  className={linksClass}
                >
                  {label}
                </Link>
              ))}
              <CommonButton onClick={() => setOpen(true)} text="Get Free Consultation" {...btnProps} />
            </div>
            <LanguageSwitcher />
          </div>

          {/* Mobile Toggle */}
          <button className="lg:hidden p-2 pe-0" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`lg:hidden bg-[#FFFFFF] shadow-xl overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-[400px] border-b border-[#EDEDED]" : "max-h-0"}`}>
        <div className="flex flex-col gap-4 px-5 py-6">
          {NAV_LINKS.map(({ label, to }) => (
            <Link key={to} to={to} onClick={() => setMenuOpen(false)} className={linksClass}>
              {label}
            </Link>
          ))}
          <CommonButton text="Get Free Consultation" {...btnProps} />
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
};

export default Header;