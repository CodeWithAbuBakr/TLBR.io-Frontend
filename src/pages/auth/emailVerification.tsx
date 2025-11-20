"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Loader from "../../loader/loader";
import Toast from "../../hooks/useToast";
import CryptoJS from "crypto-js";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import { useData } from "../../utilities/useData";
import { verifyUser } from "../../services/auth/signup/verifyUser";
import UIText from "../../utilities/testResource";

const EmailVerification: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const hasVerified = useRef(false);
    const { darkMode, setActiveForm, toastType, setToastType, toastMessage, setToastMessage,
        isLoader, setIsLoader, isModalOpen, setIsModalOpen } = useData();
    const [verificationStatus, setVerificationStatus] = useState<"pending" | "success" | "error">("pending");

    // Extract token from URL
    const token = useMemo(() => {
        const path = location.pathname;
        return path.includes("/token/") ? path.split("/token/")[1] : "";
    }, [location.pathname]);

    // Call the API to verify the user
    useEffect(() => {
        if (token !== "") {
            setIsLoader(true);
            setIsModalOpen(true);
            setVerificationStatus("pending");
            const encryptedIsAuth = CryptoJS.AES.encrypt("false", import.meta.env.VITE_SECRET_KEY).toString();
            localStorage.setItem("isAuth", encryptedIsAuth);

            if (hasVerified.current !== true) {
                hasVerified.current = true;

                verifyUser(token, (error, data) => {
                    if (error) {
                        console.log("Verification error:", error);
                        setIsLoader(false);
                        setIsModalOpen(false);
                        hasVerified.current = true;
                        setVerificationStatus("error");

                        setToastType("error");
                        setToastMessage(error.message || "An error occurred during verification.");
                    } else if (data) {
                        console.log("Verification success:", data);
                        setIsLoader(false);
                        setIsModalOpen(false);
                        setVerificationStatus("success");

                        setToastType("success");
                        setToastMessage("User verified successfully");
                    }
                });
            }
        }
    }, [token, setIsLoader, setIsModalOpen, setToastType, setToastMessage]);

    const handleContinueToSignin = async () => {
        setToastType(null);
        setToastMessage("");

        setActiveForm("signin");
        navigate('/');
    }

    const handleContinueToSignup = async () => {
        setToastType(null);
        setToastMessage("");

        setActiveForm("signup");
        navigate('/');
    }

    // Loader
    if (isModalOpen && isLoader !== false) {
        return (
            <Loader
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
            />
        );
    };

    // Error UI
    if (verificationStatus === "error") {
        return (
            <>
                <div
                    className={`flex flex-col items-center justify-center min-h-screen px-4 
                    ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}
                >
                    <div
                        className={`shadow-lg rounded-2xl p-10 max-w-md text-center 
                        ${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"}`}
                    >
                        {/* Error Icon */}
                        <div className="flex justify-center mb-6">
                            <AiFillCloseCircle className="w-20 h-20 text-red-500" />
                        </div>

                        {/* Title */}
                        <h1 className="text-2xl font-semibold text-red-500 mb-3">
                            {UIText.auth.verifyUser.failed.title}
                        </h1>

                        {/* Message */}
                        <p
                            className={`text-base mb-8 leading-relaxed 
                            ${darkMode ? "text-gray-300" : "text-[#666666]"}`}
                        >
                            {UIText.auth.verifyUser.failed.description}
                        </p>

                        {/* Go to Signup Button */}
                        <button
                            onClick={handleContinueToSignup}
                            className="bg-red-500 hover:bg-red-600 cursor-pointer text-white font-medium py-3 px-8 rounded-full transition-all duration-200"
                        >
                            {UIText.auth.verifyUser.failed.button}
                        </button>
                    </div>
                </div>

                {/* Toast */}
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

    return (
        <>
            {verificationStatus === "success" && (
                <div
                    className={`flex flex-col items-center justify-center min-h-screen px-4 
                    ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}
                >
                    <div
                        className={`shadow-lg rounded-2xl p-10 max-w-md text-center 
                        ${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"}`}
                    >
                        {/* Success Icon */}
                        <div className="flex justify-center mb-6">
                            <AiFillCheckCircle className="w-20 h-20 text-[#94E561]" />
                        </div>

                        {/* Title */}
                        <h1 className="text-2xl font-semibold text-[#94E561] mb-3">
                            {UIText.auth.verifyUser.success.title}
                        </h1>

                        {/* Message */}
                        <p
                            className={`text-base mb-8 leading-relaxed 
                            ${darkMode ? "text-gray-300" : "text-[#666666]"}`}
                        >
                            {UIText.auth.verifyUser.success.description_1}
                            <span className="font-semibold text-[#94E561]">
                                {UIText.auth.verifyUser.success.description_2}
                            </span>
                            {UIText.auth.verifyUser.success.description_3}
                        </p>

                        {/* Continue Button */}
                        <button
                            onClick={handleContinueToSignin}
                            className="bg-[#94E561] hover:bg-[#63cb23] cursor-pointer text-white font-medium py-3 px-8 rounded-full transition-all duration-200"
                        >
                            {UIText.auth.verifyUser.success.button}
                        </button>
                    </div>
                </div>
            )}

            {/* Toast */}
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

export default EmailVerification;