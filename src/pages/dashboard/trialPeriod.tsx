import React from 'react';
import UIText from '../../utilities/testResource';
import { IoTimeOutline } from 'react-icons/io5';

const TrialPeriod: React.FC = () => {
    return (
        <>
            <div className="bg-[#FFAB00] dark:bg-[#333333] dark:border-[#FFAB00] rounded-xl p-5 hover:shadow-lg transition-all border border-transparent">
                <div className="flex items-center mb-2">
                    <IoTimeOutline className="text-[#333333] dark:text-[#FFAB00] text-xl mr-2" />
                    <h3 className="text-lg font-bold text-[#0A0A04] dark:text-white">
                        {UIText.dashboard.trial_period.title}
                    </h3>
                </div>
                <p className="text-sm text-[#333333] dark:text-[#CCCCCC] font-light mb-4">
                    {UIText.dashboard.trial_period.description}
                </p>
                <div className="flex items-baseline mb-1">
                    <span className="text-4xl text-[#0A0A04] dark:text-white">
                        {UIText.dashboard.trial_period.seven}
                    </span>
                    <span className="text-sm text-[#333333] dark:text-[#CCCCCC] ml-1">
                        {UIText.dashboard.trial_period.remaining_days}
                    </span>
                </div>
                <div className="bg-[#FAFAFA] dark:bg-[#555555] h-1 rounded-sm overflow-hidden">
                    <div className="bg-[#0A0A04] dark:bg-[#FFAB00] w-full h-full"></div>
                </div>
                <p className="text-xs text-[#333333] dark:text-[#CCCCCC] mt-2.5">
                    {UIText.dashboard.trial_period.trial_expires}
                </p>
            </div>
        </>
    );
};

export default TrialPeriod;