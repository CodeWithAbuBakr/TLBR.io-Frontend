"use client";
import React from "react";
import UIText from "../../utilities/testResource";
import { DashboardLayout } from "../../layout/page";
import { useData } from "../../utilities/useData";
import ProfileInformation from "./profileInformation";

const Setting: React.FC = () => {
    const { darkMode } = useData();

    return (
        <>
            <DashboardLayout>
                <h1 className={`text-md md:text-lg lg:text-xl xl:text-2xl font-semibold mb-1 ${darkMode ? "text-[#CCCCCC]" : "text-[#0A0A04]"}`}>
                    {UIText.setting.title}
                </h1>
                <p className={`text-sm mb-8 ${darkMode ? "text-[#CCCCCC]" : "text-[#666666]"}`}>
                    {UIText.setting.description}
                </p>

                <div className="w-full gap-6 mt-8">
                    {/* Profile Settings */}
                    <ProfileInformation />
                </div>
            </DashboardLayout>
        </>
    );
};

export default Setting;