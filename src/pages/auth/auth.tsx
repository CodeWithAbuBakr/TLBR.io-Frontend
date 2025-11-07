"use client";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../../utilities/useData";
import tlbr_white from "../../assets/tlbr.io-white.png";
import tlbr_dark from "../../assets/tlbr.io-dark.png";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import Toast from "../../hooks/useToast";
import Loader from "../../loader/loader";
import UIText from "../../utilities/testResource";
import OTPDialog from "./otpDialog";

const Auth: React.FC = () => {
    const navigate = useNavigate();
    const { darkMode, activeForm, setActiveForm, toastType, setToastType, toastMessage, setToastMessage,
        isLoader, setIsLoader, isModalOpen, setIsModalOpen, openOTPModel, setOpenOTPModel } = useData();

    const handleShowToast = (type: "error" | "success" | "info", message: string) => {
        setToastType(type);
        setToastMessage(message);

        if (type === "info") {
            setIsLoader(false);
            setIsModalOpen(true);
            setOpenOTPModel(true);
        }
    };

    // Check login persistence on page load
    useEffect(() => {
        const savedUser = localStorage.getItem("userSession");
        if (savedUser) {
            const parsedUser = JSON.parse(savedUser);
            if (parsedUser.keepMeLoggedIn === true) {
                navigate("/dashboard");
            } else {
                localStorage.removeItem("userSession");
                navigate("/");
            }
        }
    }, [navigate]);

    return (
        <>
            {isModalOpen && openOTPModel !== true && isLoader !== false && (
                <Loader
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                />
            )}

            <div
                className={`flex items-center justify-center min-h-screen ${darkMode ? "bg-gray-900" : "bg-white"
                    }`}
            >
                <div className="flex flex-col justify-center w-full max-w-md px-6 pt-8">
                    {/* Logo */}
                    <div className="flex justify-center items-center mb-6">
                        <img
                            src={darkMode ? tlbr_white : tlbr_dark}
                            alt="Logo"
                            width={130}
                            height={30}
                        />
                    </div>

                    {/* Title */}
                    <div
                        className={`mb-6 text-center ${darkMode ? "text-white/90" : "text-[#0A0A04]"
                            }`}
                    >
                        <h1
                            className={`mb-2 font-semibold text-2xl ${darkMode ? "text-white/90" : "text-gray-800"
                                }`}
                        >
                            {activeForm === "signin" ? "Welcome to tlbr.io" : "Create tlbr.io account"}
                        </h1>
                        <p
                            className={`text-sm ${darkMode ? "text-[#CCCCCC]" : "text-[#333333]"
                                }`}
                        >
                            {activeForm === "signin"
                                ? "Sign in or get started – your slides are waiting!"
                                : "Create your account – your slides are awaiting!"}
                        </p>
                    </div>

                    {/* Toggle Buttons */}
                    <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5 w-full">
                        <button
                            onClick={() => setActiveForm("signin")}
                            className={`inline-flex items-center justify-center cursor-pointer gap-3 py-3 text-sm font-normal rounded-full px-7 transition-colors w-full
                            ${activeForm === "signin"
                                    ? "bg-[#333333] text-white hover:bg-[#666666]"
                                    : `${darkMode
                                        ? "border border-[#666666] text-[#CCCCCC] hover:text-[#CCCCCC]"
                                        : "border border-[#666666] text-[#333333] hover:bg-[#f5f5f5]"
                                    }`
                                }`}
                        >
                            {UIText.auth.signIn.title}
                        </button>
                        <button
                            onClick={() => setActiveForm("signup")}
                            className={`inline-flex items-center justify-center cursor-pointer gap-3 py-3 text-sm font-normal rounded-full px-7 transition-colors w-full
                            ${activeForm === "signup"
                                    ? "bg-[#333333] text-white hover:bg-[#666666]"
                                    : `${darkMode
                                        ? "border border-[#666666] text-[#CCCCCC] hover:text-[#CCCCCC]"
                                        : "border border-[#666666] text-[#333333] hover:bg-[#f5f5f5]"
                                    }`
                                }`}
                        >
                            {UIText.auth.signUp.title}
                        </button>
                    </div>

                    {/* Sliding Container */}
                    <div className="relative w-full overflow-hidden">
                        <div
                            className={`flex transition-transform duration-600 ease-in-out`}
                            style={{
                                transform:
                                    activeForm === "signin"
                                        ? "translateX(0%)"
                                        : "translateX(-100%)",
                            }}
                        >
                            <div className="shrink-0 w-full">
                                <SignInForm
                                    onShowToast={handleShowToast}
                                    setIsModalOpen={setIsModalOpen}
                                    setIsLoader={setIsLoader}
                                    setOpenOTPModel={setOpenOTPModel}
                                />
                            </div>
                            <div className="shrink-0 w-full">
                                <SignUpForm
                                    onShowToast={handleShowToast}
                                    setIsModalOpen={setIsModalOpen}
                                    setIsLoader={setIsLoader}
                                    setOpenOTPModel={setOpenOTPModel}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* OTP Modal */}
            {isModalOpen && openOTPModel !== false && isLoader !== true && (
                <OTPDialog
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    setToastType={setToastType}
                    setToastMessage={setToastMessage}
                    setIsLoader={setIsLoader}
                    setOpenOTPModel={setOpenOTPModel}
                />
            )}

            {/* Global Toast */}
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

export default Auth;