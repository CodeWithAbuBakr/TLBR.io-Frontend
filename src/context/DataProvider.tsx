import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import { DataContext } from "./DataContext";
import { isAuth } from "../utilities/getLocalStorageData";
import { getAllUserDetails, getUserDetails } from "../services/apiWrapper";
import type { DataContextTypeProps, StoredUserDetailsProps, StoredAllUserDetailsProps, ToastMessage } from "../utilities/type";

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const navigate = useNavigate();
    const hasFetchedUser = useRef(false);
    const [activeForm, setActiveForm] = useState<"signin" | "signup">("signin");
    const [toastMessage, setToastMessage] = useState<ToastMessage | null>(null);
    const [isLoader, setIsLoader] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [isUsersLoading, setIsUsersLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [openOTPModel, setOpenOTPModel] = useState(false);
    const [openForgotPasswordModel, setOpenForgotPasswordModel] = useState(false);
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfrimPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setConfirmShowPassword] = useState(false);
    const [isChecked, setIsChecked] = useState(true);
    const [passwordStrength, setPasswordStrength] = useState<{ message: string; color: string }>({
        message: "",
        color: "",
    });
    const [isOpen, setIsOpen] = useState(false);
    const [showSuccessScreen, setShowSuccessScreen] = useState(false);
    const [userData, setUserData] = useState<StoredUserDetailsProps | null>(null);
    const [allUsers, setAllUsers] = useState<StoredAllUserDetailsProps | null>(null);

    useEffect(() => {
        const decryptedIsAuth = isAuth();
        const theme = localStorage.getItem("theme");

        if (theme === "dark") {
            setDarkMode(true);
        } else {
            setDarkMode(false);
        }

        if (decryptedIsAuth === "true" && !hasFetchedUser.current) {
            setIsLoader(true);
            setIsModalOpen(true);
            hasFetchedUser.current = true;

            getUserDetails(navigate)
                .then((user) => {
                    setUserData(user);
                    setIsLoader(false);
                    setIsModalOpen(false);

                    if (user.user.role === "admin") {
                        setIsUsersLoading(true);
                        getAllUserDetails(navigate)
                            .then((all) => {
                                setAllUsers(all);
                                setIsUsersLoading(false);
                            })
                            .catch((err) => {
                                console.error(err);

                                setToastMessage({
                                    type: "error",
                                    message: err.message || "Error getting all users details.",
                                    id: Date.now(),
                                });
                                setIsUsersLoading(false);
                            });
                    }
                })
                .catch((err) => {
                    console.error(err);
                    setIsLoader(false);
                    setIsModalOpen(false);
                    hasFetchedUser.current = false;

                    setToastMessage({
                        type: "error",
                        message: err.message === "Session expired. You may have logged in from another device."
                            ? "Session expired. You may have logged in from another device."
                            : err.message || "Error getting user details.",
                        id: Date.now(),
                    });

                    if (err.message === "Session expired. You may have logged in from another device.") {
                        setTimeout(() => {
                            localStorage.removeItem("tokens");
                            localStorage.removeItem("userDetails");
                            localStorage.removeItem("userSession");
                            const encryptedIsAuth = CryptoJS.AES.encrypt("false", import.meta.env.VITE_SECRET_KEY).toString();
                            localStorage.setItem("isAuth", encryptedIsAuth);

                            navigate("/");
                            setToastMessage(null);
                        }, 2000);
                    };
                });
        };
    }, [navigate]);

    const contextValue: DataContextTypeProps = {
        activeForm,
        setActiveForm,
        hasFetchedUser,
        toastMessage,
        setToastMessage,
        isLoader,
        setIsLoader,
        darkMode,
        setDarkMode,
        isUsersLoading,
        setIsUsersLoading,
        isModalOpen,
        setIsModalOpen,
        openOTPModel,
        setOpenOTPModel,
        openForgotPasswordModel,
        setOpenForgotPasswordModel,
        fname,
        setFname,
        lname,
        setLname,
        email,
        setEmail,
        password,
        setPassword,
        confirmPassword,
        setConfrimPassword,
        showPassword,
        setShowPassword,
        showConfirmPassword,
        setConfirmShowPassword,
        isChecked,
        setIsChecked,
        passwordStrength,
        setPasswordStrength,
        showSuccessScreen,
        setShowSuccessScreen,
        isOpen,
        setIsOpen,
        userData,
        setUserData,
        allUsers,
        setAllUsers,
    };

    return <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>;
};
