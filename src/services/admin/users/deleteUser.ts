import { apiFetch } from "../../apiInterceptor";
import type { ResponseProps, StoredUserDetailsProps } from "../../../utilities/type";

export const deleteUser = async (
    userId: string,
    callback: (error: Error | null, data: ResponseProps | null) => void
): Promise<void> => {
    try {
        const response = await apiFetch(`/api/v1/admin/users/${userId}`, { method: "DELETE" });
        const result: StoredUserDetailsProps & { message?: string } = await response.json();

        if (result?.message === "User deleted successfully") {
            console.log(result);
            callback(null, result);
        } else {
            const errorMsg = result.message || "Failed to delete user.";
            callback(new Error(errorMsg), null);
        }
    } catch (error) {
        console.error("Fetch error:", error);
        callback(error as Error, null);
    }
};