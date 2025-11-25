"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import { useData } from "../../utilities/useData";
import UIText from "../../utilities/testResource";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import { FcProcess } from "react-icons/fc";
import { getVerifySession } from "../../services/apiWrapper";
import Loader from "../../loader/loader";
import { tokens } from "../../utilities/getLocalStorageData";

const PaymentResult: React.FC = () => {
    const navigate = useNavigate();
    const decryptedTokens = tokens();
    const { darkMode, isLoader, setIsLoader, isModalOpen, setIsModalOpen } = useData();
    const [verificationStatus, setVerificationStatus] = useState<"pending" | "success" | "error">("pending");

    // Get session_id from URL
    const sessionId = useMemo(() => {
        const params = new URLSearchParams(window.location.search);
        return params.get("session_id") || "";
    }, []);

    useEffect(() => {
        if (!sessionId) return;
        if (!decryptedTokens) return;

        setIsLoader(true);
        setIsModalOpen(true);
        const accessToken = decryptedTokens.accessToken;

        getVerifySession(accessToken, sessionId)
            .then((data) => {
                console.log("Payment verification result:", data);
                setVerificationStatus("success");

                // Add current timestamp to localStorage when session start
                const currentISO = new Date().toISOString();
                const encryptedCurrentISO = CryptoJS.AES.encrypt(currentISO, import.meta.env.VITE_SECRET_KEY).toString();
                localStorage.setItem("currentISO", encryptedCurrentISO);

                setIsLoader(false);
                setIsModalOpen(false);
            })
            .catch((error: Error) => {
                console.error("Payment verification error:", error);
                setVerificationStatus("error");

                setIsLoader(false);
                setIsModalOpen(false);
            });
    }, [decryptedTokens, sessionId, setIsLoader, setIsModalOpen]);

    // Loader
    if (isModalOpen && isLoader) {
        return <Loader
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
        />;
    };

    return (
        <>
            <div className={`flex flex-col items-center justify-center min-h-screen px-4 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
                <div className={`shadow-lg rounded-2xl p-10 max-w-md text-center ${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"}`}>
                    {verificationStatus === "success" ? (
                        <>
                            <div className="flex justify-center mb-6">
                                <AiFillCheckCircle className="w-20 h-20 text-[#94E561]" />
                            </div>
                            <h1 className="text-2xl font-semibold text-[#94E561] mb-3">
                                {UIText.billing.payment.success.title}
                            </h1>
                            <p className={`text-base mb-8 leading-relaxed ${darkMode ? "text-gray-300" : "text-[#666666]"}`}>
                                {UIText.billing.payment.success.description}
                            </p>
                            <button
                                onClick={() => navigate("/dashboard")}
                                className="bg-[#94E561] hover:bg-[#63cb23] cursor-pointer text-white font-medium py-3 px-8 rounded-full transition-all duration-200"
                            >
                                {UIText.billing.payment.success.button}
                            </button>
                        </>
                    ) : verificationStatus === "error" ? (
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
                    ) : (
                        <>
                            <div className="flex justify-center mb-6">
                                <FcProcess className="w-20 h-20 text-gray-400 animate-pulse" />
                            </div>
                            <h1 className={`text-2xl font-semibold mb-3 ${darkMode ? "text-gray-100" : "text-gray-600"}`}>
                                {UIText.billing.payment.processing.title}
                            </h1>
                            <p className={`text-base mb-8 leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-500"}`}>
                                {UIText.billing.payment.processing.description}
                            </p>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default PaymentResult;