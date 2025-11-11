"use client";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../../utilities/useData";
import UIText from "../../utilities/testResource";
import { AiFillCloseCircle } from "react-icons/ai";

const PaymentCancel: React.FC = () => {
    const navigate = useNavigate();
    const { darkMode } = useData();

    return (
        <div className={`flex flex-col items-center justify-center min-h-screen px-4 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
            <div className={`shadow-lg rounded-2xl p-10 max-w-md text-center ${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"}`}>
                <div className="flex justify-center mb-6">
                    <AiFillCloseCircle className="w-20 h-20 text-red-500" />
                </div>

                <h1 className="text-2xl font-semibold text-red-500 mb-3">
                    {UIText.billing.payment.cancel.title}
                </h1>

                <p className={`text-base mb-8 leading-relaxed ${darkMode ? "text-gray-300" : "text-[#666666]"}`}>
                    {UIText.billing.payment.cancel.description}
                </p>

                <button
                    onClick={() => navigate("/billing")}
                    className="bg-red-500 hover:bg-red-600 cursor-pointer text-white font-medium py-3 px-8 rounded-full transition-all duration-200"
                >
                    {UIText.billing.payment.cancel.button}
                </button>
            </div>
        </div>
    );
};

export default PaymentCancel;
