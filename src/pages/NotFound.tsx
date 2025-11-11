"use client";
import React from "react";
import { useNavigate } from "react-router-dom";
import tlbr_404 from "../assets/tlbr-404.gif"
import { userSession } from "../utilities/getLocalStorageData";

const NotFound: React.FC = () => {
    const navigate = useNavigate();

    const handleGoBackToMainPage = () => {
        const decryptedUserSession = userSession();
        if (decryptedUserSession) {
            if (decryptedUserSession.keepMeLoggedIn === true) {
                navigate("/dashboard");
            }
        } else {
            navigate("/");
        }
    };

    return (
        <>
            <div className="relative flex flex-col items-center justify-center min-h-screen p-6 overflow-hidden z-1">
                <div className="mx-auto w-full max-w-[242px] text-center sm:max-w-[472px]">
                    <img
                        src={tlbr_404}
                        alt="404"
                        width={472}
                        height={152}
                    />

                    <p className="mt-10 mb-6 text-base text-gray-700 sm:text-lg">
                        We can’t seem to find the page you are looking for!
                    </p>

                    <button
                        onClick={handleGoBackToMainPage}
                        className="inline-flex items-center justify-center rounded-lg cursor-pointer bg-[#333333] px-5 py-3.5 text-sm font-medium text-white shadow-theme-xs hover:bg-[#0A0A04] hover:text-white"
                    >
                        Go to Dashboard
                    </button>
                </div>
            </div>
        </>
    );
}

export default NotFound;