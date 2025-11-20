import React from 'react';
import UIText from '../../utilities/testResource';
import { installSteps } from '../../utilities/data';
import { useData } from '../../utilities/useData';

const InstallationGuide: React.FC = () => {
    const { darkMode } = useData();

    return (
        <>
            <div className={`rounded-2xl p-6 shadow-sm border transition-all hover:shadow-lg
                    ${darkMode
                    ? "bg-[#333333] border-[#94E561]/40"
                    : "bg-white border-gray-100"}`}
            >
                <h2 className={`text-xl font-semibold mb-4 ${darkMode ? "text-white" : "text-[#0A0A04]"}`}>
                    {UIText.download.installation_instructions.title}
                </h2>
                <ol className={`list-decimal list-inside space-y-2 text-sm ${darkMode ? "text-[#CCCCCC]" : "text-[#333333]"}`}>
                    {installSteps.map((step, index) => (
                        <li key={index}>{step}</li>
                    ))}
                </ol>
            </div>
        </>
    );
};

export default InstallationGuide;