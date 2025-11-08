import { useData } from "../../utilities/useData";
import type { ComponentCardProps } from "../../utilities/type";

export default function ComponentCard({
    title,
    children,
    className = "",
}: ComponentCardProps) {
    const { darkMode } = useData();

    return (
        <div
            className={`rounded-2xl shadow-sm p-5 sm:p-6 transition-colors duration-300 border ${className} ${darkMode
                ? "bg-[#1E1E1E] text-gray-100 border-gray-700"
                : "bg-white text-gray-900 border-gray-200"
                }`}
        >
            <h3
                className={`text-lg font-semibold mb-4 transition-colors duration-300 ${darkMode ? "text-gray-100" : "text-gray-900"
                    }`}
            >
                {title}
            </h3>
            <div
                className={`rounded-lg overflow-hidden transition-colors duration-300 ${darkMode ? "bg-gray-900/30" : "bg-gray-50/30"
                    }`}
            >
                {children}
            </div>
        </div>
    );
}
