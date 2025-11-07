'use client';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import UIText from '../../utilities/testResource';

const GetStarted: React.FC = () => {
    const navigate = useNavigate();

    const handleDownload = () => {
        navigate('/download');
    }

    const handleBilling = () => {
        navigate('/billing');
    }

    const handleSetting = () => {
        navigate('/setting');
    }

    return (
        <>
            <div className="bg-[#FAFAFA] dark:bg-[#555555] rounded-2xl p-6 shadow-md">
                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-lg md:text-lg lg:text-xl xl:text-2xl font-semibold text-[#0A0A04] dark:text-[#CCCCCC]">
                        {UIText.dashboard.get_started.title}
                    </h1>
                    <p className="text-sm md:text-base text-[#333333] dark:text-[#CCCCCC] mt-1">
                        {UIText.dashboard.get_started.description}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {/* Download Add-in */}
                    <div
                        className="bg-white dark:bg-[#333333] border border-[#FFAB00] cursor-pointer rounded-xl p-5 hover:shadow-lg transition-shadow"
                        onClick={handleDownload}
                    >
                        <h3 className="text-lg md:text-xl font-semibold text-[#0A0A04] dark:text-[#CCCCCC] mb-1">
                            {UIText.dashboard.get_started.download.title}
                        </h3>
                        <p className="text-sm text-[#333333] dark:text-[#CCCCCC] font-light">
                            {UIText.dashboard.get_started.download.description}
                        </p>
                    </div>

                    {/* View Billing */}
                    <div
                        className="bg-white dark:bg-[#333333] border border-[#FFAB00] cursor-pointer rounded-xl p-5 hover:shadow-lg transition-shadow"
                        onClick={handleBilling}
                    >
                        <h3 className="text-lg md:text-xl font-semibold text-[#0A0A04] dark:text-[#CCCCCC] mb-1">
                            {UIText.dashboard.get_started.billing.title}
                        </h3>
                        <p className="text-sm text-[#333333] dark:text-[#CCCCCC] font-light">
                            {UIText.dashboard.get_started.billing.description}
                        </p>
                    </div>

                    {/* Update Settings */}
                    <div
                        className="bg-white dark:bg-[#333333] border border-[#FFAB00] cursor-pointer rounded-xl p-5 hover:shadow-lg transition-shadow"
                        onClick={handleSetting}
                    >
                        <h3 className="text-lg md:text-xl font-semibold text-[#0A0A04] dark:text-[#CCCCCC] mb-1">
                            {UIText.dashboard.get_started.setting.title}
                        </h3>
                        <p className="text-sm text-[#333333] dark:text-[#CCCCCC] font-light">
                            {UIText.dashboard.get_started.setting.description}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default GetStarted;