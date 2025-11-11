import type { ResponseProps } from "../../utilities/type";

export const createCheckout = async (
    userId: string,
    plan: string,
    callback: (error: Error | null, data: ResponseProps | null) => void
): Promise<void> => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/create-checkout-session`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, plan }),
            credentials: "include",
        });

        const result = await response.json();

        if (result) {
            callback(null, result);
        } else {
            callback(new Error(result.message || "Failed to retrieve user details."), null);
        }
    } catch (error) {
        callback(error as Error, null);
    }
};