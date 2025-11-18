import React from 'react';
import UIText from '../../utilities/testResource';
import { TfiStatsUp } from 'react-icons/tfi';
import { useData } from '../../utilities/useData';

const QuickStats: React.FC = () => {
    const { darkMode } = useData();

    return (
        <>
            <div className={`rounded-2xl shadow-sm p-6 mb-6 transition-colors duration-200 border ${darkMode
                ? 'bg-[#333333] border-[#94E561]/40'
                : 'bg-white border-gray-100'}`}
            >
                <div className="flex items-center mb-2">
                    <TfiStatsUp
                        className={`text-xl mr-2 ${darkMode ? 'text-[#94E561]' : 'text-[#333333]'}`}
                    />
                    <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-[#0A0A04]'}`}>
                        {UIText.dashboard.quick_stats.title}
                    </h3>
                </div>
                <p className={`text-sm font-light mb-2 ${darkMode ? 'text-[#CCCCCC]' : 'text-[#333333]'}`}>
                    {UIText.dashboard.quick_stats.usage_overview}
                </p>
                <div className="space-y-2 my-4">
                    <p className={`flex justify-between text-md font-light ${darkMode ? 'text-[#CCCCCC]' : 'text-[#333333]'}`}>
                        <span>{UIText.dashboard.quick_stats.downloads}</span>
                        <span>0</span>
                    </p>
                    <p className={`flex justify-between text-md font-light ${darkMode ? 'text-[#CCCCCC]' : 'text-[#333333]'}`}>
                        <span>{UIText.dashboard.quick_stats.version}</span>
                        <span>1.0.0</span>
                    </p>
                </div>
            </div>
        </>
    );
};

export default QuickStats;