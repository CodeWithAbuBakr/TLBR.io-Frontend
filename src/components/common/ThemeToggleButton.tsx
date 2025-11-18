"use client";
import React from "react";
import { useData } from "../../utilities/useData";
import { useTheme } from "../../context/ThemeContext";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";

export const ThemeToggleButton: React.FC = () => {
  const { darkMode, setDarkMode } = useData();
  const { toggleTheme } = useTheme();

  const handleToggle = () => {
    toggleTheme();
    setDarkMode(!darkMode);
  };

  return (
    <button
      onClick={handleToggle}
      className={`flex items-center justify-center cursor-pointer h-11 w-11 rounded-full border transition-colors duration-300
      ${darkMode
          ? "bg-[#1E1E1E] border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
          : "bg-white border-gray-200 text-gray-600 hover:bg-[#F2F7EF] hover:text-gray-900"}`}
      aria-label="Toggle Theme"
    >
      {darkMode ? <MdOutlineLightMode className="text-xl" /> : <MdOutlineDarkMode className="text-xl" />}
    </button>
  );
};