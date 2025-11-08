"use client";
import React, { useState } from 'react';
import UIText from '../../utilities/testResource';
import { FaWindows } from 'react-icons/fa';
import Toast from '../../hooks/useToast';
import { useData } from '../../utilities/useData';

const Windows: React.FC = () => {
    const { darkMode } = useData();
    const [toastType, setToastType] = useState<"error" | "success" | "info" | null>(null);
    const [toastMessage, setToastMessage] = useState("");

    const handleDownloads = () => {
        setToastType(null);
        setToastMessage("");

        setTimeout(() => {
            setToastType("info");
            setToastMessage("This feature is currently in development. Stay tuned!");
        }, 10);
    };

    return (
        <>
            <div
                className={`rounded-2xl p-6 flex flex-col items-center text-center border transition-all hover:shadow-lg
                    ${darkMode
                        ? "bg-[#333333] border-[#FFAB00]"
                        : "bg-white border-gray-100"}`}
            >
                <FaWindows className={`text-5xl mb-3 ${darkMode ? "text-[#FFAB00]" : "text-[#0A0A04]"}`} />
                <h3 className={`font-semibold text-xl mb-2 ${darkMode ? "text-white" : "text-[#0A0A04]"}`}>
                    {UIText.download.windows.title}
                </h3>
                <p className={`text-sm mb-4 ${darkMode ? "text-[#CCCCCC]" : "text-[#666666]"}`}>
                    {UIText.download.windows.description}
                </p>

                <button
                    className="bg-[#FFAB00] text-white font-semibold px-6 py-2.5 rounded-full hover:bg-[#ffbc37] transition-colors w-full sm:w-auto"
                    onClick={handleDownloads}
                >
                    {UIText.download.windows.button}
                </button>
            </div>

            {/* Global Toast */}
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

export default Windows;