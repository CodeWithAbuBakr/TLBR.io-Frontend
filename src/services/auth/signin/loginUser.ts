import CryptoJS from "crypto-js";
import type { ResponseProps } from "../../../utilities/type";

export const loginUser = async (
    email: string,
    password: string,
    isChecked: boolean,
    callback: (error: Error | null, data: ResponseProps | null) => void
): Promise<void> => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        'email': email,
        'password': password
    });

    const requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        credentials: "include"
    };

    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/login`, requestOptions);
        const result: ResponseProps = await response.json();

        if (result.message === "If your email is valid, an OTP has been sent to your email address. It will expire in 5 minutes.") {
            const userData = { email, password, keepMeLoggedIn: isChecked };
            const encryptedUserData = CryptoJS.AES.encrypt(JSON.stringify(userData), import.meta.env.VITE_SECRET_KEY).toString();
            localStorage.setItem("userSession", encryptedUserData);

            callback(null, result);
        } else {
            const error = new Error(result.message || "Registration failed");
            callback(error, null);
        }
    } catch (error) {
        console.error("Fetch error:", error);
        callback(error as Error, null);
    }
};
