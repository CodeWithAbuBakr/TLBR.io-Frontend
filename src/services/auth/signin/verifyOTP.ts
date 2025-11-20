import CryptoJS from "crypto-js";
import type { ResponseProps } from "../../../utilities/type";

export const verifyOTP = async (
    email: string,
    otp: string,
    callback: (error: Error | null, data: ResponseProps | null) => void
): Promise<void> => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        'email': email,
        'otp': otp
    });

    const requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        credentials: "include"
    };

    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/verify/otp`, requestOptions);
        const result: ResponseProps = await response.json();

        if (result.message && result.message.includes("Welcome")) {
            const tokens = result.tokens;
            const encryptedTokens = CryptoJS.AES.encrypt(JSON.stringify(tokens), import.meta.env.VITE_SECRET_KEY).toString();
            localStorage.setItem("tokens", encryptedTokens);

            callback(null, result);
        } else {
            const error = new Error(result.message || "OTP verification failed");
            callback(error, null);
        }
    } catch (error) {
        console.error("Fetch error:", error);

        localStorage.removeItem("tokens");
        localStorage.removeItem("userSession");
        callback(error as Error, null);
    }
};
