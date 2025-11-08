"use client";
import React, { useState } from 'react';
import UIText from '../../utilities/testResource';
import { FiUser, FiSave } from 'react-icons/fi';
import { useData } from '../../utilities/useData';

const ProfileInformation: React.FC = () => {
    const { darkMode } = useData();
    const [username, setUsername] = useState("Jayvin");
    const [email, setEmail] = useState("Jayvin@gmail.com");

    return (
        <>
            <div
                className={`border rounded-2xl shadow-sm p-6
                ${darkMode ? 'border-[#FFAB00] dark:bg-[#333333]' : 'bg-white border-gray-100'}`}
            >
                <h2 className={`text-lg font-semibold flex items-center gap-2 mb-4 
                    ${darkMode ? 'text-[#FFFFFF]' : 'text-[#0A0A04]'}`}
                >
                    <FiUser className="text-xl" />
                    {UIText.setting.profile_information.title}
                </h2>

                <div className="space-y-4">
                    <div>
                        <label className={`block text-sm mb-1 ${darkMode ? 'text-[#CCCCCC]' : 'text-[#666666]'}`}>
                            {UIText.setting.profile_information.full_name}
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className={`w-full rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#FFAB00]
                                ${darkMode
                                    ? 'bg-[#444444] border-[#FFAB00] text-[#FFFFFF]'
                                    : 'bg-[#FAFAFA] border border-gray-200 text-[#0A0A04]'}`
                            }
                        />
                    </div>

                    <div>
                        <label className={`block text-sm mb-1 ${darkMode ? 'text-[#CCCCCC]' : 'text-[#666666]'}`}>
                            {UIText.setting.profile_information.email}
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#FFAB00]
                                ${darkMode
                                    ? 'bg-[#444444] border-[#FFAB00] text-[#FFFFFF]'
                                    : 'bg-[#FAFAFA] border border-gray-200 text-[#0A0A04]'}`
                            }
                        />
                    </div>

                    <button className="mt-4 inline-flex items-center gap-2 cursor-pointer bg-[#FFAB00] hover:bg-[#ffbc37] text-white font-semibold px-5 py-2 rounded-full transition-colors">
                        <FiSave />
                        {UIText.setting.profile_information.button}
                    </button>
                </div>
            </div>
        </>
    );
};

export default ProfileInformation;