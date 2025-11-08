import React from 'react';
import { Modal } from '../../components/ui/modal';
import { useData } from '../../utilities/useData';
import type { DeleteUserAccountDialogProps } from '../../utilities/type';

const ConfirmDeteleDialog: React.FC<DeleteUserAccountDialogProps> = ({
    isModalOpen,
    setIsModalOpen,
    setToastType,
    setToastMessage,
}) => {
    const { darkMode } = useData();

    const handleDelete = () => {
        setToastType(null);
        setToastMessage("");

        // Trigger toast after a short delay
        setTimeout(() => {
            setToastType("success");
            setToastMessage("Your account has been successfully deleted.");
        }, 10);

        setIsModalOpen(false);
    };

    return (
        <Modal
            isOpen={isModalOpen}
            loader={false}
            onClose={() => setIsModalOpen(false)}
            className="max-w-md mx-auto p-6"
        >
            <div
                className={`p-4 rounded-md transition-colors
                    ${darkMode ? '' : 'bg-white'}`}
            >
                <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-[#0A0A04]'}`}>
                    Confirm Account Deletion
                </h3>
                <p className={`text-sm mb-6 ${darkMode ? 'text-[#CCCCCC]' : 'text-[#666666]'}`}>
                    Are you sure you want to permanently delete your account? This action cannot be undone.
                </p>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className={`px-4 py-2 rounded-full cursor-pointer border transition-colors
                            ${darkMode
                                ? 'border-gray-600 text-[#CCCCCC] hover:bg-gray-700'
                                : 'border-gray-300 text-[#333333] hover:bg-gray-100'}`}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDelete}
                        className="px-4 py-2 rounded-full cursor-pointer bg-red-600 hover:bg-red-700 text-white font-semibold transition-colors"
                    >
                        Confirm Delete
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default ConfirmDeteleDialog;