import { apiFetch } from "./apiInterceptor";
import type { ResponseProps, StoredUserDetailsProps } from "../utilities/type";

export const userDetails = async (
    callback: (error: Error | null, data: ResponseProps | null) => void
): Promise<void> => {
    try {
        const response = await apiFetch("/api/v1/me", { method: "GET" });
        const result: StoredUserDetailsProps & { message?: string } = await response.json();

        if (result?.user?._id) {
            callback(null, result);

            // Extract and store only essential details
            const filteredUserDetails = {
                user: {
                    _id: result.user._id,
                    name: result.user.name,
                    email: result.user.email,
                    role: result.user.role,
                },
                sessionInfo: {
                    sessionId: result.sessionInfo?.sessionId ?? null,
                    loginTime: result.sessionInfo?.loginTime ?? null,
                },
            };

            localStorage.setItem("userDetails", JSON.stringify(filteredUserDetails));
        } else {
            const errorMsg = result.message || "Failed to retrieve user details.";
            callback(new Error(errorMsg), null);
        }
    } catch (error) {
        console.error("Fetch error:", error);
        callback(error as Error, null);
    }
};