import React from 'react';
import UIText from '../../utilities/testResource';
import { IoTimeOutline } from 'react-icons/io5';
import { useData } from '../../utilities/useData';

const TrialPeriod: React.FC = () => {
    const { darkMode } = useData();

    return (
        <>
            <div
                className={`rounded-xl p-5 hover:shadow-lg transition-all border
                    ${darkMode ? "bg-[#333333] border-[#FFAB00]" : "bg-[#FFAB00] border-transparent"}`}
            >
                <div className="flex items-center mb-2">
                    <IoTimeOutline
                        className={`text-xl mr-2 ${darkMode ? "text-[#FFAB00]" : "text-[#333333]"}`}
                    />
                    <h3 className={`text-lg font-bold ${darkMode ? "text-white" : "text-[#0A0A04]"}`}>
                        {UIText.dashboard.trial_period.title}
                    </h3>
                </div>
                <p className={`text-sm font-light mb-4 ${darkMode ? "text-[#CCCCCC]" : "text-[#333333]"}`}>
                    {UIText.dashboard.trial_period.description}
                </p>
                <div className="flex items-baseline mb-1">
                    <span className={`text-4xl ${darkMode ? "text-white" : "text-[#0A0A04]"}`}>
                        {UIText.dashboard.trial_period.seven}
                    </span>
                    <span className={`text-sm ml-1 ${darkMode ? "text-[#CCCCCC]" : "text-[#333333]"}`}>
                        {UIText.dashboard.trial_period.remaining_days}
                    </span>
                </div>
                <div className={`h-1 rounded-sm overflow-hidden ${darkMode ? "bg-[#555555]" : "bg-[#FAFAFA]"}`}>
                    <div className={`w-full h-full ${darkMode ? "bg-[#FFAB00]" : "bg-[#0A0A04]"}`}></div>
                </div>
                <p className={`text-xs mt-2.5 ${darkMode ? "text-[#CCCCCC]" : "text-[#333333]"}`}>
                    {UIText.dashboard.trial_period.trial_expires}
                </p>
            </div>
        </>
    );
};

export default TrialPeriod;