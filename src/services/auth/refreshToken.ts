import CryptoJS from "crypto-js";
import type { ResponseProps } from "../../utilities/type";

export const refreshTokens = async (
    refreshToken: string,
    callback: (error: Error | null, data: ResponseProps | null) => void
): Promise<void> => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/refresh/token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${refreshToken}`
            }
        });

        const result: ResponseProps = await response.json();
        if (result.message === "Access token refreshed successfully") {
            const tokens = result.tokens;
            const encryptedTokens = CryptoJS.AES.encrypt(JSON.stringify(tokens), import.meta.env.VITE_SECRET_KEY).toString();
            localStorage.setItem("tokens", encryptedTokens);

            callback(null, result);
        } else {
            const errorMsg = result.message;
            callback(new Error(errorMsg), null);
        }
    } catch (error) {
        console.error("Error refreshing token", error);
        callback(error as Error, null);
    }
};