import React from 'react';
import UIText from '../../utilities/testResource';
import { installSteps } from '../../utilities/data';

const InstallationGuide: React.FC = () => {
    return (
        <>
            <div className="bg-white dark:bg-[#333333] dark:border-[#FFAB00] border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all">
                <h2 className="text-xl font-semibold text-[#0A0A04] dark:text-white mb-4">
                    {UIText.download.installation_instructions.title}
                </h2>
                <ol className="list-decimal list-inside space-y-2 text-sm text-[#333333] dark:text-[#CCCCCC]">
                    {installSteps.map((step, index) => (
                        <li key={index}>{step}</li>
                    ))}
                </ol>
            </div>
        </>
    );
};

export default InstallationGuide;