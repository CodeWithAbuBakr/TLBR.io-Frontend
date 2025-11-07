import type { ComponentCardProps } from "../../utilities/type";

export default function ComponentCard({
    title,
    children,
    className = "",
}: ComponentCardProps) {
    return (
        <div
            className={`rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm p-5 sm:p-6 ${className}`}
        >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                {title}
            </h3>
            <div className="rounded-lg overflow-hidden">{children}</div>
        </div>
    );
}
