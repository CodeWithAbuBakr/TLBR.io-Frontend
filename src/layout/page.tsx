"use client";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSidebar } from "../context/SidebarContext";
import AppHeader from "./AppHeader";
import AppSidebar from "./AppSidebar";
import Backdrop from "./Backdrop";

export const AdminLayout = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const navigate = useNavigate();
    const { isExpanded, isHovered, isMobileOpen } = useSidebar();

    // Check login persistence on page load
    useEffect(() => {
        const savedUser = localStorage.getItem("userSession");

        if (!savedUser) {
            // No session found force sign-in
            navigate("/");
            return;
        }

        try {
            const parsedUser = JSON.parse(savedUser);

            if (parsedUser.keepMeLoggedIn === true) {
                navigate("/dashboard");
            } else {
                // User didn’t choose "keep me logged in" clear session
                localStorage.removeItem("userSession");
                navigate("/");
            }
        } catch (error) {
            // Invalid JSON or corrupted storage → reset
            console.error("Invalid session data", error);
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
        <div className="min-h-screen xl:flex">
            {/* Sidebar and Backdrop */}
            <AppSidebar />
            <Backdrop />
            {/* Main Content Area */}
            <div
                className={`flex-1 transition-all  duration-300 ease-in-out ${mainContentMargin}`}
            >
                {/* Header */}
                <AppHeader />
                {/* Page Content */}
                <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">{children}</div>
            </div>
        </div>
    );
}
