"use client";
import React, { useState } from 'react';
import UIText from '../../utilities/testResource';
import { FiUser, FiSave } from 'react-icons/fi';

const ProfileInformation: React.FC = () => {
    const [username, setUsername] = useState("Jayvin");
    const [email, setEmail] = useState("Jayvin@gmail.com");

    return (
        <>
            <div className="bg-white dark:bg-[#333333] border border-gray-100 dark:border-[#FFAB00] rounded-2xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-[#0A0A04] dark:text-[#FFFFFF] flex items-center gap-2 mb-4">
                    <FiUser className="text-xl" />
                    {UIText.setting.profile_information.title}
                </h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm text-[#666666] dark:text-[#CCCCCC] mb-1">
                            {UIText.setting.profile_information.full_name}
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full rounded-md border border-gray-300 dark:border-[#FFAB00] bg-[#FAFAFA] dark:bg-[#444444] text-[#0A0A04] dark:text-[#FFFFFF] p-2 focus:outline-none focus:ring-2 focus:ring-[#FFAB00]"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-[#666666] dark:text-[#CCCCCC] mb-1">
                            {UIText.setting.profile_information.email}
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-md border border-gray-300 dark:border-[#FFAB00] bg-[#FAFAFA] dark:bg-[#444444] text-[#0A0A04] dark:text-[#FFFFFF] p-2 focus:outline-none focus:ring-2 focus:ring-[#FFAB00]"
                        />
                    </div>

                    <button className="mt-4 inline-flex items-center gap-2 bg-[#FFAB00] hover:bg-[#ffbc37] text-white font-semibold px-5 py-2 rounded-full transition-colors">
                        <FiSave />
                        {UIText.setting.profile_information.button}
                    </button>
                </div>
            </div>
        </>
    );
};

export default ProfileInformation;