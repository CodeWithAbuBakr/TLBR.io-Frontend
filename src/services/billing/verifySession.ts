import type { ResponseProps } from "../../utilities/type";

export const verifySession = async (
    accessToken: string,
    sessionId: string,
    callback: (error: Error | null, data: ResponseProps | null) => void
): Promise<void> => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/verify-session/${sessionId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            }
        });

        const result = await response.json();

        if (result.subscription.id) {
            callback(null, result);
        } else {
            callback(new Error(result.message || "Failed to retrieve user details."), null);
        }
    } catch (error) {
        callback(error as Error, null);
    }
};