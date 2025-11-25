import React from 'react';
import UIText from '../../utilities/testResource';
import { CiCreditCard1 } from 'react-icons/ci';
import { useData } from '../../utilities/useData';
import { userDetails } from '../../utilities/getLocalStorageData';
import { getRemainingDays } from '../../utilities/getDays';

const CurrentPlan: React.FC = () => {
    const { darkMode } = useData();
    const decryptedUserDetails = userDetails();

    return (
        <>
            {decryptedUserDetails?.user?.planType !== null ? (
                <div className={`rounded-2xl shadow-sm p-6 mb-6 transition-colors duration-200 border ${darkMode
                    ? 'bg-[#333333] border-[#94E561]/40'
                    : 'bg-white border-gray-100'}`}
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-semibold flex items-center gap-2" >
                                <CiCreditCard1 className="text-xl text-[#94E561]" />
                                <span className={darkMode ? 'text-[#EAEAEA]' : 'text-gray-900'}>
                                    {UIText.billing.current_plan.title}
                                </span>
                            </h2>

                            <p className={darkMode ? 'text-gray-400 text-sm' : 'text-gray-500 text-sm'}>
                                {UIText.billing.current_plan.description}{" "}
                                {decryptedUserDetails?.user?.planType ? `${decryptedUserDetails.user.planType} plan` : 'Free Trial (Plan)'}
                            </p>
                        </div>
                        <div className="text-right">
                            <div className={darkMode ? 'font-semibold text-[#FFFFFF]' : 'text-sm md:text-md lg:text-md xl:text-md text-mdfont-semibold text-gray-700'}>
                                {decryptedUserDetails.user.planType.charAt(0).toUpperCase()}{decryptedUserDetails.user.planType.slice(1)}
                            </div>

                            <div className={darkMode ? 'text-gray-400' : 'text-sm md:text-md lg:text-md xl:text-md text-gray-500'}>
                                {getRemainingDays(decryptedUserDetails?.user?.subscriptionCurrentPeriodEnd)}
                            </div>

                            <div className={darkMode ? 'font-semibold mt-1 text-[#94E561]' : 'text-sm md:text-md lg:text-md xl:text-md font-semibold mt-1 text-gray-900'}>
                                {decryptedUserDetails?.user?.planType === 'free'
                                    ? '$0 / Free'
                                    : `$${decryptedUserDetails?.user?.planType === 'yearly' ? 200 : 20} / ${decryptedUserDetails?.user?.planType === 'yearly' ? 'Yearly' : 'Monthly'}`}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={`rounded-2xl shadow-sm p-6 mb-6 transition-colors duration-200 border ${darkMode
                    ? 'bg-[#333333] border-[#94E561]/40'
                    : 'bg-white border-gray-100'
                    }`}
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-semibold flex items-center gap-2" >
                                <CiCreditCard1 className="text-xl text-[#94E561]" />
                                <span className={darkMode ? 'text-[#EAEAEA]' : 'text-gray-900'}>
                                    {UIText.billing.current_plan.title}
                                </span>
                            </h2>
                            <p className={darkMode ? 'text-gray-400 text-sm' : 'text-gray-500 text-sm'}>
                                {UIText.billing.current_plan.free_trial_description}
                            </p>
                        </div>
                        <div className="text-right">
                            <div className={darkMode ? 'font-semibold text-[#FFFFFF]' : 'font-semibold text-gray-700'}>
                                {UIText.billing.current_plan.free_trial}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CurrentPlan;