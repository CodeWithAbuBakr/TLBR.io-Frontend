"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../../utilities/useData";
import UIText from "../../utilities/testResource";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import { getVerifySession } from "../../services/apiWrapper";
import Loader from "../../loader/loader";

const PaymentResult: React.FC = () => {
    const navigate = useNavigate();
    const { darkMode, isLoader, setIsLoader, isModalOpen, setIsModalOpen } = useData();
    const [verificationStatus, setVerificationStatus] = useState<"pending" | "success" | "error">("pending");

    // Get session_id from URL
    const sessionId = useMemo(() => {
        const params = new URLSearchParams(window.location.search);
        return params.get("session_id") || "";
    }, []);

    useEffect(() => {
        if (!sessionId) return;

        setIsLoader(true);
        setIsModalOpen(true);

        getVerifySession(sessionId)
            .then((data) => {
                console.log("Payment verification result:", data);
                setVerificationStatus("success");

                setIsLoader(false);
                setIsModalOpen(false);
            })
            .catch((error: Error) => {
                console.error("Payment verification error:", error);
                setVerificationStatus("error");

                setIsLoader(false);
                setIsModalOpen(false);
            });
    }, [sessionId, setIsLoader, setIsModalOpen]);

    // Loader
    if (isModalOpen && isLoader) {
        return <Loader isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />;
    }

    return (
        <>
            <div className={`flex flex-col items-center justify-center min-h-screen px-4 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
                <div className={`shadow-lg rounded-2xl p-10 max-w-md text-center ${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"}`}>
                    {verificationStatus === "success" ? (
                        <>
                            <div className="flex justify-center mb-6">
                                <AiFillCheckCircle className="w-20 h-20 text-[#FFAB00]" />
                            </div>
                            <h1 className="text-2xl font-semibold text-[#FFAB00] mb-3">
                                {UIText.billing.payment.success.title}
                            </h1>
                            <p className={`text-base mb-8 leading-relaxed ${darkMode ? "text-gray-300" : "text-[#666666]"}`}>
                                {UIText.billing.payment.success.description}
                            </p>
                            <button
                                onClick={() => navigate("/dashboard")}
                                className="bg-[#FFAB00] hover:bg-[#e09b00] cursor-pointer text-white font-medium py-3 px-8 rounded-full transition-all duration-200"
                            >
                                {UIText.billing.payment.success.button}
                            </button>
                        </>
                    ) : (
                        <>
                            <div className="flex justify-center mb-6">
                                <AiFillCloseCircle className="w-20 h-20 text-red-500" />
                            </div>
                            <h1 className={`text-2xl font-semibold mb-3 ${darkMode ? "text-gray-100" : "text-red-500"}`}>
                                {UIText.billing.payment.failed.title}
                            </h1>
                            <p className={`text-base mb-8 leading-relaxed ${darkMode ? "text-gray-300" : "text-[#666666]"}`}>
                                {UIText.billing.payment.failed.description}
                            </p>
                            <button
                                onClick={() => navigate("/billing")}
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

export default PaymentResult;