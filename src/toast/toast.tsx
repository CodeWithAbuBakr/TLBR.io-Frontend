import { useEffect, useRef } from "react";
import { toast, Toaster } from "react-hot-toast";
import type { ToastPropsMsg } from "../utilities/type";

const AppToast: React.FC<ToastPropsMsg> = ({ toastMessage }) => {
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (!toastMessage) return;

        // Prevent double run in React Strict Mode
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        };

        const { type, message } = toastMessage;

        if (type === "success") toast.success(message);
        else if (type === "error") toast.error(message);
        else toast(message);
    }, [toastMessage]);

    return <Toaster />;
};

export default AppToast;