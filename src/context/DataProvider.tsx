import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import { DataContext } from "./DataContext";
import { isAuth, userDetails } from "../utilities/getLocalStorageData";
import { getAllUserDetails, getRefreshedCSRFToken, getUserDetails } from "../services/apiWrapper";
import type { DataContextTypeProps, StoredUserDetailsProps, StoredAllUserDetailsProps } from "../utilities/type";

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const navigate = useNavigate();
    const hasFetchedUser = useRef(false);
    const decryptedUserDetails = userDetails();
    const [activeForm, setActiveForm] = useState<"signin" | "signup">("signin");
    const [toastType, setToastType] = useState<"error" | "success" | "info" | null>(null);
    const [toastMessage, setToastMessage] = useState("");
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

            getRefreshedCSRFToken()
                .then((data) => {
                    console.log(data);

                    getUserDetails()
                        .then((user) => {
                            setUserData(user);
                            setIsLoader(false);
                            setIsModalOpen(false);

                            if (user.user.role === "admin") {
                                setIsUsersLoading(true);
                                getAllUserDetails()
                                    .then((all) => {
                                        setAllUsers(all);
                                        setIsUsersLoading(false);
                                    })
                                    .catch((err) => {
                                        console.error(err);
                                        setToastType("error");
                                        setToastMessage(err.message || "Error getting all users details.");
                                        setIsUsersLoading(false);
                                    });
                            }
                        })
                        .catch((err) => {
                            console.error(err);
                            setIsLoader(false);
                            setIsModalOpen(false);
                            hasFetchedUser.current = false;

                            setToastType("error");
                            setToastMessage(
                                err.message === "Session expired.You have been logged in from another device"
                                    ? "Session expired. You have been logged in from another device"
                                    : err.message || "Error getting user details."
                            );

                            if (err.message === "Session expired. You have been logged in from another device") {
                                setTimeout(() => {
                                    localStorage.removeItem("userDetails");
                                    localStorage.removeItem("userSession");
                                    const encryptedIsAuth = CryptoJS.AES.encrypt("false", import.meta.env.VITE_SECRET_KEY).toString();
                                    localStorage.setItem("isAuth", encryptedIsAuth);

                                    navigate("/");
                                    setToastType(null);
                                    setToastMessage("");
                                }, 2000);
                            }
                        });
                })
                .catch((refreshCSRFError) => {
                    console.error("Error refreshing CSRF token:", refreshCSRFError);
                });
        }
    }, [decryptedUserDetails, navigate]);

    const contextValue: DataContextTypeProps = {
        activeForm,
        setActiveForm,
        hasFetchedUser,
        toastType,
        setToastType,
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