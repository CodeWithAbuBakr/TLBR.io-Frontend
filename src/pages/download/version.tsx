import React from 'react';
import UIText from '../../utilities/testResource';
import { latestVersion } from '../../utilities/data';

const Version: React.FC = () => {
    return (
        <>
            <div className="bg-white dark:bg-[#333333] border border-gray-100 dark:border-[#FFAB00] rounded-2xl shadow-sm p-6 hover:shadow-lg transition-all">
                <h2 className="text-xl font-semibold text-[#0A0A04] dark:text-[#FFFFFF] mb-2">
                    {UIText.download.version.title}
                </h2>
                <p className="text-sm text-[#666666] dark:text-[#CCCCCC] mb-4">
                    {UIText.download.version.description}
                    {latestVersion.version}
                    {UIText.download.version.released}
                    {latestVersion.releaseDate}
                </p>
                <ul className="text-sm text-[#333333] dark:text-[#CCCCCC] space-y-2">
                    {latestVersion.updates.map((update, index) => (
                        <li key={index}>• {update}</li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default Version;