import type { ResponseProps } from "../../../utilities/type";

export const deleteUser = async (
    userId: string,
    callback: (error: Error | null, data: ResponseProps | null) => void
): Promise<void> => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/admin/users/${userId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });

        const result: ResponseProps = await response.json();

        if (result.message === "User deleted successfully") {
            callback(null, result);
        } else {
            callback(new Error(result.message || "Failed to delete user."), null);
        }
    } catch (error) {
        callback(error as Error, null);
    }
};
