"use client";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../../utilities/useData";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { TbLogout2 } from "react-icons/tb";
import UIText from "../../utilities/testResource";
import Toast from "../../hooks/useToast";
import Loader from "../../loader/loader";
import { doLogout } from "../../services/apiWrapper";
import { userDetails } from "../../utilities/getLocalStorageData";

const UserDropdown = () => {
  const navigate = useNavigate();
  const { darkMode, setEmail, setPassword, isOpen, setIsOpen, isLoader, setIsLoader, isModalOpen, setIsModalOpen,
    toastType, setToastType, toastMessage, setToastMessage, userData, hasFetchedUser } = useData();

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
    const decryptedUserDetails = userDetails();

    if (decryptedUserDetails) {
      doLogout()
        .then((data) => {
          console.log("Logout success:", data);
          setIsLoader(false);
          setIsModalOpen(false);

          setEmail("");
          setPassword("");
          setIsOpen(false);
          setToastType(null);
          setToastMessage("");
          hasFetchedUser.current = false;
          navigate("/");
        })
        .catch((error) => {
          console.log("Logout error:", error);
          setToastType("error");
          setToastMessage(error.message || "An error occurred during logout.");
          setIsLoader(false);
          setIsModalOpen(false);
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
          className={`flex items-center dropdown-toggle cursor-pointer transition-colors duration-300 ${darkMode ? "text-gray-300" : "text-gray-700"
            }`}
        >
          <span
            className={`mr-3 flex justify-center items-center rounded-full h-11 w-11 font-semibold ${darkMode ? "bg-gray-700 text-gray-100" : "bg-[#333333] text-white"
              }`}
          >
            {getInitials(userData?.user?.name ?? "")}
          </span>

          <span
            className={`block mr-1 font-medium text-theme-sm ${darkMode ? "text-white" : "text-[#666666]"
              }`}
          >
            {userData?.user?.name ?? "User"}
          </span>

          <IoIosArrowDown
            className={`transition-transform duration-200 w-[18px] h-5 ${isOpen ? "hidden" : darkMode ? "text-white" : "text-gray-500"
              }`}
          />
          <IoIosArrowUp
            className={`transition-transform duration-200 w-[18px] h-5 ${isOpen ? (darkMode ? "text-white" : "text-gray-500") : "hidden"
              }`}
          />
        </button>

        <Dropdown
          isOpen={isOpen}
          onClose={closeDropdown}
          className={`absolute right-0 mt-[17px] z-10 flex w-[260px] flex-col rounded-2xl border p-3 shadow-theme-lg transition-colors duration-300
            ${darkMode
              ? "border-[#666666] bg-[#1E1E1E] text-gray-200"
              : "border-gray-200 bg-white text-gray-900"
            }`}
        >
          <div>
            <span className={`block font-medium text-theme-sm ${darkMode ? "text-[#CCCCCC]" : "text-[#666666]"}`}>
              {userData?.user?.name}
            </span>
            <span className={`mt-0.5 block text-theme-xs ${darkMode ? "text-[#CCCCCC]" : "text-[#666666]"}`}>
              {userData?.user?.email}
            </span>
          </div>

          <div
            className={`my-3 h-px ${darkMode ? "bg-gray-700" : "bg-[#E5E5E5]"
              }`}
          />

          <button
            onClick={handleLogout}
            className={`flex items-center gap-3 px-3 py-2 mt-3 cursor-pointer font-medium rounded-lg group text-theme-sm transition-colors duration-300
              ${darkMode
                ? "text-gray-300 hover:bg-gray-800 hover:text-gray-100"
                : "text-[#666666] hover:bg-[#F2F7EF] hover:text-gray-700"
              }`}
          >
            <TbLogout2
              className={`text-xl ${darkMode ? "text-gray-400" : "text-[#666666]"
                }`}
            />
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