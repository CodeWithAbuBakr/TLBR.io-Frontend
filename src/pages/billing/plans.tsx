"use client";
import React, { useState } from 'react';
import UIText from '../../utilities/testResource';
import Toast from '../../hooks/useToast';
import { FaRegCheckCircle } from 'react-icons/fa';
import { CiGift } from "react-icons/ci";
import { GiCalendarHalfYear } from 'react-icons/gi';
import { MdOutlineCalendarMonth } from 'react-icons/md';
import { freePlan, monthlyPlan, yearlyPlan } from '../../utilities/data';

const Plans: React.FC = () => {
    const [toastType, setToastType] = useState<"error" | "success" | "info" | null>(null);
    const [toastMessage, setToastMessage] = useState("");

    const handleMonthlyPlan = () => {
        setToastType(null);
        setToastMessage("");

        // Trigger toast after a short delay
        setTimeout(() => {
            setToastType("info");
            setToastMessage("This feature is currently in development. Stay tuned!");
        }, 10);
    };

    const handleYearlyPlan = () => {
        setToastType(null);
        setToastMessage("");

        // Trigger toast after a short delay
        setTimeout(() => {
            setToastType("info");
            setToastMessage("This feature is currently in development. Stay tuned!");
        }, 10);
    };

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {/* Free Trial */}
                <div className="bg-white dark:bg-[#333333] rounded-2xl shadow-sm p-6 border border-gray-100 dark:border-[#FFAB00]/40 transition-colors duration-200">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-[#EAEAEA] flex items-center gap-2">
                        <CiGift className="text-xl text-[#FFAB00]" />
                        {UIText.billing.free_plan.title}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                        {UIText.billing.free_plan.description}
                    </p>
                    <div className="text-3xl font-bold text-gray-900 dark:text-[#FFAB00] mb-2">
                        {UIText.billing.free_plan.dollar}
                        <span className="text-sm text-[#333333] dark:text-gray-300 font-medium">
                            {UIText.billing.free_plan.per_month}
                        </span>
                    </div>

                    <ul className="space-y-4 mb-6 text-sm mt-8 text-[#666666] dark:text-gray-300">
                        {freePlan.map((feature, index) => (
                            <li key={index} className="flex flex-row gap-2 items-center">
                                <FaRegCheckCircle className="text-xl text-green-600" />
                                {feature}
                            </li>
                        ))}
                    </ul>

                    <button
                        className="inline-flex items-center justify-center gap-3 py-3 w-full text-sm font-semibold bg-[#eeeeee] dark:bg-[#444444] text-[#666666] dark:text-[#EAEAEA] hover:bg-[#666666] hover:text-white dark:hover:bg-[#FFAB00] dark:hover:text-black rounded-full px-7 transition-colors"
                        onClick={handleYearlyPlan}
                    >
                        {UIText.billing.yearly_plan.button}
                    </button>
                </div>

                {/* Monthly Plan */}
                <div className="bg-white dark:bg-[#333333] rounded-2xl shadow-sm p-6 border border-gray-100 dark:border-[#FFAB00]/40 transition-colors duration-200">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-[#EAEAEA] flex items-center gap-2">
                        <MdOutlineCalendarMonth className="text-xl text-[#FFAB00]" />
                        {UIText.billing.monthly_plan.title}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                        {UIText.billing.monthly_plan.description}
                    </p>
                    <div className="text-3xl font-bold text-gray-900 dark:text-[#FFAB00] mb-2">
                        {UIText.billing.monthly_plan.dollar}
                        <span className="text-sm text-[#333333] dark:text-gray-300 font-medium">
                            {UIText.billing.monthly_plan.per_month}
                        </span>
                    </div>

                    <ul className="space-y-4 mb-6 text-sm mt-8 text-[#666666] dark:text-gray-300">
                        {monthlyPlan.map((feature, index) => (
                            <li key={index} className="flex flex-row gap-2 items-center">
                                <FaRegCheckCircle className="text-xl text-green-600" />
                                {feature}
                            </li>
                        ))}
                    </ul>

                    <button
                        className="inline-flex items-center justify-center gap-3 py-3 w-full text-sm font-semibold bg-[#FFAB00] text-white hover:bg-[#ffbc37] dark:hover:bg-[#ffbc37]/90 rounded-full px-7 transition-colors"
                        onClick={handleMonthlyPlan}
                    >
                        {UIText.billing.monthly_plan.button}
                    </button>
                </div>

                {/* Yearly Plan */}
                <div className="bg-white dark:bg-[#333333] rounded-2xl shadow-sm p-6 border border-gray-100 dark:border-[#FFAB00]/40 transition-colors duration-200">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-[#EAEAEA] flex items-center gap-2">
                        <GiCalendarHalfYear className="text-xl text-[#FFAB00]" />
                        {UIText.billing.yearly_plan.title}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                        {UIText.billing.yearly_plan.description}
                    </p>
                    <div className="text-3xl font-bold text-gray-900 dark:text-[#FFAB00] mb-2">
                        {UIText.billing.yearly_plan.dollar}
                        <span className="text-sm text-[#333333] dark:text-gray-300 font-medium">
                            {UIText.billing.yearly_plan.per_year}
                        </span>
                    </div>

                    <ul className="space-y-4 mb-6 text-sm mt-8 text-[#666666] dark:text-gray-300">
                        {yearlyPlan.map((feature, index) => (
                            <li key={index} className="flex flex-row gap-2 items-center">
                                <FaRegCheckCircle className="text-xl text-green-600" />
                                {feature}
                            </li>
                        ))}
                    </ul>

                    <button
                        className="inline-flex items-center justify-center gap-3 py-3 w-full text-sm font-semibold bg-[#eeeeee] dark:bg-[#444444] text-[#666666] dark:text-[#EAEAEA] hover:bg-[#666666] hover:text-white dark:hover:bg-[#FFAB00] dark:hover:text-black rounded-full px-7 transition-colors"
                        onClick={handleYearlyPlan}
                    >
                        {UIText.billing.yearly_plan.button}
                    </button>
                </div>
            </div>

            {/* Global Toast */}
            {toastType && (
                <div className="fixed bottom-6 right-6 z-50">
                    <Toast
                        infoMessage={toastType === "info" ? toastMessage : ""}
                        errorMessage={toastType === "error" ? toastMessage : ""}
                        successMessage={toastType === "success" ? toastMessage : ""}
                    />
                </div>
            )}
        </>
    );
};

export default Plans;