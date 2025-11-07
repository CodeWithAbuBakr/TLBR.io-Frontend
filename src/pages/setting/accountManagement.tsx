"use client";
import React, { useState } from 'react';
import UIText from '../../utilities/testResource';
import { FiLock } from 'react-icons/fi';
import Toast from '../../hooks/useToast';
import ConfirmDeteleDialog from './confirmDeteleDialog';

const AccountManagement: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [toastType, setToastType] = useState<"error" | "success" | "info" | null>(null);
    const [toastMessage, setToastMessage] = useState("");

    const handleChangePassword = () => {
        setToastType(null);
        setToastMessage("");

        // Trigger toast after a short delay
        setTimeout(() => {
            setToastType("info");
            setToastMessage("This feature is currently in development. Stay tuned!");
        }, 10);

        setIsModalOpen(false);
    };

    const handleConfirmDelete = () => {
        setIsModalOpen(true);
    };

    return (
        <>
            <div className="bg-white dark:bg-[#333333] mt-4 border border-gray-100 dark:border-[#FFAB00] rounded-2xl shadow-sm p-6 lg:col-span-2">
                <h2 className="text-lg font-semibold text-[#0A0A04] dark:text-[#FFFFFF] flex items-center gap-2 mb-4">
                    <FiLock className="text-xl" />
                    {UIText.setting.account_management.title}
                </h2>
                <p className="text-sm text-[#666666] dark:text-[#CCCCCC] mb-4">
                    {UIText.setting.account_management.description}
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                    <button
                        className="inline-flex items-center justify-center gap-2 py-2.5 px-5 font-semibold bg-[#FFAB00] text-white hover:bg-[#ffbc37] rounded-full transition-colors"
                        onClick={handleChangePassword}
                    >
                        {UIText.setting.account_management.change_password}
                    </button>

                    {/* Delete Account Button */}
                    <button
                        onClick={handleConfirmDelete}
                        className="px-4 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white font-semibold transition-colors"
                    >
                        {UIText.setting.account_management.delete}
                    </button>
                </div>
            </div>

            {/* Confirmation Modal */}
            {isModalOpen && (
                <ConfirmDeteleDialog
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    setToastType={setToastType}
                    setToastMessage={setToastMessage}
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

export default AccountManagement;