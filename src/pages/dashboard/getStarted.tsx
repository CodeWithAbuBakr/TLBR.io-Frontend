'use client';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import UIText from '../../utilities/testResource';
import { useData } from '../../utilities/useData';

const GetStarted: React.FC = () => {
    const navigate = useNavigate();
    const { darkMode, setToastMessage } = useData();

    const handleDownload = () => {
        setToastMessage(null);

        navigate('/download');
    }

    const handleBilling = () => {
        setToastMessage(null);

        navigate('/billing');
    }

    const handleSetting = () => {
        setToastMessage(null);

        navigate('/setting');
    }

    return (
        <>
            <div className={`${darkMode ? "bg-[#333333]" : "bg-[#FAFAFA]"} rounded-2xl p-6 shadow-md`}>
                {/* Header */}
                <div className="mb-10">
                    <h1 className={`${darkMode ? "text-[#94E561]" : "text-[#94E561]"} text-lg md:text-lg lg:text-xl xl:text-2xl font-semibold`}>
                        {UIText.dashboard.get_started.title}
                    </h1>
                    <p className={`${darkMode ? "text-[#CCCCCC]" : "text-[#333333]"} text-sm md:text-base mt-1`}>
                        {UIText.dashboard.get_started.description}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {/* Download Add-in */}
                    <div
                        className={`cursor-pointer rounded-xl p-5 transition-shadow hover:shadow-lg ${darkMode ? "bg-[#333333] border border-[#94E561]/40" : "bg-white shadow"}`}
                        onClick={handleDownload}
                    >
                        <h3 className={`${darkMode ? "text-[#CCCCCC]" : "text-[#0A0A04]"} text-lg md:text-xl font-semibold mb-1`}>
                            {UIText.dashboard.get_started.download.title}
                        </h3>
                        <p className={`${darkMode ? "text-[#CCCCCC]" : "text-[#333333]"} text-sm font-light`}>
                            {UIText.dashboard.get_started.download.description}
                        </p>
                    </div>

                    {/* View Billing */}
                    <div
                        className={`cursor-pointer rounded-xl p-5 transition-shadow hover:shadow-lg ${darkMode ? "bg-[#333333] border border-[#94E561]/40" : "bg-white shadow"}`}
                        onClick={handleBilling}
                    >
                        <h3 className={`${darkMode ? "text-[#CCCCCC]" : "text-[#0A0A04]"} text-lg md:text-xl font-semibold mb-1`}>
                            {UIText.dashboard.get_started.billing.title}
                        </h3>
                        <p className={`${darkMode ? "text-[#CCCCCC]" : "text-[#333333]"} text-sm font-light`}>
                            {UIText.dashboard.get_started.billing.description}
                        </p>
                    </div>

                    {/* Update Settings */}
                    <div
                        className={`cursor-pointer rounded-xl p-5 transition-shadow hover:shadow-lg ${darkMode ? "bg-[#333333] border border-[#94E561]/40" : "bg-white shadow"}`}
                        onClick={handleSetting}
                    >
                        <h3 className={`${darkMode ? "text-[#CCCCCC]" : "text-[#0A0A04]"} text-lg md:text-xl font-semibold mb-1`}>
                            {UIText.dashboard.get_started.setting.title}
                        </h3>
                        <p className={`${darkMode ? "text-[#CCCCCC]" : "text-[#333333]"} text-sm font-light`}>
                            {UIText.dashboard.get_started.setting.description}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default GetStarted;