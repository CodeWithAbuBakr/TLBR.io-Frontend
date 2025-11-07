"use client";
import React from "react";
import UIText from "../../utilities/testResource";
import { MdOutlineFileDownload } from "react-icons/md";
import Windows from "./windows";
import Version from "./version";
import SystemRequirements from "./systemRequirements";
import InstallationGuide from "./installationGuide";

const Download: React.FC = () => {
    return (
        <>
            <div className="space-y-10">
                {/* Page Header */}
                <div className="bg-[#FFAB00] dark:bg-[#333333] dark:border-[#FFAB00] border border-transparent rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all">
                    <h1 className="text-2xl md:text-3xl font-bold text-[#0A0A04] dark:text-white mb-2 flex items-center gap-3">
                        <MdOutlineFileDownload className="text-3xl dark:text-[#FFAB00]" />
                        {UIText.download.title}
                    </h1>
                    <p className="text-sm text-[#333333] dark:text-[#CCCCCC] font-light">
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
        </>
    );
};

export default Download;
