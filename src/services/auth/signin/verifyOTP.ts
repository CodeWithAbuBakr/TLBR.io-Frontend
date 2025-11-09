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
            callback(null, result);
            localStorage.setItem("lgoinData", JSON.stringify(result));
        } else {
            const error = new Error(result.message || "OTP verification failed");
            callback(error, null);
        }
    } catch (error) {
        console.error("Fetch error:", error);
        localStorage.removeItem("userSession");
        callback(error as Error, null);
    }
};
