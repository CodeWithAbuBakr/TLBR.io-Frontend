"use client";
import React, { useState, useEffect } from "react";
import { useData } from "../../utilities/useData";
import UIText from "../../utilities/testResource";
import { GoVerified } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";

type Status = "success" | "failed" | "pending";

interface Props {
    status: Status;
}

const VerificationResult: React.FC<Props> = ({ status }) => {
    const { darkMode } = useData();
    const [currentStatus, setCurrentStatus] = useState<Status>(status);

    // Example: you can update `currentStatus` dynamically based on API response
    useEffect(() => {
        setCurrentStatus(status);
    }, [status]);

    if (currentStatus === "pending") {
        return null; // or show loader
    }

    return (
        <>
            <div className={`flex flex-col items-center justify-center min-h-screen px-4 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
                <div className={`shadow-lg rounded-2xl p-10 max-w-md text-center ${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"}`}>
                    {currentStatus === "success" ? (
                        <>
                            <div className="flex justify-center mb-6">
                                <GoVerified className="text-5xl mb-8 text-[#FFAB00] animate-popIn animate-glow" />
                            </div>
                            <h3 className={`text-lg font-semibold ${darkMode ? "text-gray-100" : "text-[#0A0A04]"}`}>
                                {UIText.billing.success.title}
                            </h3>
                            <p className={`text-sm mt-2 ${darkMode ? "text-gray-400" : "text-[#666666]"}`}>
                                {UIText.billing.success.description}
                            </p>
                        </>
                    ) : (
                        <>
                            <div className="flex justify-center mb-6">
                                <AiFillCloseCircle className="w-20 h-20 text-red-500" />
                            </div>
                            <h3 className={`text-lg font-semibold mb-3 ${darkMode ? "text-gray-100" : "text-red-500"}`}>
                                {UIText.billing.failed.title}
                            </h3>
                            <p className={`text-sm mt-2 ${darkMode ? "text-gray-400" : "text-[#666666]"}`}>
                                {UIText.billing.failed.description}
                            </p>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default VerificationResult;
