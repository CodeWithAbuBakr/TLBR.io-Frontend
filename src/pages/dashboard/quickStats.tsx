import React from 'react';
import UIText from '../../utilities/testResource';
import { TfiStatsUp } from 'react-icons/tfi';

const QuickStats: React.FC = () => {
    return (
        <>
            <div className="bg-[#FFAB00] dark:bg-[#333333] dark:border-[#FFAB00] rounded-xl p-5 hover:shadow-lg transition-all border border-transparent">
                <div className="flex items-center mb-2">
                    <TfiStatsUp className="text-[#333333] dark:text-[#FFAB00] text-xl mr-2" />
                    <h3 className="text-lg font-bold text-[#0A0A04] dark:text-white">
                        {UIText.dashboard.quick_stats.title}
                    </h3>
                </div>
                <p className="text-sm text-[#333333] dark:text-[#CCCCCC] font-light mb-2">
                    {UIText.dashboard.quick_stats.usage_overview}
                </p>
                <div className="space-y-2 my-4">
                    <p className="flex justify-between text-md text-[#333333] dark:text-[#CCCCCC] font-light">
                        <span>{UIText.dashboard.quick_stats.downloads}</span>
                        <span>0</span>
                    </p>
                    <p className="flex justify-between text-md text-[#333333] dark:text-[#CCCCCC] font-light">
                        <span>{UIText.dashboard.quick_stats.version}</span>
                        <span>1.0.0</span>
                    </p>
                </div>
            </div>
        </>
    );
};

export default QuickStats;