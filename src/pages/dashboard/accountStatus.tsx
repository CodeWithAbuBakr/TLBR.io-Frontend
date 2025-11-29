import React from 'react';
import UIText from '../../utilities/testResource';
import { MdOutlineAccountBalance } from 'react-icons/md';
import { useData } from '../../utilities/useData';
import { userDetails } from '../../utilities/getLocalStorageData';

const AccountStatus: React.FC = () => {
    const { darkMode } = useData();
    const decryptedUserDetails = userDetails();

    return (
        <>
            {decryptedUserDetails?.user?.planType !== null ? (
                <div className={`rounded-2xl shadow-sm p-6 mb-6 transition-colors duration-200 hover:transition-shadow hover:shadow-lg ${darkMode
                    ? 'bg-[#333333] border border-[#94E561]/40'
                    : 'bg-white shadow'}`}
                >
                    <div className="flex items-center mb-2">
                        <MdOutlineAccountBalance className={`text-lg mr-2 ${darkMode ? "text-[#94E561]" : "text-[#333333]"}`} />
                        <h3 className={`text-lg font-bold ${darkMode ? "text-white" : "text-[#0A0A04]"}`}>
                            {UIText.dashboard.account_status.title}
                        </h3>
                    </div>
                    <p className={`text-sm font-light mb-2 ${darkMode ? "text-[#CCCCCC]" : "text-[#333333]"}`}>
                        {UIText.dashboard.account_status.current_plan_status}
                    </p>
                    <div className="space-y-2 my-4">
                        <p className={`flex justify-between text-sm font-light ${darkMode ? "text-[#CCCCCC]" : "text-[#333333]"}`}>
                            <span>{UIText.dashboard.account_status.plan_type}</span>
                            {decryptedUserDetails?.user?.planType
                                ? (decryptedUserDetails.user.planType === "free"
                                    ? "Free Trial"
                                    : decryptedUserDetails.user.planType.charAt(0).toUpperCase() + decryptedUserDetails.user.planType.slice(1))
                                : "Free Trial"}
                        </p>
                        <p className={`flex justify-between text-sm font-light ${darkMode ? "text-[#CCCCCC]" : "text-[#333333]"}`}>
                            <span>{UIText.dashboard.account_status.status}</span>
                            <span className="text-[#94E561]">
                                {decryptedUserDetails?.user?.isSubscribed !== false ? 'Active' : 'Trialing'}
                            </span>
                        </p>
                    </div>
                </div>
            ) : (
                <div className={`rounded-2xl shadow-sm p-6 mb-6 transition-colors duration-200 hover:transition-shadow hover:shadow-lg ${darkMode
                    ? 'bg-[#333333] border border-[#94E561]/40'
                    : 'bg-white shadow'}`}
                >
                    <div className="flex items-center mb-2">
                        <MdOutlineAccountBalance
                            className={`text-lg mr-2 ${darkMode ? "text-[#94E561]" : "text-[#333333]"}`}
                        />
                        <h3 className={`text-lg font-bold ${darkMode ? "text-white" : "text-[#0A0A04]"}`}>
                            {UIText.dashboard.account_status.title}
                        </h3>
                    </div>
                    <p className={`text-sm font-light mb-2 ${darkMode ? "text-[#CCCCCC]" : "text-[#333333]"}`}>
                        {UIText.dashboard.account_status.current_plan_status}
                    </p>
                    <div className="space-y-2 my-4">
                        <p className={`flex justify-between text-sm font-light ${darkMode ? "text-[#CCCCCC]" : "text-[#333333]"}`}>
                            <span>{UIText.dashboard.account_status.plan_type}</span>
                            <span>{UIText.dashboard.account_status.not_selected}</span>
                        </p>
                        <p className={`flex justify-between text-sm font-light ${darkMode ? "text-[#CCCCCC]" : "text-[#333333]"}`}>
                            <span>{UIText.dashboard.account_status.status}</span>
                            <span className="text-[#94E561]">
                                {decryptedUserDetails?.user?.isSubscribed !== false ? 'Active' : 'Inactive'}
                            </span>
                        </p>
                    </div>
                </div >
            )}

        </>
    );
};

export default AccountStatus;