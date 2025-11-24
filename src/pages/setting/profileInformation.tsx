import React, { useEffect } from "react";
import UIText from "../../utilities/testResource";
import { FiUser, FiSave } from "react-icons/fi";
import { useData } from "../../utilities/useData";
import { userDetails, userSession } from "../../utilities/getLocalStorageData";
import Loader from "../../loader/loader";
import ForgotPassword from "../auth/forgotPassword";
import { GoEye, GoEyeClosed } from "react-icons/go";
import Input from "../../components/ui/input/InputField";
import Label from "../../components/ui/input/Label";

const ProfileInformation: React.FC = () => {
    const decryptedUserDetails = userDetails();
    const decryptedUserSession = userSession();
    const { darkMode, fname, setFname, email, setEmail, password, setPassword, showPassword,
        setShowPassword, passwordStrength, setPasswordStrength, isLoader, setIsLoader, setToastMessage,
        isModalOpen, setIsModalOpen, openForgotPasswordModel, setOpenForgotPasswordModel } = useData();

    useEffect(() => {
        if (decryptedUserDetails) {
            setFname(decryptedUserDetails.user.name);
            setEmail(decryptedUserDetails.user.email);
        };
    }, [decryptedUserDetails, setFname, setEmail]);

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
                color: "text-[#94E561]",
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
        if (password !== decryptedUserSession.password) {
            setToastMessage({
                type: "error",
                message: "Please enter the correct password.",
                id: Date.now(),
            });
        } else {
            setToastMessage(null);

            setIsLoader(false);
            setIsModalOpen(true);
            setOpenForgotPasswordModel(true);
            setPasswordStrength({ message: "", color: "" });
        }
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
                ${darkMode ? "border-[#94E561] dark:bg-[#333333]" : "bg-white border-gray-100"}`}
            >
                <h2
                    className={`text-lg font-semibold flex items-center gap-2 mb-4 
                    ${darkMode ? "text-[#FFFFFF]" : "text-[#0A0A04]"}`}
                >
                    <FiUser className="text-xl" />
                    {UIText.setting.profile_information.title}
                </h2>

                <div className="space-y-4">
                    <div>
                        <Label>
                            {UIText.setting.profile_information.full_name}
                            <span className="text-error-500">*</span>
                        </Label>
                        <Input
                            placeholder="Full Name"
                            type="text"
                            value={fname}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setEmail(e.target.value)
                            }
                            className={`${darkMode ? "bg-gray-900 text-white border-gray-700" : "bg-white text-gray-900 border-gray-300"}`}
                        />
                    </div>

                    <div>
                        <Label>
                            {UIText.setting.profile_information.email}
                            <span className="text-error-500">*</span>
                        </Label>
                        <Input
                            placeholder="info@gmail.com"
                            type="email"
                            value={email}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setEmail(e.target.value)
                            }
                            className={`${darkMode ? "bg-gray-900 text-white border-gray-700" : "bg-white text-gray-900 border-gray-300"}`}
                        />
                    </div>

                    <div>
                        <Label>
                            {UIText.auth.signIn.password}
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
                                className={`${darkMode ? "bg-gray-900 text-white border-gray-700" : "bg-white text-gray-900 border-gray-300"}`}
                            />
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute z-10 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                            >
                                {showPassword ? (
                                    <GoEye
                                        className={`${darkMode ? "fill-gray-300 hover:fill-[#63cb23]" : "fill-gray-500 hover:fill-[#63cb23]"}`}
                                    />
                                ) : (
                                    <GoEyeClosed
                                        className={`${darkMode ? "fill-gray-300 hover:fill-[#63cb23]" : "fill-gray-500 hover:fill-[#63cb23]"}`}
                                    />
                                )}
                            </span>
                        </div>
                    </div>
                </div>

                <button
                    disabled={!isSaveEnabled}
                    onClick={handleSaveChanges}
                    className={`mt-4 inline-flex items-center gap-2 cursor-pointer font-semibold px-5 py-2 rounded-full transition-colors
                            ${isSaveEnabled
                            ? "bg-[#94E561] hover:bg-[#63cb23] text-white"
                            : "bg-[#CCCCCC] cursor-not-allowed text-white"
                        }`}
                >
                    <FiSave />
                    {UIText.setting.profile_information.button}
                </button>
            </div>

            {/* Forgot Password Modal */}
            {isModalOpen && openForgotPasswordModel !== false && isLoader !== true && (
                <ForgotPassword
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    setOpenForgotPasswordModel={setOpenForgotPasswordModel}
                />
            )}
        </>
    );
};

export default ProfileInformation;