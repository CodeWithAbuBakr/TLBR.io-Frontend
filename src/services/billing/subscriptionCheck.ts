import type { SubscriptionDetailsPrps } from "../../utilities/type";

export const subscriptionCheck = async (
    accessToken: string,
    callback: (error: Error | null, data: SubscriptionDetailsPrps | null) => void
): Promise<void> => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/subscription/check`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            }
        });

        const result = await response.json();

        if (result.allowed && result.status) {
            callback(null, result);
        } else {
            callback(new Error(result.message || "Failed to retrieve subscription details."), null);
        }
    } catch (error) {
        callback(error as Error, null);
    }
};