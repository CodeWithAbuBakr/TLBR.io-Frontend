import React from 'react';
import UIText from '../../utilities/testResource';
import { CiCreditCard1 } from 'react-icons/ci';

const CurrentPlan: React.FC = () => {
    return (
        <>
            <div className="bg-white dark:bg-[#333333] rounded-2xl shadow-sm p-6 mb-6 border border-gray-100 dark:border-[#FFAB00]/40 transition-colors duration-200">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-[#EAEAEA] flex items-center gap-2">
                            <CiCreditCard1 className="text-xl text-[#FFAB00]" />
                            {UIText.billing.current_plan.title}
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                            {UIText.billing.current_plan.description}
                        </p>
                    </div>
                    <div className="text-right">
                        <div className="font-semibold text-gray-700 dark:text-[#FFFFFF]">
                            {UIText.billing.current_plan.free_trial}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            {UIText.billing.current_plan.seven_day}
                        </div>
                        <div className="text-lg font-semibold mt-1 text-gray-900 dark:text-[#FFAB00]">
                            $20{UIText.billing.current_plan.month}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CurrentPlan;