import React from 'react';
import UIText from '../../utilities/testResource';
import { IoTimeOutline } from 'react-icons/io5';
import { useData } from '../../utilities/useData';
import { currentISO, userDetails } from '../../utilities/getLocalStorageData';
import { getAllRemainingDays, getDaysPassed, getRemainingDays } from '../../utilities/getDays';

const TrialPeriod: React.FC = () => {
    const { darkMode } = useData();
    const decryptedCurrentISO = currentISO();
    const decryptedUserDetails = userDetails();

    return (
        <>
            {decryptedUserDetails?.user?.planType !== null ? (
                <div className={`rounded-2xl shadow-sm p-6 mb-6 transition-colors duration-200 hover:transition-shadow hover:shadow-lg ${darkMode
                    ? 'bg-[#333333] border border-[#94E561]/40'
                    : 'bg-white shadow'}`}
                >
                    <div className="flex items-center mb-2">
                        <IoTimeOutline className={`text-lg mr-2 ${darkMode ? "text-[#94E561]" : "text-[#333333]"}`} />
                        <h3 className={`text-lg font-bold ${darkMode ? "text-white" : "text-[#0A0A04]"}`}>
                            {UIText.dashboard.trial_period.title}
                        </h3>
                    </div>
                    <p className={`text-sm font-light mb-4 ${darkMode ? "text-[#CCCCCC]" : "text-[#333333]"}`}>
                        {UIText.dashboard.trial_period.description}
                    </p>
                    <div className="flex items-baseline mb-1">
                        <span className={`text-3xl ${darkMode ? "text-white" : "text-[#0A0A04]"}`}>
                            {decryptedCurrentISO && decryptedUserDetails?.user?.expiresAt
                                ? getDaysPassed(decryptedCurrentISO, decryptedUserDetails?.user?.expiresAt)
                                : '0'}
                        </span>
                        <span className={`text-sm ml-1 ${darkMode ? "text-[#CCCCCC]" : "text-[#333333]"}`}>
                            / {getRemainingDays(decryptedUserDetails?.user?.subscriptionCurrentPeriodEnd)}
                        </span>
                    </div>
                    <div className={`h-1 rounded-sm overflow-hidden ${darkMode ? "bg-[#555555]" : "bg-[#FAFAFA]"}`}>
                        <div className={`w-full h-full ${darkMode ? "bg-[#94E561]" : "bg-[#94E561]"}`}></div>
                    </div>
                    <p className={`text-xs mt-2.5 ${darkMode ? "text-[#CCCCCC]" : "text-[#333333]"}`}>
                        {UIText.dashboard.trial_period.trial_expires_dynamic}
                        {getAllRemainingDays(decryptedUserDetails?.user?.subscriptionCurrentPeriodEnd)}
                    </p>
                </div>
            ) : (
                <div className={`rounded-2xl shadow-sm p-6 mb-6 transition-colors duration-200 hover:transition-shadow hover:shadow-lg ${darkMode
                    ? 'bg-[#333333] border border-[#94E561]/40'
                    : 'bg-white shadow'}`}
                >
                    <div className="flex items-center mb-2">
                        <IoTimeOutline className={`text-lg mr-2 ${darkMode ? "text-[#94E561]" : "text-[#333333]"}`} />
                        <h3 className={`text-lg font-bold ${darkMode ? "text-white" : "text-[#0A0A04]"}`}>
                            {UIText.dashboard.trial_period.not_active}
                        </h3>
                    </div>
                    <p className={`text-sm font-light mb-4 ${darkMode ? "text-[#CCCCCC]" : "text-[#333333]"}`}>
                        {UIText.dashboard.trial_period.not_selected_description}
                    </p>
                    <div className="flex items-baseline mb-1">
                        <span className={`text-sm ml-1 ${darkMode ? "text-[#CCCCCC]" : "text-[#333333]"}`}>
                            {UIText.dashboard.trial_period.no_selection_plan}
                        </span>
                    </div>
                    <div className={`h-1 rounded-sm overflow-hidden ${darkMode ? "bg-[#555555]" : "bg-[#FAFAFA]"}`}>
                        <div className={`w-full h-full ${darkMode ? "bg-[#94E561]" : "bg-[#94E561]"}`}></div>
                    </div>
                    <p className={`text-xs mt-2.5 ${darkMode ? "text-[#CCCCCC]" : "text-[#333333]"}`}>
                        {UIText.dashboard.trial_period.not_selected_trial_expires}
                    </p>
                </div >
            )}
        </>
    );
};

export default TrialPeriod;