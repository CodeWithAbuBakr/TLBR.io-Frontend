import React from 'react';
import UIText from '../../utilities/testResource';
import { latestVersion } from '../../utilities/data';
import { useData } from '../../utilities/useData';

const Version: React.FC = () => {
    const { darkMode } = useData();

    return (
        <>
            <div className={`rounded-2xl p-6 border shadow-sm hover:shadow-lg transition-all
                ${darkMode
                    ? "bg-[#333333] border-[#94E561]/40"
                    : "bg-white border-gray-100"}`}
            >
                <h2 className={`text-md md:text-md lg:text-lg xl:lg-lg font-semibold mb-2 ${darkMode ? "text-white" : "text-[#0A0A04]"}`}>
                    {UIText.download.version.title}
                </h2>
                <p className={`text-sm mb-4 ${darkMode ? "text-[#CCCCCC]" : "text-[#666666]"}`}>
                    {UIText.download.version.description}
                    {latestVersion.version}
                    {UIText.download.version.released}
                    {latestVersion.releaseDate}
                </p>
                <ul className={`text-sm space-y-2 ${darkMode ? "text-[#CCCCCC]" : "text-[#333333]"}`}>
                    {latestVersion.updates.map((update, index) => (
                        <li key={index}>• {update}</li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default Version;