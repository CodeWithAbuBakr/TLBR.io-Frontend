"use client";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../utilities/useData";
import { useSidebar } from "../context/SidebarContext";
import AppHeader from "./AppHeader";
import AppSidebar from "./AppSidebar";
import Backdrop from "./Backdrop";
import { userSession, tokens } from "../utilities/getLocalStorageData";

export const DashboardLayout = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const { darkMode } = useData();
    const navigate = useNavigate();
    const { isExpanded, isHovered, isMobileOpen } = useSidebar();

    // Check login persistence on page load
    useEffect(() => {
        const decryptedTokens = tokens();
        const decryptedUserSession = userSession();

        if (!decryptedUserSession || !decryptedTokens.accessToken || !decryptedTokens.refreshToken) {
            // No session found force sign-in
            navigate("/");
            return;
        }

        try {
            if (decryptedUserSession.keepMeLoggedIn === false) {
                // User didn’t choose "keep me logged in" clear session
                localStorage.removeItem("tokens");
                localStorage.removeItem("userSession");
                navigate("/");
            }
        } catch (error) {
            // Invalid JSON or corrupted storage → reset
            console.error("Invalid session data", error);

            localStorage.removeItem("tokens");
            localStorage.removeItem("userSession");
            navigate("/");
        }
    }, [navigate]);

    // Dynamic class for main content margin based on sidebar state
    const mainContentMargin = isMobileOpen
        ? "ml-0"
        : isExpanded || isHovered
            ? "lg:ml-[290px]"
            : "lg:ml-[90px]";

    return (
        <div className={`min-h-screen xl:flex transition-colors duration-300
            ${darkMode ? "bg-[#1E1E1E] text-gray-100" : "bg-white text-gray-900"}`}>
            {/* Sidebar and Backdrop */}
            <AppSidebar />
            <Backdrop />

            {/* Main Content Area */}
            <div className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin}`}>
                {/* Header */}
                <AppHeader />

                {/* Page Content */}
                <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">{children}</div>
            </div>
        </div>
    );
}
