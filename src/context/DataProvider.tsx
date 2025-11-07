import React, { useState, useEffect } from "react";
import { DataContext } from "./DataContext";
import type { DataContextTypeProps, StoredUserDetailsProps, StoredAllUserDetailsProps } from "../utilities/type";
import { userDetails } from "../services/userDetails";
import { allUserDetails } from "../services/admin/users/getUsers";
import { useNavigate } from "react-router-dom";

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const navigate = useNavigate();
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
    const [isChecked, setIsChecked] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState<{ message: string; color: string }>({
        message: "",
        color: "",
    });
    const [showSuccessScreen, setShowSuccessScreen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [userData, setUserData] = useState<StoredUserDetailsProps | null>(null);
    const [allUsers, setAllUsers] = useState<StoredAllUserDetailsProps | null>(null);

    useEffect(() => {
        const isAuth = localStorage.getItem("isAuth");

        if (isAuth === "true") {
            setIsLoader(true);
            setIsModalOpen(true);

            userDetails((error, data) => {
                if (error) {
                    console.error("User details error:", error);
                    setIsLoader(false);
                    setIsModalOpen(false);

                    const msg =
                        error.message === "Request failed with status 401" ||
                            error.message === "Session expired. You have been logged in from another device"
                            ? "Session expired. You have been logged in from another device"
                            : error.message || "Error getting user details.";

                    setToastType("error");
                    setToastMessage(msg);

                    localStorage.removeItem("userDetails");
                    localStorage.removeItem("userSession");
                    navigate("/signin");
                } else if (data) {
                    const formattedUser = data as StoredUserDetailsProps;
                    setUserData(formattedUser);
                    setIsLoader(false);
                    setIsModalOpen(false);
                    localStorage.setItem("userDetails", JSON.stringify(formattedUser));

                    if (formattedUser.user.role === "admin") {
                        setIsUsersLoading(true);
                        allUserDetails((error, all) => {
                            setIsUsersLoading(false);
                            if (error) {
                                console.error("All user details error:", error);
                                setToastType("error");
                                setToastMessage(error.message || "Error getting all users details.");
                            } else if (all) {
                                setAllUsers(all as StoredAllUserDetailsProps);
                            }
                        });
                    }
                }
            });
        }
    }, [navigate]);

    const contextValue: DataContextTypeProps = {
        activeForm,
        setActiveForm,
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