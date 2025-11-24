'use client';
import React, { useState, useEffect } from "react";
import { useData } from "../../../utilities/useData";
import type { UserProps } from "../../../utilities/type";
import UserTable from "./UserTable";
import ConfirmDeteleUser from "./confirmDeteleUser";

const Dashboard: React.FC = () => {
    const [selectedUserId, setSelectedUserId] = useState<string>("");
    const { darkMode, allUsers, isLoader, setIsLoader, isModalOpen, setIsModalOpen,
        setToastMessage, isUsersLoading, setIsUsersLoading } = useData();

    // Safely extract the array (handle both null and object forms)
    const users: UserProps[] = Array.isArray(allUsers?.users)
        ? allUsers.users
        : Array.isArray(allUsers)
            ? allUsers
            : [];

    // Wait for allUsers to load from context
    useEffect(() => {
        if (allUsers && allUsers.users && allUsers.users.length > 0) {
            setIsUsersLoading(false);
        };
    }, [allUsers, setIsUsersLoading]);

    const handleDelete = (userId: string) => {
        setIsModalOpen(true);
        setSelectedUserId(userId);
    };

    return (
        <>
            <div className={`flex-1 box-border min-h-screen transition-colors duration-300 ${darkMode ? "bg-[#1E1E1E] text-white" : "border-[#94E561] text-black"}`}>
                {/* Stats Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
                    {[
                        { label: "Total Users", value: users.length },
                        { label: "Active Users", value: users.length },
                        { label: "Admins", value: users.filter(u => u.role === "admin").length },
                    ].map((stat, index) => (
                        <div
                            key={index}
                            className={`rounded-xl p-5 shadow hover:shadow-lg transition-all 
                                ${darkMode ? "bg-[#333333] border border-[#94E561]/40" : "bg-[#FAFAFA]"}`}>
                            <h3 className={`text-lg font-medium mb-2" ${darkMode ? "text-[#94E561]" : "text-[#666666]"}`}>{stat.label}</h3>
                            <p className="text-3xl font-bold">{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* User Management Table */}
                <UserTable
                    users={users}
                    isLoading={isUsersLoading}
                    handleDelete={handleDelete}
                />
            </div>

            {/* Confirmation Modal */}
            {isModalOpen && isLoader !== true && (
                <ConfirmDeteleUser
                    userId={selectedUserId}
                    isLoader={isLoader}
                    setIsLoader={setIsLoader}
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    setToastMessage={setToastMessage}
                />
            )}
        </>
    );
};

export default Dashboard;