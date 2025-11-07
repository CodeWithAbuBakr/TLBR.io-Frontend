import React from 'react';
import UIText from '../../utilities/testResource';
import { systemRequirements } from '../../utilities/data';

const SystemRequirements: React.FC = () => {
    return (
        <>
            <div className="bg-white dark:bg-[#333333] dark:border-[#FFAB00] border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all">
                <h2 className="text-xl font-semibold text-[#0A0A04] dark:text-white mb-4">
                    {UIText.download.system_requirements.title}
                </h2>
                <ul className="space-y-2 text-sm text-[#333333] dark:text-[#CCCCCC]">
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