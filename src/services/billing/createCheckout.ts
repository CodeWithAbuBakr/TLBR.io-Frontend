import type { ResponseProps } from "../../utilities/type";

export const createCheckout = async (
    accessToken: string,
    userId: string,
    plan: string,
    callback: (error: Error | null, data: ResponseProps | null) => void
): Promise<void> => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/create-checkout-session`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify({ userId, plan }),
        });

        const result = await response.json();

        if (result.error) {
            callback(new Error(result.message || result.error || "Failed to retrieve user details."), null);
        } else {
            callback(null, result);
        }
    } catch (error) {
        callback(error as Error, null);
    }
};