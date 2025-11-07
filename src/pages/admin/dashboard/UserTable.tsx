import React from "react";
import { MdOutlineDelete } from "react-icons/md";
import type { UserTableProps } from "../../../utilities/type";
import UIText from "../../../utilities/testResource";

const UserTable: React.FC<UserTableProps> = ({ users, isLoading, handleDelete }) => {
    return (
        <>
            <div className="bg-white dark:bg-[#333333] border border-[#CCCCCC] dark:border-[#666666] rounded-2xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-[#0A0A04] dark:text-[#CCCCCC] mb-6">
                    {UIText.admin.usersDetails.title}
                </h2>

                <div className="overflow-x-auto">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <div className="w-8 h-8 border-4 border-[#FFAB00] border-t-transparent rounded-full animate-spin mb-4"></div>
                            <p className="text-sm text-[#666666] dark:text-[#CCCCCC]">
                                {UIText.admin.usersDetails.loading}
                            </p>
                        </div>
                    ) : (
                        <table className="min-w-full text-sm text-left">
                            <thead>
                                <tr className="text-gray-500 border-b border-gray-200 dark:border-gray-700">
                                    <th className="py-3 px-4 rounded-tl-xl">{UIText.admin.usersDetails.table.name}</th>
                                    <th className="py-3 px-4">{UIText.admin.usersDetails.table.email}</th>
                                    <th className="py-3 px-4">{UIText.admin.usersDetails.table.role}</th>
                                    <th className="py-3 px-4 text-center rounded-tr-xl">{UIText.admin.usersDetails.table.actions}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.length > 0 ? (
                                    users.map((user) => (
                                        <tr
                                            key={user._id}
                                            className="border-b border-gray-100 dark:border-gray-700 last:border-0 transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-[#444444]"
                                        >
                                            <td className="py-3 px-4 text-[#333333] dark:text-[#CCCCCC]">
                                                {user.name}
                                            </td>
                                            <td className="py-3 px-4 text-[#666666] dark:text-[#999999]">
                                                {user.email}
                                            </td>
                                            <td className="py-3 px-4 text-[#999999] dark:text-[#CCCCCC]">
                                                {user.role}
                                            </td>
                                            <td className="py-3 px-4 text-center">
                                                <button
                                                    onClick={() => handleDelete(user._id)}
                                                    className="inline-flex items-center justify-center px-3 py-2 text-sm text-white bg-[#FFAB00] rounded-lg hover:bg-[#e59b00] transition-colors"
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
                                            className="py-6 text-center text-[#666666] dark:text-[#999999]"
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