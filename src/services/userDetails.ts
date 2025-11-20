import CryptoJS from "crypto-js";
import type { StoredUserDetailsProps } from "../utilities/type";

export const userDetails = async (
    accessToken: string,
    callback: (error: Error | null, data: StoredUserDetailsProps | null) => void
): Promise<void> => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            }
        });

        const result: StoredUserDetailsProps = await response.json();

        if (result?.user?._id) {
            callback(null, result);
            const encryptedUserDetails = CryptoJS.AES.encrypt(JSON.stringify(result), import.meta.env.VITE_SECRET_KEY).toString();
            localStorage.setItem("userDetails", encryptedUserDetails);
        } else {
            callback(new Error(result.message || "Failed to retrieve user details."), null);
        }
    } catch (error) {
        callback(error as Error, null);
    }
};