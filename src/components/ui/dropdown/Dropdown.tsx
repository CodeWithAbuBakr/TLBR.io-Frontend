"use client";
import type React from "react";
import { useEffect, useRef } from "react";
import type { DropdownProps } from "../../../utilities/type";
import { useData } from "../../../utilities/useData";

export const Dropdown: React.FC<DropdownProps> = ({
  isOpen,
  onClose,
  children,
  className = "",
}) => {
  const { darkMode } = useData();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest('.dropdown-toggle')
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);


  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className={`absolute z-10 right-0 mt-2 rounded-xl border shadow-theme-lg ${darkMode
        ? "border-[#666666] bg-[#1E1E1E]"
        : "border-gray-200 bg-white"
        } ${className}`}
    >
      {children}
    </div>
  );
};
