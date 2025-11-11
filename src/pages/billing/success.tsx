"use client";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../../utilities/useData";
import UIText from "../../utilities/testResource";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import type { StatusProps } from "../../utilities/type";

const Success: React.FC<StatusProps> = ({ status }) => {
    const navigate = useNavigate();
    const { darkMode } = useData();
    const [currentStatus, setCurrentStatus] = useState(status);

    useEffect(() => {
        setCurrentStatus(status);
    }, [status]);

    if (currentStatus === "pending") return null;

    return (
        <>
            <div className={`flex flex-col items-center justify-center min-h-screen px-4 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
                <div className={`shadow-lg rounded-2xl p-10 max-w-md text-center ${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"}`}>
                    {currentStatus === "success" ? (
                        <>
                            {/* Success Icon */}
                            <div className="flex justify-center mb-6">
                                <AiFillCheckCircle className="w-20 h-20 text-[#FFAB00]" />
                            </div>

                            {/* Title */}
                            <h1 className="text-2xl font-semibold text-[#FFAB00] mb-3">
                                {UIText.billing.payment.success.title}
                            </h1>

                            {/* Message */}
                            <p className={`text-base mb-8 leading-relaxed ${darkMode ? "text-gray-300" : "text-[#666666]"}`}>
                                {UIText.billing.payment.success.description}
                            </p>

                            {/* Continue Button */}
                            <button
                                onClick={() => navigate('/dashboard')}
                                className="bg-[#FFAB00] hover:bg-[#e09b00] cursor-pointer text-white font-medium py-3 px-8 rounded-full transition-all duration-200"
                            >
                                {UIText.billing.payment.success.button}
                            </button>
                        </>
                    ) : (
                        <>
                            {/* Error Icon */}
                            <div className="flex justify-center mb-6">
                                <AiFillCloseCircle className="w-20 h-20 text-red-500" />
                            </div>

                            {/* Title */}
                            <h1 className={`text-2xl font-semibold mb-3 ${darkMode ? "text-gray-100" : "text-red-500"}`}>
                                {UIText.billing.payment.failed.title}
                            </h1>

                            {/* Message */}
                            <p className={`text-base mb-8 leading-relaxed ${darkMode ? "text-gray-300" : "text-[#666666]"}`}>
                                {UIText.billing.payment.failed.description}
                            </p>

                            {/* Go to Signup Button */}
                            <button
                                onClick={() => navigate('/billing.payment')}
                                className="bg-red-500 hover:bg-red-600 cursor-pointer text-white font-medium py-3 px-8 rounded-full transition-all duration-200"
                            >
                                {UIText.billing.payment.failed.button}
                            </button>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default Success;