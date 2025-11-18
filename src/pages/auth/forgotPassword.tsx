"use client";
import React from "react";
import { Modal } from "../../components/ui/modal";
import Loader from "../../loader/loader";
import { useData } from "../../utilities/useData";
import Label from "../../components/ui/input/Label";
import Input from "../../components/ui/input/InputField";
import UIText from "../../utilities/testResource";
import type { ForgotPasswordDialogProps } from "../../utilities/type";
import { forgotPassword } from "../../services/auth/signin/forgotPassword";

const ForgotPassword: React.FC<ForgotPasswordDialogProps> = ({
    isModalOpen,
    setIsModalOpen,
    setOpenForgotPasswordModel,
}) => {
    const { darkMode, email, setEmail, setPassword, setToastType, setToastMessage,
        isLoader, setIsLoader, openForgotPasswordModel, } = useData();

    // Email validation helper
    const isValidEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Cancel button
    const handleCancel = () => {
        setEmail("");

        setIsModalOpen(false);
        setOpenForgotPasswordModel(false);
    };

    const handleSendLink = () => {
        // Basic validation
        if (!email) {
            setToastType("info");
            setToastMessage("Please enter your email address.");
            return;
        }

        if (!isValidEmail(email)) {
            setToastType("error");
            setToastMessage("Please enter a valid email address.");
            return;
        }

        // Start loading
        setIsLoader(true);
        setOpenForgotPasswordModel(false);

        // Forgot Password API call
        forgotPassword(email, (error, data) => {
            if (error) {
                console.error("Forgot Password error:", error);
                setIsLoader(false);
                setOpenForgotPasswordModel(true);

                setToastType("error");
                setToastMessage(error.message || "An error occurred while sending the reset link.");
            } else if (data) {
                console.log("Forgot Password success:", data);
                setIsLoader(false);

                setToastType("info");
                setToastMessage(data.message);

                // Reset email input
                setEmail('');
                setPassword('');
            }
        });
    };

    return (
        <>
            {isModalOpen && openForgotPasswordModel !== false && isLoader !== true && (
                <Loader
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                />
            )}

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                className={`max-w-md mx-8 p-2 md:p-4 lg:p-6 xl:p-6 rounded-2xl relative transition-colors duration-300 shadow-lg
                    ${darkMode
                        ? "bg-[#1E1E1E] text-gray-100 border border-gray-700"
                        : "bg-white text-gray-900 border border-gray-200"
                    }`}
            >
                <div className="p-4">
                    <h3 className={`text-lg font-semibold mb-2 transition-colors duration-300 ${darkMode ? "text-gray-100" : "text-[#0A0A04]"}`}>
                        {UIText.auth.forgotPassword.title}
                    </h3>
                    <p className={`text-sm mb-6 transition-colors duration-300 ${darkMode ? "text-gray-400" : "text-[#666666]"}`}>
                        {UIText.auth.forgotPassword.description}
                    </p>

                    {/* Email Input */}
                    <div>
                        <Label>
                            {UIText.auth.signIn.email}{" "}
                            <span className="text-error-500">*</span>
                        </Label>
                        <Input
                            placeholder="info@gmail.com"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`${darkMode
                                ? "bg-gray-900 text-white border-gray-700"
                                : "bg-white text-gray-900 border-gray-300"
                                }`}
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-col md:flex-row justify-end gap-3 mt-8">
                        <button
                            onClick={handleCancel}
                            className={`inline-flex items-center justify-center cursor-pointer gap-3 py-3 w-full text-sm font-normal rounded-full px-7 transition-colors
                            border ${darkMode
                                    ? "border-gray-600 text-gray-300 hover:bg-[#CCCCCC] hover:text-white"
                                    : "border-gray-300 text-gray-700 hover:bg-[#666666] hover:text-white"
                                }`}
                        >
                            {UIText.auth.forgotPassword.cancel}
                        </button>
                        <button
                            onClick={handleSendLink}
                            className={`inline-flex items-center justify-center cursor-pointer gap-3 py-3 w-full text-sm font-normal rounded-full px-7 transition-colors
                                ${darkMode
                                    ? "bg-[#94E561] text-black hover:bg-[#63cb23]"
                                    : "bg-[#94E561] text-white hover:bg-[#63cb23]"
                                }`}
                        >
                            {UIText.auth.forgotPassword.reset_link}
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default ForgotPassword;