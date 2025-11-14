import React from "react";
import { MdOutlineDelete } from "react-icons/md";
import UIText from "../../../utilities/testResource";
import type { UserTableProps } from "../../../utilities/type";
import { useData } from "../../../utilities/useData";

const UserTable: React.FC<UserTableProps> = ({ users, isLoading, handleDelete }) => {
    const { darkMode } = useData();

    return (
        <>
            <div className={`rounded-2xl shadow-sm p-6 transition-colors duration-300 ${darkMode ? "bg-[#1E1E1E] border border-[#666666]" : "bg-white border border-[#CCCCCC]"}`}>
                <h2 className={`text-xl font-semibold mb-6 ${darkMode ? "text-white" : "text-[#0A0A04]"}`}>
                    {UIText.admin.usersDetails.title}
                </h2>

                <div className="overflow-x-auto">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <div className="w-8 h-8 border-4 border-[#FFAB00] border-t-transparent rounded-full animate-spin mb-4"></div>
                            <p className={`${darkMode ? "text-[#CCCCCC]" : "text-[#666666]"} text-sm`}>
                                {UIText.admin.usersDetails.loading}
                            </p>
                        </div>
                    ) : (
                        <table className="min-w-full text-sm text-left">
                            <thead>
                                <tr className={`${darkMode ? "text-gray-300 border-b border-gray-700" : "text-gray-500 border-b border-gray-200"}`}>
                                    <th className="py-3 px-4 rounded-tl-xl">{UIText.admin.usersDetails.table.name}</th>
                                    <th className="py-3 px-4">{UIText.admin.usersDetails.table.email}</th>
                                    <th className="py-3 px-4">{UIText.admin.usersDetails.table.role}</th>
                                    <th className="py-3 px-4">{UIText.admin.usersDetails.table.plan_type}</th>
                                    <th className="py-3 px-4 text-center rounded-tr-xl">{UIText.admin.usersDetails.table.actions}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.length > 0 ? (
                                    users.map((user) => (
                                        <tr
                                            key={user._id}
                                            className={`border-b last:border-0 transition-colors duration-200 ${darkMode
                                                ? "border-gray-700 hover:bg-[#333333]"
                                                : "border-gray-100 hover:bg-gray-50"
                                                }`}
                                        >
                                            <td className={`${darkMode ? "text-[#CCCCCC]" : "text-[#333333]"} py-3 px-4`}>
                                                {user.name}
                                            </td>
                                            <td className={`${darkMode ? "text-[#999999]" : "text-[#666666]"} py-3 px-4`}>
                                                {user.email}
                                            </td>
                                            <td className={`${darkMode ? "text-[#CCCCCC]" : "text-[#999999]"} py-3 px-4`}>
                                                {user.role}
                                            </td>
                                            <td className={`${darkMode ? "text-[#CCCCCC]" : "text-[#999999]"} py-3 px-4`}>
                                                {user.planType ?? "No Active Plan"}
                                            </td>
                                            <td className="py-3 px-4 text-center">
                                                <button
                                                    onClick={() => handleDelete(user._id)}
                                                    className="inline-flex items-center justify-center cursor-pointer px-3 py-2 text-sm text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                                                    title={`Delete ${user.name}`}
                                                >
                                                    <MdOutlineDelete size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={4}
                                            className={`${darkMode ? "text-[#999999]" : "text-[#666666]"} py-6 text-center`}
                                        >
                                            {UIText.admin.usersDetails.table.not_found}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </>
    );
};

export default UserTable;