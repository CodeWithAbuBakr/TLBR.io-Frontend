'use client';
import React, { useEffect } from 'react';
import { ToastContainer, Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import type { ToastProps } from '../utilities/type';

const Page: React.FC<ToastProps> = ({ errorMessage, successMessage, infoMessage }) => {
    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
        } else if (errorMessage) {
            toast.error(errorMessage);
        } else if (infoMessage) {
            toast.info(infoMessage);
        }
    }, [successMessage, errorMessage, infoMessage]);

    return (
        <>
            <div className='z-10'>
                <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    transition={Bounce}
                />
            </div>
        </>
    );
};

export default Page;