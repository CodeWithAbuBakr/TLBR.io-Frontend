"use client";
import React from "react";
import UIText from "../../utilities/testResource";
import ProfileInformation from "./profileInformation";
import AccountManagement from "./accountManagement";

const Setting: React.FC = () => {
    return (
        <>
            <h1 className="text-md md:text-lg lg:text-xl xl:text-2xl font-semibold text-[#0A0A04] dark:text-[#CCCCCC] mb-1">
                {UIText.setting.title}
            </h1>
            <p className="text-[#666666] dark:text-[#CCCCCC] mb-8">
                {UIText.setting.description}
            </p>

            <div className="w-full gap-6 mt-8">
                {/* Profile Settings */}
                <ProfileInformation />

                {/* Account Management */}
                <AccountManagement />
            </div>
        </>
    );
};

export default Setting;
