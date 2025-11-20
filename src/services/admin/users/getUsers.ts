import type { StoredAllUserDetailsProps } from "../../../utilities/type";

export const allUserDetails = async (
    accessToken: string,
    callback: (error: Error | null, data: StoredAllUserDetailsProps | null) => void
): Promise<void> => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/admin/users`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            }
        });

        const result: StoredAllUserDetailsProps = await response.json();

        if (result?.success) callback(null, result);
        else callback(new Error(result.message || "Failed to retrieve users."), null);
    } catch (error) {
        callback(error as Error, null);
    }
};