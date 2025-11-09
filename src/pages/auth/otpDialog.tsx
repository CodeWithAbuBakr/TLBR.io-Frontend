"use client";
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../../utilities/useData";
import { Modal } from "../../components/ui/modal";
import type { DialogProps } from "../../utilities/type";
import { GoVerified } from "react-icons/go";
import { verifyOTP } from "../../services/auth/signin/verifyOTP";
import { loginUser } from "../../services/auth/signin/loginUser";
import UIText from "../../utilities/testResource";

const OTPDialog: React.FC<DialogProps> = ({
    isModalOpen,
    setIsModalOpen,
    setToastType,
    setToastMessage,
    setIsLoader,
    setOpenOTPModel,
}) => {
    const navigate = useNavigate();
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
    const { darkMode, showSuccessScreen, setShowSuccessScreen } = useData();
    const [resendTimer, setResendTimer] = useState(0);
    const [isResending, setIsResending] = useState(false);
    const userSession = localStorage.getItem("userSession");

    let email: string;
    let password: string;
    let isChecked: boolean;
    if (userSession) {
        const parsedSession = JSON.parse(userSession);
        email = parsedSession.email;
        password = parsedSession.password;
        isChecked = parsedSession.isChecked;
    }

    const handleCancel = () => {
        setIsModalOpen(false);
        localStorage.removeItem("userSession");
    }

    const handleVerify = () => {
        const otp = inputsRef.current.map((input) => input?.value || "").join("");

        if (otp.length !== 6) {
            setToastType("info");
            setToastMessage("Please enter a valid 6-digit code.");
            return;
        }

        // start loading
        setIsLoader(true);
        setOpenOTPModel(false);

        // Call the API to verify the otp
        verifyOTP(email, otp, (error, data) => {
            if (error) {
                console.log("Verify OTP error:", error);
                setIsLoader(false);
                setOpenOTPModel(true);

                setToastType("error");
                setToastMessage(error.message || "An error occurred during verifying OTP.");
            } else if (data) {
                console.log("Verify OTP success:", data);

                setIsLoader(false);
                setShowSuccessScreen(true);
                localStorage.setItem("isAuth", "true");

                setToastType("success");
                setToastMessage("Your account has been verified successfully.");

                // Redirect after short delay
                setTimeout(() => {
                    setToastType(null);
                    setToastMessage('');
                    setIsModalOpen(false);
                    setShowSuccessScreen(false);

                    navigate("/dashboard");
                }, 2000);
            }
        });
    };

    const handleInput = (e: React.FormEvent<HTMLInputElement>, index: number) => {
        const input = e.currentTarget;
        const value = input.value;

        if (!/^[0-9]$/.test(value) && value !== "") {
            input.value = "";
            setToastType("info");
            setToastMessage("Please enter only digits.");
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

        // Only take up to the number of inputs available
        const chars = pastedData.slice(0, inputsRef.current.length).split("");

        let hasInvalidChar = false;

        chars.forEach((char, i) => {
            if (!/^[0-9]$/.test(char) && char !== "") {
                hasInvalidChar = true;
                return;
            }

            const input = inputsRef.current[i];
            if (input) {
                input.value = char;
            }
        });

        if (hasInvalidChar) {
            setToastType("info");
            setToastMessage("Please enter only digits.");
            return;
        }

        // Focus the next empty input
        const nextEmpty = chars.length < inputsRef.current.length ? chars.length : inputsRef.current.length - 1;
        inputsRef.current[nextEmpty]?.focus();
    };

    // Handle resend OTP logic
    const handleResendOTP = async () => {
        if (resendTimer > 0 || isResending) return;

        try {
            setIsResending(true);

            // Call the API to authenticate the user
            loginUser(email, password, isChecked, (error, data) => {
                if (error) {
                    console.log("Resend OTP error:", error);

                    setToastType("error");
                    setToastMessage("Failed to resend OTP. Please try again.");
                } else if (data) {
                    console.log("Resend OTP success:", data);

                    setToastType("success");
                    setToastMessage(`A new OTP has been sent to your ${email}.`);
                }
            });

            setResendTimer(60);
        } catch (error) {
            console.log(error);
            setToastType("error");
            setToastMessage("Failed to resend verification code. Please try again.");
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
                                        ref={(el) => {
                                            inputsRef.current[index] = el;
                                        }}
                                        onInput={(e) => handleInput(e, index)}
                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                        onPaste={index === 0 ? handlePaste : undefined}
                                        className={`w-12 h-12 text-center text-lg font-semibold border rounded-xl outline-none transition-all
                                        focus:border-[#FFAB00] focus:ring-2 focus:ring-orange-200 dark:focus:ring-[#FFAB00]
                                            ${darkMode
                                                ? "bg-[#2A2A2A] text-gray-100 border-gray-700 focus:border-[#FFAB00]"
                                                : "bg-white text-gray-800 border-gray-300"}`}
                                    />
                                ))}
                            </div>

                            {/* Resend OTP Section */}
                            <div className="mb-8 ml-3">
                                <p
                                    className={`text-sm transition-colors duration-300 ${darkMode ? "text-gray-400" : "text-gray-500"
                                        }`}
                                >
                                    {UIText.auth.verifyOTP.code_not_recieved}
                                    <button
                                        onClick={handleResendOTP}
                                        disabled={resendTimer > 0 || isResending}
                                        className={`font-medium ml-1 transition-colors cursor-pointer ${resendTimer > 0 || isResending
                                            ? darkMode
                                                ? "text-gray-500 cursor-not-allowed"
                                                : "text-gray-400 cursor-not-allowed"
                                            : darkMode
                                                ? "text-yellow-400 hover:underline"
                                                : "text-[#FFAB00] hover:underline"
                                            }`}
                                    >
                                        {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend OTP"}
                                    </button>
                                </p>
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={handleCancel}
                                    className={`inline-flex items-center justify-center cursor-pointer gap-3 py-3 w-full text-sm font-normal rounded-full px-7 transition-colors
                                        border ${darkMode
                                            ? "border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                                            : "border-gray-300 text-gray-700 hover:bg-gray-700 hover:text-white"}`}
                                >
                                    {UIText.auth.verifyOTP.cancel}
                                </button>
                                <button
                                    onClick={handleVerify}
                                    className={`inline-flex items-center justify-center cursor-pointer gap-3 py-3 w-full text-sm font-normal rounded-full px-7 transition-colors
                                        ${darkMode
                                            ? "bg-[#FFAB00] text-black hover:bg-[#ffbc37]"
                                            : "bg-[#FFAB00] text-white hover:bg-[#ffbc37]"}`}
                                >
                                    {UIText.auth.verifyOTP.verify_account}
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-8 animate-fadeIn">
                            <GoVerified className="text-5xl mb-8 text-[#FFAB00] animate-popIn animate-glow" />
                            <h3 className="text-lg font-semibold text-[#0A0A04] dark:text-gray-100">
                                {UIText.auth.verifyOTP.success.title}
                            </h3>
                            <p className="text-sm text-[#666666] dark:text-gray-400 mt-2">
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