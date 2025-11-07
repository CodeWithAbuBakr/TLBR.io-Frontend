"use client";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../../utilities/useData";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { TbLogout2 } from "react-icons/tb";
import UIText from "../../utilities/testResource";
import Toast from "../../hooks/useToast";
import { logoutUser } from "../../services/auth/logout";
import Loader from "../../loader/loader";

const UserDropdown = () => {
  const navigate = useNavigate();
  const { isOpen, setIsOpen, isLoader, setIsLoader, isModalOpen, setIsModalOpen,
    toastType, setToastType, toastMessage, setToastMessage, userData } = useData();

  const toggleDropdown = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const getInitials = (name: string) => {
    if (!name) return "";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return parts[0][0].toUpperCase() + parts[1][0].toUpperCase();
    }
    const firstName = parts[0];
    return firstName.substring(0, 2).toUpperCase();
  };

  // Logout user from tlbr.io
  const handleLogout = () => {
    setIsLoader(true);
    setIsModalOpen(true);

    const storedData = localStorage.getItem("userDetails");
    if (storedData) {
      logoutUser((error, data) => {
        if (error) {
          console.log("Logout error:", error);
          setToastType("error");
          setToastMessage(error.message || "An error occurred during logout.");

          setIsLoader(false);
          setIsModalOpen(false);
        } else if (data) {
          console.log("Logout success:", data);
          setIsLoader(false);
          setIsModalOpen(false);

          navigate("/signin");
        }
      });
    }
  };

  return (
    <>
      {isModalOpen && isLoader !== false && (
        <Loader
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}

      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center text-gray-700 dark:text-gray-400 dropdown-toggle"
        >
          <span className="mr-3 bg-[#333333] flex justify-center items-center text-white rounded-full h-11 w-11">
            {getInitials(userData?.user?.name ?? "")}
          </span>

          <span className="block mr-1 font-medium text-theme-sm text-[#666666] dark:text-[#CCCCCC]">
            {userData?.user?.name ?? "User"}
          </span>

          <IoIosArrowDown
            className={`text-gray-500 dark:text-gray-400 transition-transform duration-200 w-[18px] h-5 ${isOpen ? "hidden" : ""}`}
          />
          <IoIosArrowUp
            className={`text-gray-500 dark:text-gray-400 transition-transform duration-200 w-[18px] h-5 ${isOpen ? "" : "hidden"}`}
          />
        </button>

        <Dropdown
          isOpen={isOpen}
          onClose={closeDropdown}
          className="absolute right-0 mt-[17px] z-10 flex w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
        >
          <div>
            <span className="block font-medium text-[#666666] dark:text-[#CCCCCC] text-theme-sm">
              {userData?.user?.name}
            </span>
            <span className="mt-0.5 block text-theme-xs text-[#666666] dark:text-[#CCCCCC]">
              {userData?.user?.email}
            </span>
          </div>

          <div className="my-3 h-px bg-[#666666] dark:bg-[#CCCCCC]" />

          <button
            className="flex items-center gap-3 px-3 py-2 mt-3 font-medium text-[#666666] dark:text-[#CCCCCC] rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-white/5 dark:hover:text-gray-300"
            onClick={handleLogout}
          >
            <TbLogout2 className="text-xl text-[#666666]" />
            {UIText.header.user_Dropdown.button}
          </button>
        </Dropdown>
      </div>

      {toastType && (
        <div className="fixed bottom-6 right-6 z-50">
          <Toast
            infoMessage={toastType === "info" ? toastMessage : ""}
            errorMessage={toastType === "error" ? toastMessage : ""}
            successMessage={toastType === "success" ? toastMessage : ""}
          />
        </div>
      )}
    </>
  );
};

export default UserDropdown;