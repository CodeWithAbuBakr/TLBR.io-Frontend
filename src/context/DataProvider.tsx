import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "./DataContext";
import { getAllUserDetails, getUserDetails } from "../services/apiWrapper";
import type { DataContextTypeProps, StoredUserDetailsProps, StoredAllUserDetailsProps } from "../utilities/type";
import { refreshCSRFToken } from "../services/auth/refreshCSRFToken";

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const navigate = useNavigate();
    const hasFetchedUser = useRef(false);
    const [activeForm, setActiveForm] = useState<"signin" | "signup">("signin");
    const [toastType, setToastType] = useState<"error" | "success" | "info" | null>(null);
    const [toastMessage, setToastMessage] = useState("");
    const [isLoader, setIsLoader] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [isUsersLoading, setIsUsersLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [openOTPModel, setOpenOTPModel] = useState(false);
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
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
        const isAuth = localStorage.getItem("isAuth");
        const theme = localStorage.getItem("theme");

        if (theme === "dark") {
            setDarkMode(true);
        } else {
            setDarkMode(false);
        }

        if (isAuth === "true" && !hasFetchedUser.current) {
            setIsLoader(true);
            setIsModalOpen(true);
            hasFetchedUser.current = true;

            refreshCSRFToken((refreshCSRFError, data) => {
                if (refreshCSRFError) {
                    console.log(refreshCSRFError);
                } else {
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
                                err.message === "Request failed with status 401"
                                    ? "Session expired. You have been logged in from another device"
                                    : err.message || "Error getting user details."
                            );

                            if (err.message === "Session expired. You have been logged in from another device") {
                                setTimeout(() => {
                                    localStorage.removeItem("userDetails");
                                    localStorage.removeItem("userSession");
                                    localStorage.setItem("isAuth", "false");

                                    navigate("/");
                                    setToastType(null);
                                    setToastMessage("");
                                }, 2000);
                            }
                        });
                }
            });
        }
    }, [navigate]);

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
        fname,
        setFname,
        lname,
        setLname,
        email,
        setEmail,
        password,
        setPassword,
        showPassword,
        setShowPassword,
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