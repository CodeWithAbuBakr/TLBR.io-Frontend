import React, { useState, useMemo } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { useData } from '../../utilities/useData';
import Toast from "../../hooks/useToast";
import Loader from '../../loader/loader';
import Label from '../../components/ui/input/Label';
import Input from '../../components/ui/input/InputField';
import { GoEye, GoEyeClosed, GoVerified } from 'react-icons/go';
import { resetPassword } from '../../services/auth/signin/resetPassword';
import UIText from '../../utilities/testResource';
import type { ResetPasswordStatus } from '../../utilities/type';

const ResetPassword: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [resetPasswordStatus, setResetPasswordStatus] = useState<ResetPasswordStatus>("pending");
    const { darkMode, password, setPassword, showPassword, setShowPassword, passwordStrength,
        setPasswordStrength, toastType, setToastType, toastMessage, setToastMessage, isModalOpen,
        setIsModalOpen, isLoader, setIsLoader } = useData();

    // Extract token from URL
    const resetLink = useMemo(() => {
        const path = location.pathname;
        return path.includes("/reset-password/") ? path.split("/reset-password/")[1] : "";
    }, [location.pathname]);

    // Evaluate Password Strength
    const evaluatePasswordStrength = (value: string) => {
        if (!value) {
            setPasswordStrength({ message: "", color: "" });
            return;
        }

        const hasLower = /[a-z]/.test(value);
        const hasUpper = /[A-Z]/.test(value);
        const hasNumber = /\d/.test(value);
        const hasSpecial = /[\W_]/.test(value);
        const passed = [hasLower, hasUpper, hasNumber, hasSpecial].filter(Boolean).length;

        if (value.length < 8 || passed <= 1) {
            setPasswordStrength({
                message: "Password is too weak. Add uppercase, lowercase, numbers, and special characters.",
                color: "text-error-500",
            });
        } else if (passed === 2 || passed === 3) {
            setPasswordStrength({
                message: "Password is acceptable but could be stronger. Include more diverse characters.",
                color: "text-[#FFAB00]",
            });
        } else if (passed === 4 && value.length >= 8) {
            setPasswordStrength({
                message: "Your password looks secure.",
                color: "text-success-500",
            });
        }
    };

    if (isModalOpen && isLoader !== false) {
        return (
            <Loader
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
            />
        );
    };

    const handleResetPassword = () => {
        // Check if new password is empty
        if (password === "") {
            setToastType("error");
            setToastMessage("Password cannot be empty.");
            setPasswordStrength({ message: "", color: "" });
            return;
        }

        if (resetLink && passwordStrength.message === "Your password looks secure.") {
            // Start loading
            setIsLoader(true);
            setIsModalOpen(true);

            // Forgot Password API call
            resetPassword(password, resetLink, (error, data) => {
                if (error) {
                    console.error("Reset Password error:", error);
                    setIsLoader(false);
                    setResetPasswordStatus("error");

                    setToastType("error");
                    setToastMessage(error.message || "An error occurred while reset password.");
                } else if (data) {
                    console.log("Reset Password success:", data);
                    setIsLoader(false);
                    setResetPasswordStatus("success");

                    setToastType("success");
                    setToastMessage(data.message);

                    // Reset inputs
                    setPassword('');
                    setPasswordStrength({ message: "", color: "" });
                }
            });
        };
    };

    return (
        <>
            {resetPasswordStatus === "success" ? (
                <div className={`flex flex-col items-center justify-center min-h-screen px-4 
                    ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>

                    <div className={`shadow-lg rounded-2xl p-10 max-w-md text-center 
                         ${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"}`}>
                        <div className="flex justify-center mb-6">
                            <GoVerified className="w-20 h-20 text-[#FFAB00]" />
                        </div>

                        <h3 className={`text-lg font-semibold ${darkMode ? 'text-gray-100' : 'text-[#0A0A04]'}`}>
                            {UIText.auth.resetPassword.success.title}
                        </h3>

                        <p className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-[#666666]'}`}>
                            {UIText.auth.resetPassword.success.description}
                        </p>

                        <button
                            onClick={() => navigate('/')}
                            className="w-full bg-[#FFAB00] cursor-pointer text-white py-3 px-8 mt-6 rounded-full font-medium transition-all duration-200"
                        >
                            {UIText.auth.resetPassword.success.button}
                        </button>
                    </div>
                </div>
            ) : resetPasswordStatus === "error" ? (
                <div className={`flex flex-col items-center justify-center min-h-screen px-4 
                        ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>

                    <div className={`shadow-lg rounded-2xl p-10 max-w-md text-center 
                            ${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"}`}>
                        <div className="flex justify-center mb-6">
                            <GoVerified className="w-20 h-20 text-[#FFAB00]" />
                        </div>

                        <h3 className={`text-lg font-semibold ${darkMode ? 'text-gray-100' : 'text-[#0A0A04]'}`}>
                            {UIText.auth.resetPassword.failed.title}
                        </h3>

                        <p className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-[#666666]'}`}>
                            {UIText.auth.resetPassword.failed.description}
                        </p>

                        <button
                            onClick={() => navigate('/')}
                            className="w-full bg-[#FFAB00] cursor-pointer text-white py-3 px-8 mt-6 rounded-full font-medium transition-all duration-200"
                        >
                            {UIText.auth.resetPassword.failed.button}
                        </button>
                    </div>
                </div>
            ) : (
                <div className={`flex flex-col items-center justify-center min-h-screen px-4
                    ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>

                    <div className={`shadow-lg rounded-2xl p-10 max-w-md w-full
                        ${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"}`}>
                        <h1 className="text-2xl font-semibold mb-3" style={{ color: '#FFAB00' }}>
                            {UIText.auth.resetPassword.title}
                        </h1>

                        <p className="text-base mb-6 leading-relaxed text-[#666666]">
                            {UIText.auth.resetPassword.description}
                        </p>

                        {/* Password Input */}
                        <div>
                            <Label>
                                {UIText.auth.resetPassword.password}
                                <span className="text-error-500">*</span>
                            </Label>
                            <div className="relative">
                                <Input
                                    placeholder="Enter your password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        setPassword(e.target.value);
                                        evaluatePasswordStrength(e.target.value);
                                    }}
                                    className={`w-full p-3 rounded-xl border focus:outline-none focus:ring-2
                                        ${darkMode ? "bg-gray-900 text-white border-gray-700" : "bg-white text-gray-900 border-gray-300"}`}
                                />
                                <span
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                                >
                                    {showPassword ? (
                                        <GoEye
                                            className={`${darkMode ? "fill-gray-300 hover:fill-[#FFAB00]" : "fill-gray-500 hover:fill-[#FFAB00]"}`}
                                        />
                                    ) : (
                                        <GoEyeClosed
                                            className={`${darkMode ? "fill-gray-300 hover:fill-[#FFAB00]" : "fill-gray-500 hover:fill-[#FFAB00]"}`}
                                        />
                                    )}
                                </span>
                            </div>

                            {/* Password Strength Message */}
                            {passwordStrength.message && (
                                <p
                                    className={`mt-1 text-sm 
                                        ${passwordStrength.color === "text-error-500"
                                            ? darkMode
                                                ? "text-red-500"
                                                : "text-red-600"
                                            : passwordStrength.color === "text-[#FFAB00]"
                                                ? darkMode
                                                    ? "text-[#FFD166]"
                                                    : "text-[#FFAB00]"
                                                : passwordStrength.color === "text-success-500"
                                                    ? darkMode
                                                        ? "text-green-500"
                                                        : "text-green-600"
                                                    : ""
                                        }`}
                                >
                                    {passwordStrength.message}
                                </p>
                            )}
                        </div>

                        {/* Reset Password Button */}
                        <button
                            onClick={handleResetPassword}
                            className="w-full bg-[#FFAB00] cursor-pointer text-white py-3 px-8 mt-6 rounded-full font-medium transition-all duration-200"
                        >
                            {UIText.auth.resetPassword.button}
                        </button>
                    </div>
                </div>
            )};

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

export default ResetPassword;