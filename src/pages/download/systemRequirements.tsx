import React from 'react';
import UIText from '../../utilities/testResource';
import { systemRequirements } from '../../utilities/data';
import { useData } from '../../utilities/useData';

const SystemRequirements: React.FC = () => {
    const { darkMode } = useData();

    return (
        <>
            <div
                className={`rounded-2xl p-6 shadow-sm border transition-all hover:shadow-lg
                    ${darkMode
                        ? "bg-[#333333] border-[#FFAB00]"
                        : "bg-white border-gray-100"}`}
            >
                <h2 className={`text-xl font-semibold mb-4 ${darkMode ? "text-white" : "text-[#0A0A04]"}`}>
                    {UIText.download.system_requirements.title}
                </h2>
                <ul className={`space-y-2 text-sm ${darkMode ? "text-[#CCCCCC]" : "text-[#333333]"}`}>
                    {systemRequirements.map((req, index) => (
                        <li key={index} className="flex items-start">
                            <span className="text-[#FFAB00] mr-2">•</span> {req}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default SystemRequirements;