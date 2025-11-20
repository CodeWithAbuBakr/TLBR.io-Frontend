import type { JSX } from "react";
import type { ReactNode } from "react";

export interface ToastProps {
    errorMessage: string;
    successMessage: string;
    infoMessage: string;
}

export interface ShowToastProps {
    onShowToast: (type: "error" | "success" | "info", message: string) => void;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setIsLoader: React.Dispatch<React.SetStateAction<boolean>>;
    setOpenOTPModel: React.Dispatch<React.SetStateAction<boolean>>;
}

export type ResponseProps = {
    message: string;
    [key: string]: unknown;
};

export type StoredUserDetailsProps = {
    message: string;
    user: {
        _id: string;
        name: string;
        email: string;
        role: string;
        isSubscribed: boolean;
    };
    sessionInfo: {
        sessionId: string;
        loginTime: string;
    };
};

export type StoredAllUserDetailsProps = {
    message: string;
    success: boolean;
    count: number;
    users: {
        _id: string;
        name: string;
        email: string;
        role: string;
        planType: string;
        createdAt: string;
        updatedAt: string;
    }[];
};

export type ResetPasswordStatus = "pending" | "success" | "error";

export interface LabelProps {
    htmlFor?: string;
    children: ReactNode;
    className?: string;
}

export interface LabelProps {
    htmlFor?: string;
    children: ReactNode;
    className?: string;
}

export interface DropdownProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    className?: string;
}

export interface DropdownItemProps {
    tag?: "a" | "button";
    href?: string;
    onClick?: () => void;
    onItemClick?: () => void;
    baseClassName?: string;
    className?: string;
    children: React.ReactNode;
}

export interface ComponentCardProps {
    title: string;
    children: React.ReactNode;
    className?: string;
}

export interface InputProps {
    type?: "text" | "email" | "password" | string;
    id?: string;
    name?: string;
    placeholder?: string;
    value?: string | number;
    defaultValue?: string | number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    min?: string;
    max?: string;
    step?: number;
    disabled?: boolean;
    success?: boolean;
    error?: boolean;
    hint?: string;
}

export interface CheckboxProps {
    label?: string;
    checked: boolean;
    className?: string;
    id?: string;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
}

export interface NavItem {
    icon: JSX.Element;
    name: string;
    path: string;
    subItems?: { name: string; path: string }[];
}

export interface Payment {
    date: string;
    plan: string;
    amount: string;
    status: "Paid" | "Pending" | "Failed";
    invoice: string;
}

export interface LoaderProps {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    className?: string;
    children: React.ReactNode;
    loader?: boolean;
    showCloseButton?: boolean;
    isFullscreen?: boolean;
}

export type SidebarContextType = {
    isExpanded: boolean;
    isMobileOpen: boolean;
    isHovered: boolean;
    activeItem: string | null;
    openSubmenu: string | null;
    toggleSidebar: () => void;
    toggleMobileSidebar: () => void;
    setIsHovered: (isHovered: boolean) => void;
    setActiveItem: (item: string | null) => void;
    toggleSubmenu: (item: string) => void;
    setIsMobileOpen: (isOpen: boolean) => void;
}

export interface DialogProps {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    toastType?: "error" | "success" | "info" | null;
    setToastType: React.Dispatch<React.SetStateAction<"error" | "success" | "info" | null>>;
    setToastMessage: React.Dispatch<React.SetStateAction<string>>;
    setIsLoader: React.Dispatch<React.SetStateAction<boolean>>;
    setOpenOTPModel: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ForgotPasswordDialogProps {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setOpenForgotPasswordModel: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ConfirmDeleteUserDialogProps {
    userId: string;
    isLoader: boolean;
    setIsLoader: React.Dispatch<React.SetStateAction<boolean>>;
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setToastType: React.Dispatch<React.SetStateAction<"error" | "success" | "info" | null>>;
    setToastMessage: React.Dispatch<React.SetStateAction<string>>;
}

export interface DataContextTypeProps {
    activeForm: "signin" | "signup";
    setActiveForm: React.Dispatch<React.SetStateAction<"signin" | "signup">>;
    hasFetchedUser: React.MutableRefObject<boolean>;
    toastType: "error" | "success" | "info" | null;
    setToastType: React.Dispatch<React.SetStateAction<"error" | "success" | "info" | null>>;
    toastMessage: string;
    setToastMessage: React.Dispatch<React.SetStateAction<string>>;
    isLoader: boolean;
    setIsLoader: React.Dispatch<React.SetStateAction<boolean>>;
    darkMode: boolean;
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
    isUsersLoading: boolean;
    setIsUsersLoading: React.Dispatch<React.SetStateAction<boolean>>;
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    openOTPModel: boolean;
    setOpenOTPModel: React.Dispatch<React.SetStateAction<boolean>>;
    openForgotPasswordModel: boolean;
    setOpenForgotPasswordModel: React.Dispatch<React.SetStateAction<boolean>>;
    fname: string;
    setFname: React.Dispatch<React.SetStateAction<string>>;
    lname: string;
    setLname: React.Dispatch<React.SetStateAction<string>>;
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    confirmPassword: string;
    setConfrimPassword: React.Dispatch<React.SetStateAction<string>>;
    showPassword: boolean;
    setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
    showConfirmPassword: boolean;
    setConfirmShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
    passwordStrength: { message: string; color: string };
    setPasswordStrength: React.Dispatch<
        React.SetStateAction<{ message: string; color: string }>
    >;
    isChecked: boolean;
    setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
    showSuccessScreen: boolean;
    setShowSuccessScreen: React.Dispatch<React.SetStateAction<boolean>>;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    userData: StoredUserDetailsProps | null;
    setUserData: React.Dispatch<
        React.SetStateAction<StoredUserDetailsProps | null>
    >;
    allUsers: StoredAllUserDetailsProps | null;
    setAllUsers: React.Dispatch<
        React.SetStateAction<StoredAllUserDetailsProps | null>
    >;
}

export interface UserProps {
    _id: string;
    name: string;
    email: string;
    role: string;
    planType: string;
}

export interface UserTableProps {
    users: UserProps[];
    isLoading: boolean;
    handleDelete: (id: string) => void;
}