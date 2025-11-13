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
                <div className={`rounded-xl p-5 hover:shadow-lg transition-all border
                    ${darkMode ? "bg-[#333333] border-[#FFAB00]" : "bg-[#FFAB00] border-transparent"}`}
                >
                    <div className="flex items-center mb-2">
                        <MdOutlineAccountBalance
                            className={`text-xl mr-2 ${darkMode ? "text-[#FFAB00]" : "text-[#333333]"}`}
                        />
                        <h3
                            className={`text-lg font-bold ${darkMode ? "text-white" : "text-[#0A0A04]"}`}
                        >
                            {UIText.dashboard.account_status.title}
                        </h3>
                    </div>
                    <p
                        className={`text-sm font-light mb-2 ${darkMode ? "text-[#CCCCCC]" : "text-[#333333]"}`}
                    >
                        {UIText.dashboard.account_status.current_plan_status}
                    </p>
                    <div className="space-y-2 my-4">
                        <p
                            className={`flex justify-between text-md font-light ${darkMode ? "text-[#CCCCCC]" : "text-[#333333]"}`}
                        >
                            <span>{UIText.dashboard.account_status.plan_type}</span>
                            {decryptedUserDetails.user.planType.charAt(0).toUpperCase()}{decryptedUserDetails.user.planType.slice(1)}
                        </p>
                        <p
                            className={`flex justify-between text-md font-light ${darkMode ? "text-[#CCCCCC]" : "text-[#333333]"}`}
                        >
                            <span>{UIText.dashboard.account_status.status}</span>
                            <span className={`${darkMode ? "text-[#FFAB00]" : "text-white"}`}>
                                {decryptedUserDetails?.user.isSubscribed !== null ? 'Active' : 'Inactive'}
                            </span>
                        </p>
                    </div>
                </div>
            ) : (
                <div className={`rounded-xl p-5 hover:shadow-lg transition-all border
                    ${darkMode ? "bg-[#333333] border-[#FFAB00]" : "bg-[#FFAB00] border-transparent"}`}
                >
                    <div className="flex items-center mb-2">
                        <MdOutlineAccountBalance
                            className={`text-xl mr-2 ${darkMode ? "text-[#FFAB00]" : "text-[#333333]"}`}
                        />
                        <h3
                            className={`text-lg font-bold ${darkMode ? "text-white" : "text-[#0A0A04]"}`}
                        >
                            {UIText.dashboard.account_status.title}
                        </h3>
                    </div>
                    <p
                        className={`text-sm font-light mb-2 ${darkMode ? "text-[#CCCCCC]" : "text-[#333333]"}`}
                    >
                        {UIText.dashboard.account_status.current_plan_status}
                    </p>
                    <div className="space-y-2 my-4">
                        <p
                            className={`flex justify-between text-md font-light ${darkMode ? "text-[#CCCCCC]" : "text-[#333333]"}`}
                        >
                            <span>{UIText.dashboard.account_status.plan_type}</span>
                            <span>Free Trial</span>
                        </p>
                        <p
                            className={`flex justify-between text-md font-light ${darkMode ? "text-[#CCCCCC]" : "text-[#333333]"}`}
                        >
                            <span>{UIText.dashboard.account_status.status}</span>
                            <span className={`${darkMode ? "text-[#FFAB00]" : "text-white"}`}>
                                {decryptedUserDetails?.user.isSubscribed !== null ? 'Active' : 'Inactive'}
                            </span>
                        </p>
                    </div>
                </div >
            )}

        </>
    );
};

export default AccountStatus;