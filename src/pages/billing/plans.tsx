"use client";
import React, { useState } from 'react';
import UIText from '../../utilities/testResource';
import Loader from '../../loader/loader';
import { FaRegCheckCircle } from 'react-icons/fa';
import { MdOutlineCalendarMonth } from 'react-icons/md';
import { useData } from '../../utilities/useData';
import { professional, enterprise } from '../../utilities/data';
import { userDetails } from '../../utilities/getLocalStorageData';
import { getCreateCheckout } from '../../services/apiWrapper';
import { GiCalendarHalfYear } from 'react-icons/gi';

const Plans: React.FC = () => {
    const decryptedUserDetails = userDetails();
    const userId = decryptedUserDetails.user._id;
    const [isYearly, setIsYearly] = useState(false);
    const { darkMode, isLoader, setIsLoader, isModalOpen, setIsModalOpen, setToastMessage } = useData();
    const plan = isYearly ? UIText.billing.yearly_plan : UIText.billing.monthly_plan;
    const features = isYearly ? professional : professional;

    const handleSelectedPlan = (plan: "free" | "monthly" | "yearly") => {
        setIsLoader(true);
        setIsModalOpen(true);

        if (userId && plan) {
            getCreateCheckout(userId, plan)
                .then((data) => {
                    console.log("Checkout success:", data);

                    if (data.url && typeof data.url === "string") {
                        // redirect to Stripe Checkout
                        window.location.href = data.url;
                    };
                })
                .catch((error: Error) => {
                    console.log("Checkout error:", error.message);
                    setIsLoader(false);
                    setIsModalOpen(false);

                    setToastMessage({
                        type: "error",
                        message: error.message,
                        id: Date.now(),
                    });
                });
        };
    };

    const handleRequestDemo = () => {
        setToastMessage({
            type: "success",
            message: "This feature is currently in development",
            id: Date.now(),
        });
    };

    return (
        <>
            {/* Loader */}
            {isModalOpen && isLoader !== false && (
                <Loader
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                />
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className={`rounded-2xl shadow-sm p-6 mb-6 border transition-colors duration-200 h-full ${darkMode ? "bg-[#333333] border-[#94E561]/40" : "bg-white border-gray-100"}`}>
                    <h3 className={`text-md md:text-md lg:text-lg xl:text-lg font-semibold flex items-center gap-2 ${darkMode ? "text-[#EAEAEA]" : "text-gray-900"}`}>
                        <MdOutlineCalendarMonth className="text-md md:text-md lg:text-lg xl:text-lg text-[#94E561]" />
                        {plan.title}
                    </h3>
                    <p className={`text-xs mb-4 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{isYearly ? UIText.billing.yearly_plan.description : UIText.billing.monthly_plan.description}</p>

                    {/* Price */}
                    <div className={`text-2xl font-bold mb-2 ${darkMode ? "text-[#94E561]" : "text-gray-900"}`}>
                        {plan.dollar}
                        <span className={`text-xs font-medium ${darkMode ? "text-gray-300" : "text-[#333333]"}`}>
                            {isYearly ? UIText.billing.yearly_plan.per_year : UIText.billing.monthly_plan.per_month}
                        </span>
                    </div>

                    {/* Toggle Switch */}
                    <div className="flex items-center justify-left gap-2 mb-6 mt-2">
                        <span className={`${!isYearly ? "font-semibold" : "text-gray-500"} text-sm`}>Monthly</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={isYearly}
                                onChange={() => setIsYearly(!isYearly)}
                            />
                            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-[#94E561] transition-all" />
                            <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-5 shadow" />
                        </label>
                        <span className={`${isYearly ? "font-semibold" : "text-gray-500"} text-sm`}>Yearly</span>
                    </div>

                    {/* Features */}
                    <ul className={`space-y-4 mb-6 text-sm mt-2 ${darkMode ? "text-gray-300" : "text-[#666666]"}`}>
                        {features.map((feature, index) => (
                            <li key={index} className="flex flex-row gap-2 items-center">
                                <FaRegCheckCircle className="text-md text-green-600" />
                                {feature}
                            </li>
                        ))}
                    </ul>

                    {/* Button */}
                    <button
                        className={`inline-flex items-center justify-center cursor-pointer gap-3 py-2.5 w-full text-xs font-semibold rounded-full px-7 transition-colors ${darkMode ? "bg-[#94E561] text-white hover:bg-[#63cb23]/90" : "bg-[#94E561] text-white hover:bg-[#63cb23]"}`}
                        onClick={() => handleSelectedPlan(isYearly ? "yearly" : "monthly")}
                    >
                        {plan.button}
                    </button>
                </div>

                <div
                    className={`rounded-2xl shadow-sm p-6 border transition-colors duration-200 h-full ${darkMode
                        ? 'bg-[#333333] border-[#94E561]/40'
                        : 'bg-white border-gray-100'}`}>
                    <h3 className={`text-md md:text-md lg:text-lg xl:text-lg font-semibold flex items-center gap-2 ${darkMode ? 'text-[#EAEAEA]' : 'text-gray-900'}`}>
                        <GiCalendarHalfYear className="text-md md:text-md lg:text-lg xl:text-lg text-[#94E561]" />
                        {UIText.billing.enterprise.title}
                    </h3>
                    <p className={`text-xs mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {UIText.billing.yearly_plan.description}
                    </p>

                    <ul className={`space-y-4 mb-6 text-sm mt-8 ${darkMode ? 'text-gray-300' : 'text-[#666666]'}`}>
                        {enterprise.map((feature, index) => (
                            <li key={index} className="flex flex-row gap-2 items-center">
                                <FaRegCheckCircle className="text-md text-green-600" />
                                {feature}
                            </li>
                        ))}
                    </ul>

                    <button
                        className={`inline-flex items-center justify-center cursor-pointer gap-3 py-2.5 w-full text-xs font-semibold rounded-full px-7 transition-colors ${darkMode
                            ? 'bg-[#444444] text-[#EAEAEA] hover:bg-[#94E561] hover:text-black'
                            : 'bg-[#eeeeee] text-[#666666] hover:bg-[#666666] hover:text-white'}`}
                        onClick={handleRequestDemo}
                    >
                        {UIText.billing.yearly_plan.button}
                    </button>
                </div>
            </div>
        </>
    );
};

export default Plans;