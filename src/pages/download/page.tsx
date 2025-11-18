"use client";
import React from "react";
import UIText from "../../utilities/testResource";
import { DashboardLayout } from "../../layout/page";
import { MdOutlineFileDownload } from "react-icons/md";
import Windows from "./windows";
import Version from "./version";
import { useData } from "../../utilities/useData";
import SystemRequirements from "./systemRequirements";
import InstallationGuide from "./installationGuide";

const Download: React.FC = () => {
    const { darkMode } = useData();

    return (
        <>
            <DashboardLayout>
                <div className="space-y-10">
                    {/* Page Header */}
                    <div className={`rounded-2xl shadow-sm p-6 mb-6 transition-colors duration-200 border ${darkMode
                        ? 'bg-[#333333] border-[#94E561]/40'
                        : 'bg-white border-gray-100'}`}
                    >
                        <h1
                            className={`text-2xl md:text-3xl font-bold mb-2 flex items-center gap-3 
                            ${darkMode ? "text-white" : "text-[#0A0A04]"}`
                            }
                        >
                            <MdOutlineFileDownload
                                className={`text-3xl ${darkMode ? "text-[#94E561]" : ""}`}
                            />
                            {UIText.download.title}
                        </h1>
                        <p className={`text-sm font-light ${darkMode ? "text-[#CCCCCC]" : "text-[#333333]"}`}>
                            {UIText.download.description}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                        {/* Windows Download Card */}
                        <Windows />

                        {/* Latest Version Info */}
                        <Version />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                        {/* System Requirements */}
                        <SystemRequirements />

                        {/* Installation Guide */}
                        <InstallationGuide />
                    </div>
                </div>
            </DashboardLayout>
        </>
    );
};

export default Download;