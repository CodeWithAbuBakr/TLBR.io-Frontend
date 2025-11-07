import React from 'react';
import UIText from '../../utilities/testResource';
import { MdOutlineAccountBalance } from 'react-icons/md';

const AccountStatus: React.FC = () => {
    return (
        <>
            <div className="bg-[#FFAB00] dark:bg-[#333333] dark:border-[#FFAB00] rounded-xl p-5 hover:shadow-lg transition-all border border-transparent">
                <div className="flex items-center mb-2">
                    <MdOutlineAccountBalance className="text-[#333333] dark:text-[#FFAB00] text-xl mr-2" />
                    <h3 className="text-lg font-bold text-[#0A0A04] dark:text-white">
                        {UIText.dashboard.account_status.title}
                    </h3>
                </div>
                <p className="text-sm text-[#333333] dark:text-[#CCCCCC] font-light mb-2">
                    {UIText.dashboard.account_status.current_plan_status}
                </p>
                <div className="space-y-2 my-4">
                    <p className="flex justify-between text-md text-[#333333] dark:text-[#CCCCCC] font-light">
                        <span>{UIText.dashboard.account_status.plan_type}</span>
                        <span>Free Trial</span>
                    </p>
                    <p className="flex justify-between text-md text-[#333333] dark:text-[#CCCCCC] font-light">
                        <span>{UIText.dashboard.account_status.status}</span>
                        <span className="text-white dark:text-[#FFAB00]">Active</span>
                    </p>
                </div>
            </div>
        </>
    );
};

export default AccountStatus;