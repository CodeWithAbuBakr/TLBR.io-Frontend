import React, { useState } from "react";
import UIText from "../../utilities/testResource";
import { FiUser, FiSave, FiEye, FiEyeOff } from "react-icons/fi";
import { useData } from "../../utilities/useData";
import { userDetails, userSession } from "../../utilities/getLocalStorageData";
import Loader from "../../loader/loader";

const ProfileInformation: React.FC = () => {
    const { darkMode, passwordStrength, setPasswordStrength, setToastType, setToastMessage,
        isLoader, setIsLoader, isModalOpen, setIsModalOpen } = useData();
    const decryptedUserDetails = userDetails();
    const decryptedUserSession = userSession();

    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [isOldPasswordCorrect, setIsOldPasswordCorrect] = useState(false);

    const handleOldPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setOldPassword(value);
        // Compare with decrypted saved password
        setIsOldPasswordCorrect(value === decryptedUserSession.password);
    };

    const handleNewPasswordChange = (value: string) => {
        setNewPassword(value);
        // Check if new password is same as old
        if (value === decryptedUserSession.password) {
            setToastType("info");
            setToastMessage("New password cannot be same as old password.");
            setPasswordStrength({ message: "", color: "" });
        } else {
            setToastMessage("");
            evaluatePasswordStrength(value);
        }
    };

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
                message: "Password is acceptable but could be more stronger. Include more diverse characters.",
                color: "text-[#FFAB00]",
            });
        } else if (passed === 4 && value.length >= 8) {
            setPasswordStrength({
                message: "Your password looks secure.",
                color: "text-success-500",
            });
        }
    };

    const isSaveEnabled = passwordStrength.message === "Your password looks secure.";

    const handleSaveChanges = () => {
        setIsLoader(true);
        setIsModalOpen(true);

        // Simulate save delay
        setTimeout(() => {
            setIsLoader(false);
            setIsModalOpen(false);

            setToastType("success");
            setToastMessage("Password updated successfully!");

            setOldPassword("");
            setNewPassword("");
            setIsOldPasswordCorrect(false);
            setPasswordStrength({ message: "", color: "" });
        }, 2000);
    };

    return (
        <>
            {/* Loader */}
            {isModalOpen && isLoader !== false && (
                <Loader
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                />
            )}

            <div
                className={`border rounded-2xl shadow-sm p-6
                ${darkMode ? "border-[#FFAB00] dark:bg-[#333333]" : "bg-white border-gray-100"}`}
            >
                <h2
                    className={`text-lg font-semibold flex items-center gap-2 mb-4 
                    ${darkMode ? "text-[#FFFFFF]" : "text-[#0A0A04]"}`}
                >
                    <FiUser className="text-xl" />
                    {UIText.setting.profile_information.title}
                </h2>

                <div className="space-y-4">
                    {/* Name & Email */}
                    <div>
                        <label
                            className={`block text-sm mb-1 ${darkMode ? "text-[#CCCCCC]" : "text-[#666666]"}`}
                        >
                            {UIText.setting.profile_information.full_name}
                        </label>
                        <input
                            type="text"
                            value={decryptedUserDetails.user.name}
                            readOnly
                            className={`w-full rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#FFAB00]
                                ${darkMode
                                    ? "bg-[#444444] border-[#FFAB00] text-[#FFFFFF]"
                                    : "bg-[#FAFAFA] border border-gray-200 text-[#0A0A04]"}`}
                        />

                        <label
                            className={`block text-sm mb-1 mt-3 ${darkMode ? "text-[#CCCCCC]" : "text-[#666666]"}`}
                        >
                            {UIText.setting.profile_information.email}
                        </label>
                        <input
                            type="email"
                            value={decryptedUserDetails.user.email}
                            readOnly
                            className={`w-full rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#FFAB00]
                                ${darkMode
                                    ? "bg-[#444444] border-[#FFAB00] text-[#FFFFFF]"
                                    : "bg-[#FAFAFA] border border-gray-200 text-[#0A0A04]"}`}
                        />
                    </div>

                    {/* Old Password */}
                    <label
                        className={`block text-sm mb-1 ${darkMode ? "text-[#CCCCCC]" : "text-[#666666]"}`}
                    >
                        {UIText.setting.profile_information.password}
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            value={oldPassword}
                            onChange={handleOldPasswordChange}
                            placeholder="Enter old password"
                            className={`w-full rounded-md p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[#FFAB00]
                                ${darkMode
                                    ? "bg-[#444444] border-[#FFAB00] text-[#FFFFFF]"
                                    : "bg-[#FAFAFA] border border-gray-200 text-[#0A0A04]"}`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500 hover:text-[#FFAB00]"
                        >
                            {showPassword ? <FiEyeOff /> : <FiEye />}
                        </button>
                    </div>

                    {/* New Password */}
                    {isOldPasswordCorrect && (
                        <>
                            <div className="relative">
                                <input
                                    type={showNewPassword ? "text" : "password"}
                                    value={newPassword}
                                    onChange={(e) => handleNewPasswordChange(e.target.value)}
                                    placeholder="Enter new password"
                                    className={`w-full rounded-md p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[#FFAB00]
                                        ${darkMode
                                            ? "bg-[#444444] border-[#FFAB00] text-[#FFFFFF]"
                                            : "bg-[#FAFAFA] border border-gray-200 text-[#0A0A04]"}`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500 hover:text-[#FFAB00]"
                                >
                                    {showNewPassword ? <FiEyeOff /> : <FiEye />}
                                </button>
                            </div>

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
                        </>
                    )}

                    <button
                        disabled={!isSaveEnabled}
                        onClick={handleSaveChanges}
                        className={`mt-4 inline-flex items-center gap-2 cursor-pointer font-semibold px-5 py-2 rounded-full transition-colors
                            ${isSaveEnabled
                                ? "bg-[#FFAB00] hover:bg-[#ffbc37] text-white"
                                : "bg-[#CCCCCC] cursor-not-allowed text-white"
                            }`}
                    >
                        <FiSave />
                        {UIText.setting.profile_information.button}
                    </button>
                </div>
            </div>
        </>
    );
};

export default ProfileInformation;