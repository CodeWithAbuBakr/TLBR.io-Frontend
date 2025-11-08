"use client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import tlbr_icon from "../assets/tlbr.io-icon.png";
import tlbr_white from "../assets/tlbr.io-white.png";
import tlbr_dark from "../assets/tlbr.io-dark.png";
import { useLocation } from "react-router-dom";
import { useSidebar } from "../context/SidebarContext";
import { useData } from "../utilities/useData";
import { RxDashboard } from "react-icons/rx";
import { CiCreditCard1 } from "react-icons/ci";
import { IoCloudDownloadOutline, IoSettingsOutline } from "react-icons/io5";
import type { NavItem } from "../utilities/type";

const navItems: NavItem[] = [
  { icon: <RxDashboard className="text-xl" />, name: "Dashboard", path: "/dashboard" },
  { icon: <CiCreditCard1 className="text-xl" />, name: "Billing", path: "/billing" },
  { icon: <IoCloudDownloadOutline className="text-xl" />, name: "Download", path: "/download" },
  { icon: <IoSettingsOutline className="text-xl" />, name: "Setting", path: "/setting" },
];

const AppSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { darkMode } = useData();
  const { isExpanded, isMobileOpen, isHovered, setIsHovered, setIsMobileOpen } = useSidebar();
  const [openSubmenu, setOpenSubmenu] = useState<number | null>(null);
  const isActive = (path: string) => path === location.pathname;;

  const handleSubmenuToggle = (index: number) => {
    setOpenSubmenu((prev) => (prev === index ? null : index));
  };

  const handleNavClick = (path: string) => {
    navigate(path);
    setIsMobileOpen(false);
  };

  return (
    <>
      <aside
        className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 h-screen transition-all duration-300 ease-in-out border-r 
          ${darkMode
            ? "bg-[#1E1E1E] text-gray-100 border-gray-800"
            : "bg-white text-gray-900 border-gray-200"
          }
          ${isExpanded || isMobileOpen ? "w-[290px]" : isHovered ? "w-[290px]" : "w-[90px]"}
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 
          ${isMobileOpen ? "z-50" : "z-10"}`}
        onMouseEnter={() => !isExpanded && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={`pt-4 flex ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-start"}`}>
          <div onClick={() => handleNavClick("/dashboard")}>
            {isExpanded || isHovered || isMobileOpen ? (
              <>
                <img
                  src={darkMode ? tlbr_white : tlbr_dark}
                  alt="Logo"
                  width={130}
                  height={30}
                />
              </>
            ) : (
              <img src={tlbr_icon} alt="Logo" width={100} height={100} />
            )}
          </div>
        </div>

        <nav className="mt-8">
          <ul className="flex flex-col gap-4">
            {navItems.map((nav, index) => (
              <li key={nav.name}>
                {nav.subItems ? (
                  <button
                    onClick={() => handleSubmenuToggle(index)}
                    className={`flex items-center gap-2 p-2 cursor-pointer rounded w-full text-left transition-colors duration-200
                      ${darkMode
                        ? openSubmenu === index
                          ? "bg-gray-700 text-gray-200 hover:text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white"
                        : openSubmenu === index
                          ? "bg-amber-100 text-gray-900"
                          : "text-[#333333] hover:bg-gray-100"
                      }`}
                  >
                    {nav.icon}
                    {(isExpanded || isHovered || isMobileOpen) && <span>{nav.name}</span>}
                  </button>
                ) : (
                  <div
                    onClick={() => handleNavClick(nav.path)}
                    className={`flex items-center gap-2 p-2 rounded cursor-pointer transition-colors duration-200
                      ${darkMode
                        ? isActive(nav.path)
                          ? "bg-gray-700 text-gray-200 hover:text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white"
                        : isActive(nav.path)
                          ? "bg-amber-100 text-gray-900"
                          : "text-[#333333] hover:bg-gray-100"
                      }`}
                  >
                    {nav.icon}
                    {(isExpanded || isHovered || isMobileOpen) && <span>{nav.name}</span>}
                  </div>
                )}
                {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
                  <ul
                    className={`ml-9 mt-2 space-y-1 transition-all duration-300 ${openSubmenu === index ? "block" : "hidden"
                      }`}
                  >
                    {nav.subItems.map((subItem) => (
                      <li key={subItem.name}>
                        <div
                          onClick={() => handleNavClick(subItem.path)}
                          className={`block p-2 rounded cursor-pointer transition-colors duration-200
                            ${darkMode
                              ? isActive(subItem.path)
                                ? "bg-gray-700 text-gray-200 hover:text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white"
                              : isActive(subItem.path)
                                ? "bg-amber-100 text-gray-900"
                                : "text-[#333333] hover:bg-gray-100"
                            }`}
                        >
                          {subItem.name}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default AppSidebar;