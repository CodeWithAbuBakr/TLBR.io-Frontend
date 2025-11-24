"use client";
import React from 'react';
import UIText from '../../utilities/testResource';
import { FaWindows } from 'react-icons/fa';
import { useData } from '../../utilities/useData';

const Windows: React.FC = () => {
    const { darkMode, userData, setToastMessage } = useData();

    const handleDownloads = () => {
        setToastMessage(null);
        console.log("User Data in Windows Page:", userData);

        if (userData && userData.user.isSubscribed !== false) {
            setToastMessage({
                type: "success",
                message: "You have permission to download the tlbr.io installer. This feature is currently in development!",
                id: Date.now(),
            });
        } else {
            setToastMessage({
                type: "info",
                message: "You don’t have permission to download the tlbr.io installer. Upgrade your plan to access TLBR.io features.",
                id: Date.now(),
            });
        };
    };

    return (
        <>
            <div className={`rounded-2xl p-6 flex flex-col items-center text-center border transition-all hover:shadow-lg
                    ${darkMode
                    ? "bg-[#333333] border-[#94E561]/40"
                    : "bg-white border-gray-100"}`}
            >
                <FaWindows className={`text-5xl mb-3 ${darkMode ? "text-[#94E561]" : "text-[#0A0A04]"}`} />
                <h3 className={`font-semibold text-xl mb-2 ${darkMode ? "text-white" : "text-[#0A0A04]"}`}>
                    {UIText.download.windows.title}
                </h3>
                <p className={`text-sm mb-4 ${darkMode ? "text-[#CCCCCC]" : "text-[#666666]"}`}>
                    {UIText.download.windows.description}
                </p>

                <button
                    className="bg-[#94E561] text-white cursor-pointer font-semibold px-6 py-2.5 rounded-full hover:bg-[#63cb23] transition-colors w-full sm:w-auto"
                    onClick={handleDownloads}
                >
                    {UIText.download.windows.button}
                </button>
            </div>
        </>
    );
};

export default Windows;