"use client";
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useData } from "../utilities/useData";
import tlbr_white from "../assets/tlbr.io-white.png";
import tlbr_dark from "../assets/tlbr.io-dark.png";
import { ThemeToggleButton } from "../components/common/ThemeToggleButton";
import UserDropdown from "../components/header/UserDropdown";
import { useSidebar } from "../context/SidebarContext";
import { RiMenu2Fill } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";

const AppHeader: React.FC = () => {
  const { darkMode, setToastType, setToastMessage } = useData();
  const [isApplicationMenuOpen, setApplicationMenuOpen] = useState(false);
  const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleToggle = () => {
    if (window.innerWidth >= 1024) {
      toggleSidebar();
    } else {
      toggleMobileSidebar();
    }
  };

  const toggleApplicationMenu = () => {
    setToastType(null);
    setToastMessage('');
    setApplicationMenuOpen(!isApplicationMenuOpen);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header
      className={`sticky top-0 flex w-full border-gray-200 lg:border-b ${darkMode
        ? "bg-[#1E1E1E] text-gray-100 dark:border-gray-800"
        : "bg-white text-gray-900"
        } ${isMobileOpen ? "z-50" : "z-10"}`}
    >
      <div className="flex flex-col items-center justify-between grow lg:flex-row lg:px-6">
        {/* Left section */}
        <div
          className={`flex items-center justify-between w-full gap-2 px-3 py-3 border-b sm:gap-4 lg:justify-normal lg:border-b-0 lg:px-0 lg:py-4 ${darkMode ? "border-gray-700" : "border-gray-200"
            }`}
        >
          <button
            className={`flex items-center justify-center w-10 h-10 cursor-pointer rounded-lg z-10 lg:h-11 lg:w-11 lg:border transition-colors ${darkMode
              ? "border-gray-700 text-gray-300 hover:bg-gray-800"
              : "border-gray-200 text-[#666666] hover:bg-gray-100"
              }`}
            onClick={handleToggle}
            aria-label="Toggle Sidebar"
          >
            {isMobileOpen ? (
              <IoClose className="text-xl" />
            ) : (
              <RiMenu2Fill className="text-xl" />
            )}
          </button>

          <Link to="/dashboard" className="lg:hidden">
            <img
              src={darkMode ? tlbr_white : tlbr_dark}
              alt="Logo"
              width={130}
              height={30}
            />
          </Link>

          <button
            onClick={toggleApplicationMenu}
            className={`flex items-center justify-center cursor-pointer w-10 h-10 rounded-lg z-10 transition-colors ${darkMode
              ? "text-gray-300 hover:bg-gray-800"
              : "text-[#666666] hover:bg-gray-100"
              } lg:hidden`}
          >
            <BsThreeDots className="text-xl" />
          </button>
        </div>

        <div
          className={`${isApplicationMenuOpen ? "flex" : "hidden"
            } items-center justify-between w-full gap-4 px-5 py-4 lg:flex shadow-theme-md lg:justify-end lg:px-0 lg:shadow-none`}
        >
          <div className="flex items-center gap-2 2xsm:gap-3">
            <ThemeToggleButton />
          </div>

          <UserDropdown />
        </div>
      </div>
    </header>
  );
};

export default AppHeader;