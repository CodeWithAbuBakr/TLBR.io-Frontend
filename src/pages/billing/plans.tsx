"use client";
import React from 'react';
import UIText from '../../utilities/testResource';
import Loader from '../../loader/loader';
import { FaRegCheckCircle } from 'react-icons/fa';
import { CiGift } from "react-icons/ci";
import { GiCalendarHalfYear } from 'react-icons/gi';
import { MdOutlineCalendarMonth } from 'react-icons/md';
import { useData } from '../../utilities/useData';
import { freePlan, monthlyPlan, yearlyPlan } from '../../utilities/data';
import { userDetails } from '../../utilities/getLocalStorageData';
import { getCreateCheckout } from '../../services/apiWrapper';

const Plans: React.FC = () => {
    const decryptedUserDetails = userDetails();
    const userId = decryptedUserDetails.user._id;
    const { darkMode, isLoader, setIsLoader, isModalOpen, setIsModalOpen } = useData();

    const handleSelectedPlan = (plan: "free-trial" | "monthly" | "yearly") => {
        setIsLoader(true);
        setIsModalOpen(true);

        if (userId && plan) {
            getCreateCheckout(userId, plan)
                .then((data) => {
                    console.log("Checkout success:", data);

                    if (data.url && typeof data.url === "string") {
                        // redirect to Stripe Checkout
                        window.location.href = data.url;
                    }
                })
                .catch((error: Error) => {
                    console.error("Checkout error:", error);
                });
        }
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {/* Free Trial */}
                <div className={`rounded-2xl shadow-sm p-6 border transition-colors duration-200 ${darkMode
                    ? 'bg-[#333333] border-[#FFAB00]/40'
                    : 'bg-white border-gray-100'
                    }`}>
                    <h3 className={`text-xl font-semibold flex items-center gap-2 ${darkMode ? 'text-[#EAEAEA]' : 'text-gray-900'
                        }`}>
                        <CiGift className="text-xl text-[#FFAB00]" />
                        {UIText.billing.free_plan.title}
                    </h3>
                    <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {UIText.billing.free_plan.description}
                    </p>
                    <div className={`text-3xl font-bold mb-2 ${darkMode ? 'text-[#FFAB00]' : 'text-gray-900'}`}>
                        {UIText.billing.free_plan.dollar}
                        <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-[#333333]'}`}>
                            {UIText.billing.free_plan.per_month}
                        </span>
                    </div>

                    <ul className={`space-y-4 mb-6 text-sm mt-8 ${darkMode ? 'text-gray-300' : 'text-[#666666]'}`}>
                        {freePlan.map((feature, index) => (
                            <li key={index} className="flex flex-row gap-2 items-center">
                                <FaRegCheckCircle className="text-xl text-green-600" />
                                {feature}
                            </li>
                        ))}
                    </ul>

                    <button
                        className={`inline-flex items-center justify-center cursor-pointer gap-3 py-3 w-full text-sm font-semibold rounded-full px-7 transition-colors ${darkMode
                            ? 'bg-[#444444] text-[#EAEAEA] hover:bg-[#FFAB00] hover:text-black'
                            : 'bg-[#eeeeee] text-[#666666] hover:bg-[#666666] hover:text-white'
                            }`}
                        onClick={() => handleSelectedPlan("free-trial")}
                    >
                        {UIText.billing.free_plan.button}
                    </button>
                </div>

                {/* Monthly Plan */}
                <div className={`rounded-2xl shadow-sm p-6 border transition-colors duration-200 ${darkMode
                    ? 'bg-[#333333] border-[#FFAB00]/40'
                    : 'bg-white border-gray-100'
                    }`}>
                    <h3 className={`text-xl font-semibold flex items-center gap-2 ${darkMode ? 'text-[#EAEAEA]' : 'text-gray-900'
                        }`}>
                        <MdOutlineCalendarMonth className="text-xl text-[#FFAB00]" />
                        {UIText.billing.monthly_plan.title}
                    </h3>
                    <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {UIText.billing.monthly_plan.description}
                    </p>
                    <div className={`text-3xl font-bold mb-2 ${darkMode ? 'text-[#FFAB00]' : 'text-gray-900'}`}>
                        {UIText.billing.monthly_plan.dollar}
                        <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-[#333333]'}`}>
                            {UIText.billing.monthly_plan.per_month}
                        </span>
                    </div>

                    <ul className={`space-y-4 mb-6 text-sm mt-8 ${darkMode ? 'text-gray-300' : 'text-[#666666]'}`}>
                        {monthlyPlan.map((feature, index) => (
                            <li key={index} className="flex flex-row gap-2 items-center">
                                <FaRegCheckCircle className="text-xl text-green-600" />
                                {feature}
                            </li>
                        ))}
                    </ul>

                    <button
                        className={`inline-flex items-center justify-center cursor-pointer gap-3 py-3 w-full text-sm font-semibold rounded-full px-7 transition-colors ${darkMode
                            ? 'bg-[#FFAB00] text-white hover:bg-[#ffbc37]/90'
                            : 'bg-[#FFAB00] text-white hover:bg-[#ffbc37]'
                            }`}
                        onClick={() => handleSelectedPlan("monthly")}
                    >
                        {UIText.billing.monthly_plan.button}
                    </button>
                </div>

                {/* Yearly Plan */}
                <div className={`rounded-2xl shadow-sm p-6 border transition-colors duration-200 ${darkMode
                    ? 'bg-[#333333] border-[#FFAB00]/40'
                    : 'bg-white border-gray-100'
                    }`}>
                    <h3 className={`text-xl font-semibold flex items-center gap-2 ${darkMode ? 'text-[#EAEAEA]' : 'text-gray-900'
                        }`}>
                        <GiCalendarHalfYear className="text-xl text-[#FFAB00]" />
                        {UIText.billing.yearly_plan.title}
                    </h3>
                    <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {UIText.billing.yearly_plan.description}
                    </p>
                    <div className={`text-3xl font-bold mb-2 ${darkMode ? 'text-[#FFAB00]' : 'text-gray-900'}`}>
                        {UIText.billing.yearly_plan.dollar}
                        <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-[#333333]'}`}>
                            {UIText.billing.yearly_plan.per_year}
                        </span>
                    </div>

                    <ul className={`space-y-4 mb-6 text-sm mt-8 ${darkMode ? 'text-gray-300' : 'text-[#666666]'}`}>
                        {yearlyPlan.map((feature, index) => (
                            <li key={index} className="flex flex-row gap-2 items-center">
                                <FaRegCheckCircle className="text-xl text-green-600" />
                                {feature}
                            </li>
                        ))}
                    </ul>

                    <button
                        className={`inline-flex items-center justify-center cursor-pointer gap-3 py-3 w-full text-sm font-semibold rounded-full px-7 transition-colors ${darkMode
                            ? 'bg-[#444444] text-[#EAEAEA] hover:bg-[#FFAB00] hover:text-black'
                            : 'bg-[#eeeeee] text-[#666666] hover:bg-[#666666] hover:text-white'
                            }`}
                        onClick={() => handleSelectedPlan("yearly")}
                    >
                        {UIText.billing.yearly_plan.button}
                    </button>
                </div>
            </div>
        </>
    );
};

export default Plans;