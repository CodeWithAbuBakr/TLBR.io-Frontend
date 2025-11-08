import { apiFetch } from "../../apiInterceptor";
import type { ResponseProps, StoredAllUserDetailsProps } from "../../../utilities/type";

export const allUserDetails = async (
    callback: (error: Error | null, data: ResponseProps | null) => void
): Promise<void> => {
    try {
        const response = await apiFetch("/api/v1/admin/users", { method: "GET" });
        const result: StoredAllUserDetailsProps & { count?: number } = await response.json();

        if (result?.success) {
            console.log(result);

            // Loop through users and store essential details
            const filteredUserDetails = result.users.map((user) => ({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            }));

            const responseData: ResponseProps = {
                message: "Users retrieved successfully.",
                users: filteredUserDetails,
                count: result.count ?? filteredUserDetails.length,
            };

            callback(null, responseData);
        } else {
            const errorMsg = result.message || "Failed to retrieve user details.";
            callback(new Error(errorMsg), null);
        }
    } catch (error) {
        console.error("Fetch error:", error);
        callback(error as Error, null);
    }
};