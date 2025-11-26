"use client";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import { useData } from "../../utilities/useData";
import { Modal } from "../../components/ui/modal";
import type { DialogProps } from "../../utilities/type";
import { GoVerified } from "react-icons/go";
import { verifyOTP } from "../../services/auth/signin/verifyOTP";
import { loginUser } from "../../services/auth/signin/loginUser";
import UIText from "../../utilities/testResource";
import { userSession } from "../../utilities/getLocalStorageData";

const OTPDialog: React.FC<DialogProps> = ({
    isModalOpen,
    setIsModalOpen,
    toastMessage,
    setToastMessage,
    setIsLoader,
    setOpenOTPModel,
}) => {
    const navigate = useNavigate();
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
    const { darkMode, showSuccessScreen, setShowSuccessScreen } = useData();
    const [resendOTPVisible, setResendOTPVisible] = useState(false);
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const [resendTimer, setResendTimer] = useState(0);
    const [isResending, setIsResending] = useState(false);
    const decryptedUserSession = userSession();

    let email: string;
    let password: string;
    let isChecked: boolean;
    if (decryptedUserSession) {
        email = decryptedUserSession.email;
        password = decryptedUserSession.password;
        isChecked = decryptedUserSession.isChecked;
    }

    const handleCancel = () => {
        setIsModalOpen(false);

        localStorage.removeItem("tokens");
        localStorage.removeItem("userSession");
    };

    const handleVerify = () => {
        const otp = inputsRef.current.map((input) => input?.value || "").join("");

        if (otp.length !== 6) {
            setToastMessage({
                type: "info",
                message: "Please enter a valid 6-digit code.",
                id: Date.now(),
            });
            return;
        }

        setIsLoader(true);
        setOpenOTPModel(false);

        verifyOTP(email, otp, (error, data) => {
            if (error) {
                console.log("Verify OTP error:", error);
                setIsLoader(false);
                setOpenOTPModel(true);

                setToastMessage({
                    type: "error",
                    message: error.message || "An error occurred during verifying OTP.",
                    id: Date.now(),
                });
            } else if (data) {
                console.log("Verify OTP success:", data);

                setIsLoader(false);
                setShowSuccessScreen(true);
                const encryptedIsAuth = CryptoJS.AES.encrypt("true", import.meta.env.VITE_SECRET_KEY).toString();
                localStorage.setItem("isAuth", encryptedIsAuth);

                setToastMessage({
                    type: "success",
                    message: "Your OTP has been verified successfully.",
                    id: Date.now(),
                });

                setTimeout(() => {
                    setToastMessage(null);
                    setIsModalOpen(false);
                    setShowSuccessScreen(false);

                    navigate("/dashboard");
                }, 2000);
            }
        });
    };

    useEffect(() => {
        if (toastMessage?.type === "error") {
            setResendTimer(60);
            setResendOTPVisible(true);
        }
    }, [toastMessage?.type]);

    const handleInput = (e: React.FormEvent<HTMLInputElement>, index: number) => {
        const input = e.currentTarget;
        const value = input.value;

        if (!/^[0-9]$/.test(value) && value !== "") {
            input.value = "";

            setToastMessage({
                type: "info",
                message: "Please enter only digits.",
                id: Date.now(),
            });
            return;
        }

        if (value !== "" && index < inputsRef.current.length - 1) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        const input = e.currentTarget;

        if (e.key === "Backspace" && input.value === "" && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").trim();
        const chars = pastedData.slice(0, inputsRef.current.length).split("");

        let hasInvalidChar = false;

        chars.forEach((char, i) => {
            if (!/^[0-9]$/.test(char) && char !== "") {
                hasInvalidChar = true;
                return;
            }
            const input = inputsRef.current[i];
            if (input) input.value = char;
        });

        if (hasInvalidChar) {
            setToastMessage({
                type: "info",
                message: "Please enter only digits.",
                id: Date.now(),
            });
            return;
        }

        const nextEmpty = chars.length < inputsRef.current.length ? chars.length : inputsRef.current.length - 1;
        inputsRef.current[nextEmpty]?.focus();
    };

    // Countdown for resend OTP
    useEffect(() => {
        let timer: number;
        if (resendTimer > 0) {
            timer = setInterval(() => {
                setResendTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [resendTimer]);

    const handleResendOTP = async () => {
        if (resendTimer > 0 || isResending) return;

        try {
            setIsResending(true);

            loginUser(email, password, isChecked, (error, data) => {
                if (error) {
                    console.log("Resend OTP error:", error);

                    setToastMessage({
                        type: "error",
                        message: "Failed to resend OTP. Please try again.",
                        id: Date.now(),
                    });
                } else if (data) {
                    console.log("Resend OTP success:", data);

                    setToastMessage({
                        type: "success",
                        message: `A new OTP has been sent to your ${email}.`,
                        id: Date.now(),
                    });
                }
            });

            setResendTimer(60);
        } catch (error) {
            console.log(error);

            setToastMessage({
                type: "error",
                message: "Failed to resend verification code. Please try again.",
                id: Date.now(),
            });
        } finally {
            setIsLoader(false);
            setIsResending(false);
        }
    };

    return (
        <>
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                className={`max-w-md mx-8 p-6 rounded-2xl relative transition-colors duration-300 shadow-lg
                    ${darkMode ? "bg-[#1E1E1E] text-gray-100 border border-gray-700" : "bg-white text-gray-900 border border-gray-200"}`}
            >
                <div className="p-4">
                    {!showSuccessScreen ? (
                        <>
                            <h3 className={`text-lg font-semibold mb-2 transition-colors duration-300 ${darkMode ? "text-gray-100" : "text-[#0A0A04]"}`}>
                                {UIText.auth.verifyOTP.title}
                            </h3>
                            <p className={`text-sm mb-6 transition-colors duration-300 ${darkMode ? "text-gray-400" : "text-[#666666]"}`}>
                                {UIText.auth.verifyOTP.description}
                            </p>

                            {/* OTP Input Boxes */}
                            <div className="flex justify-center gap-3 mb-8">
                                {Array.from({ length: 6 }).map((_, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        maxLength={1}
                                        ref={(el: HTMLInputElement | null) => { inputsRef.current[index] = el; }}
                                        onInput={(e) => handleInput(e, index)}
                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                        onPaste={index === 0 ? handlePaste : undefined}
                                        className={`w-12 h-12 text-center text-lg font-semibold border rounded-xl outline-none transition-all
                                            focus:border-[#94E561] focus:ring-2 focus:ring-[#94E561] dark:focus:ring-[#94E561]
                                            ${darkMode ? "bg-[#2A2A2A] text-gray-100 border-gray-700 focus:border-[#94E561]" : "bg-white text-gray-800 border-gray-300"}`}
                                    />
                                ))}
                            </div>

                            {/* Resend OTP Section */}
                            {resendOTPVisible !== false && (
                                <div className="mb-8 ml-3">
                                    <p className={`text-sm transition-colors duration-300 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                        {UIText.auth.verifyOTP.code_not_recieved}{" "}

                                        <span className="relative inline-block">
                                            <button
                                                onClick={handleResendOTP}
                                                disabled={resendTimer > 0 || isResending}
                                                onMouseEnter={() => setTooltipVisible(true)}
                                                onMouseLeave={() => setTooltipVisible(false)}
                                                onFocus={() => setTooltipVisible(true)}
                                                onBlur={() => setTooltipVisible(false)}
                                                className={`font-medium ml-1 transition-colors cursor-pointer ${resendTimer > 0 || isResending
                                                    ? darkMode
                                                        ? "text-gray-500 cursor-not-allowed"
                                                        : "text-gray-400 cursor-not-allowed"
                                                    : darkMode
                                                        ? "text-[#94E561] hover:underline"
                                                        : "text-[#94E561] hover:underline"
                                                    }`}
                                            >
                                                {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend OTP"}
                                            </button>

                                            {/* Tooltip */}
                                            {tooltipVisible && (
                                                <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-2 text-xs font-medium text-white bg-[#94E561] rounded-md whitespace-nowrap z-10">
                                                    {resendTimer > 0
                                                        ? `Resend available in ${resendTimer}s`
                                                        : "Click to send a new OTP code"}
                                                    <svg
                                                        className="absolute top-full left-1/2 -translate-x-1/2 text-[#94E561]"
                                                        width="12"
                                                        height="6"
                                                        viewBox="0 0 12 6"
                                                    >
                                                        <path d="M0 0L6 6L12 0" fill="currentColor" />
                                                    </svg>
                                                </div>
                                            )}
                                        </span>
                                    </p>
                                </div>
                            )}

                            {/* Buttons */}
                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={handleCancel}
                                    className={`inline-flex items-center justify-center cursor-pointer gap-3 py-2.5 w-full text-sm font-normal rounded-full px-7 transition-colors
                                        border ${darkMode
                                            ? "border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                                            : "border-gray-300 text-gray-700 hover:bg-[#333333] hover:text-white"}`}
                                >
                                    {UIText.auth.verifyOTP.cancel}
                                </button>
                                <button
                                    onClick={handleVerify}
                                    className={`inline-flex items-center justify-center cursor-pointer gap-3 py-2.5 w-full text-sm font-normal rounded-full px-7 transition-colors
                                        ${darkMode
                                            ? "bg-[#94E561] text-black hover:bg-[#63cb23]"
                                            : "bg-[#94E561] text-white hover:bg-[#63cb23]"}`}
                                >
                                    {UIText.auth.verifyOTP.verify_account}
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-8 animate-fadeIn">
                            <GoVerified className="text-5xl mb-8 text-[#94E561] animate-popIn animate-glow" />
                            <h3 className={`text-lg font-semibold ${darkMode ? "text-gray-100" : "text-[#0A0A04]"}`}>
                                {UIText.auth.verifyOTP.success.title}
                            </h3>
                            <p className={`text-sm mt-2 ${darkMode ? "text-gray-400" : "text-[#666666]"}`}>
                                {UIText.auth.verifyOTP.success.description}
                            </p>
                        </div>
                    )}
                </div>
            </Modal>
        </>
    );
};

export default OTPDialog;