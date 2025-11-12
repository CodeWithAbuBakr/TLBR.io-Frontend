import type { ResponseProps } from "../../../utilities/type";

export const resetPassword = async (
    password: string,
    resetLink: string,
    callback: (error: Error | null, data: ResponseProps | null) => void
): Promise<void> => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "password": password
    });

    const requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        credentials: "include"
    };

    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/reset/password/${resetLink}`, requestOptions);
        const result: ResponseProps = await response.json();

        if (result.message === "Password reset successfully. All active sessions have been logged out. You can now log in with your new password.") {
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
