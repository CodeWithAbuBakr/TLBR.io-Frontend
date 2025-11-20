import type { ResponseProps } from "../../../utilities/type";

export const forgotPassword = async (
    email: string,
    callback: (error: Error | null, data: ResponseProps | null) => void
): Promise<void> => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        'email': email,
    });

    const requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: raw
    };

    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/forgot/password`, requestOptions);
        const result: ResponseProps = await response.json();

        if (result.message === "If your email is valid, a password reset link has been sent to your email address. It will expire in 5 minutes.") {
            callback(null, result);
        } else {
            const error = new Error(result.message || "Fogot password failed");
            callback(error, null);
        }
    } catch (error) {
        console.error("Fetch error:", error);
        callback(error as Error, null);
    }
};
