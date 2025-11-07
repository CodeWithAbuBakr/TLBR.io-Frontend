import type { ResponseProps } from "../../../utilities/type";

export const verifyUser = async (
    token: string,
    callback: (error: Error | null, data: ResponseProps | null) => void
): Promise<void> => {
    const myHeaders = new Headers();

    const requestOptions: RequestInit = {
        method: "GET",
        headers: myHeaders,
        credentials: "include"
    };

    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/verify/${token}`, requestOptions);
        const result: ResponseProps = await response.json();

        if (result.message === 'Email verified successfully. Your account has been created.') {
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
