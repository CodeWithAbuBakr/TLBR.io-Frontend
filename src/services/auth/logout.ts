import CryptoJS from "crypto-js";
import type { ResponseProps } from "../../utilities/type";

export const logoutUser = async (
    callback: (error: Error | null, data: ResponseProps | null) => void
): Promise<void> => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/logout`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });

        const result: ResponseProps = await response.json();
        if (result.message === "Logged out successfully") {
            callback(null, result);

            // Clean up stored data
            const encryptedIsAuth = CryptoJS.AES.encrypt("false", import.meta.env.VITE_SECRET_KEY).toString();
            localStorage.setItem("isAuth", encryptedIsAuth);
            localStorage.removeItem("loginData");
            localStorage.removeItem("userSession");
            localStorage.removeItem("userDetails");
        } else {
            const errorMsg = result.message || "Logout failed.";
            callback(new Error(errorMsg), null);
        }
    } catch (error) {
        callback(error as Error, null);
    }
};