import type { ResponseProps } from "../../utilities/type";
import { apiFetch } from "../apiInterceptor";

export const logoutUser = async (
    callback: (error: Error | null, data: ResponseProps | null) => void
): Promise<void> => {
    try {
        const response = await apiFetch("/api/v1/logout", {
            method: "GET",
        });

        if (!response.ok) {
            throw new Error(`Logout request failed with status ${response.status}`);
        }

        const result: ResponseProps = await response.json();

        if (result.message === "Logged out successfully") {
            callback(null, result);

            // Clean up stored data
            localStorage.setItem("isAuth", "false");
            localStorage.removeItem("userSession");
            localStorage.removeItem("userDetails");
        } else {
            const errorMsg = result.message || "Logout failed.";
            callback(new Error(errorMsg), null);
        }
    } catch (error) {
        console.error("Logout fetch error:", error);
        callback(error as Error, null);
    }
};