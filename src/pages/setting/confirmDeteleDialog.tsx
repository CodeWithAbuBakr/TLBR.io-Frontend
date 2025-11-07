import React from 'react';
import { Modal } from '../../components/ui/modal';
import type { DeleteUserAccountDialogProps } from '../../utilities/type';

const ConfirmDeteleDialog: React.FC<DeleteUserAccountDialogProps> = ({
    isModalOpen,
    setIsModalOpen,
    setToastType,
    setToastMessage,
}) => {
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
        <>
            <Modal
                isOpen={isModalOpen}
                loader={false}
                onClose={() => setIsModalOpen(false)}
                className="max-w-md mx-auto p-6"
            >
                <div className="p-4">
                    <h3 className="text-lg font-semibold text-[#0A0A04] dark:text-white mb-2">
                        Confirm Account Deletion
                    </h3>
                    <p className="text-sm text-[#666666] dark:text-[#CCCCCC] mb-6">
                        Are you sure you want to permanently delete your account? This action cannot be undone.
                    </p>

                    <div className="flex justify-end gap-3">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 text-[#333333] dark:text-[#CCCCCC] hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDelete}
                            className="px-4 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white font-semibold transition-colors"
                        >
                            Confirm Delete
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default ConfirmDeteleDialog;