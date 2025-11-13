import type { ResponseProps } from "../../utilities/type";

export const refreshCSRFToken = async (
    callback: (error: Error | null, data: ResponseProps | null) => void
): Promise<void> => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/refresh/csrf`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });

        const result: ResponseProps = await response.json();
        if (result.message === "CSRF token refreshed successfully") {
            callback(null, result);
        } else {
            const errorMsg = result.message;
            callback(new Error(errorMsg), null);
        }
    } catch (error) {
        console.error("Error refreshing csrf token", error);
        callback(error as Error, null);
    }
};