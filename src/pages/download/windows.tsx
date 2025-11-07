"use client";
import React, { useState } from 'react';
import UIText from '../../utilities/testResource';
import { FaWindows } from 'react-icons/fa';
import Toast from '../../hooks/useToast';

const Windows: React.FC = () => {
    const [toastType, setToastType] = useState<"error" | "success" | "info" | null>(null);
    const [toastMessage, setToastMessage] = useState("");

    const handleDownloads = () => {
        setToastType(null);
        setToastMessage("");

        // Trigger toast after a short delay
        setTimeout(() => {
            setToastType("info");
            setToastMessage("This feature is currently in development. Stay tuned!");
        }, 10);
    };

    return (
        <>
            <div className="bg-white dark:bg-[#333333] dark:border-[#FFAB00] border border-gray-100 rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-lg transition-all">
                <FaWindows className="text-5xl text-[#0A0A04] dark:text-[#FFAB00] mb-3" />
                <h3 className="font-semibold text-xl text-[#0A0A04] dark:text-white mb-2">
                    {UIText.download.windows.title}
                </h3>
                <p className="text-sm text-[#666666] dark:text-[#CCCCCC] mb-4">
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