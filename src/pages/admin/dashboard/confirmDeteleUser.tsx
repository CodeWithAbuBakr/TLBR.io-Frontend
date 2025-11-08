import React from 'react';
import { Modal } from '../../../components/ui/modal';
import Loader from '../../../loader/loader';
import type { ConfirmDeleteUserDialogProps, StoredAllUserDetailsProps } from '../../../utilities/type';
import { deleteUser } from '../../../services/admin/users/deleteUser';
import { allUserDetails } from '../../../services/admin/users/getUsers';
import { useData } from '../../../utilities/useData';
import UIText from '../../../utilities/testResource';

const ConfirmDeteleUser: React.FC<ConfirmDeleteUserDialogProps> = ({
    isLoader,
    setIsLoader,
    isModalOpen,
    setIsModalOpen,
    setToastType,
    setToastMessage,
    userId,
}) => {
    const { darkMode, setAllUsers, setIsUsersLoading } = useData();

    const handleDelete = () => {
        setToastType(null);
        setToastMessage("");

        if (userId) {
            setIsLoader(true);

            deleteUser(userId, (error, data) => {
                if (error) {
                    console.log("Delete user error:", error);
                    setIsLoader(false);

                    if (error.message === "Admins cannot delete other admins (including themselves)") {
                        setIsModalOpen(false);

                        setToastType("info");
                        setToastMessage(error.message || "Admins cannot delete other admins (including themselves)");
                    } else if (error.message === "You cannot delete your own account") {
                        setIsModalOpen(false);

                        setToastType("info");
                        setToastMessage(error.message || "You cannot delete your own account");
                    } else {
                        setToastType("error");
                        setToastMessage(error.message || "Error getting all users details.");
                    };
                } else if (data) {
                    console.log("Delete user success:", data);
                    setIsModalOpen(false);
                    setIsUsersLoading(true);

                    setToastType("success");
                    setToastMessage(data.message || "User deleted successfully");

                    allUserDetails((error, data) => {
                        if (error) {
                            console.log("All User Details error:", error);
                            setIsLoader(false);

                            setToastType("error");
                            setToastMessage(error.message || "Error getting all users details.");
                        } else if (data) {
                            console.log("All User Details success:", data);
                            setIsLoader(false);

                            const formattedData = data as StoredAllUserDetailsProps;
                            setAllUsers(formattedData);
                        }
                    });
                }
            });
        }
    };

    return (
        <>
            {isModalOpen ? (
                isLoader !== false ? (
                    <Loader
                        isModalOpen={isModalOpen}
                        setIsModalOpen={setIsModalOpen}
                    />
                ) : (
                    <Modal
                        isOpen={isModalOpen}
                        loader={false}
                        onClose={() => setIsModalOpen(false)}
                        className={`max-w-md mx-auto p-6 ${darkMode ? "bg-[#1E1E1E] text-white" : "bg-white text-black"}`}
                    >
                        <div className="p-4">
                            <h3 className={`text-lg font-semibold mb-2 ${darkMode ? "text-white" : "text-[#0A0A04]"}`}>
                                {UIText.admin.deleteUser.title}
                            </h3>
                            <p className={`text-sm mb-6 ${darkMode ? "text-[#CCCCCC]" : "text-[#666666]"}`}>
                                {UIText.admin.deleteUser.description}
                            </p>

                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className={`px-4 py-2 rounded-full border cursor-pointer transition-colors ${darkMode
                                        ? "border-gray-600 dark:hover:bg-gray-600 text-[#CCCCCC]"
                                        : "border-gray-300 hover:bg-gray-100 text-[#333333]"
                                        }`}
                                >
                                    {UIText.admin.deleteUser.cancel}
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="px-4 py-2 rounded-full cursor-pointer bg-red-600 hover:bg-red-700 text-white font-semibold transition-colors"
                                >
                                    {UIText.admin.deleteUser.confirm_delete}
                                </button>
                            </div>
                        </div>
                    </Modal>
                )
            ) : null}
        </>
    );
};

export default ConfirmDeteleUser;