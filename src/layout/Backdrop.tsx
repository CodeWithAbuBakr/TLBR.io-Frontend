import React from "react";
import { useData } from "../utilities/useData";
import { useSidebar } from "../context/SidebarContext";

const Backdrop: React.FC = () => {
  const { darkMode } = useData();
  const { isMobileOpen, toggleMobileSidebar } = useSidebar();

  if (!isMobileOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-40 lg:hidden transition-colors duration-300 ${darkMode ? "bg-black/60" : "bg-gray-900/50"}`}
      onClick={toggleMobileSidebar}
    />
  );
};

export default Backdrop;