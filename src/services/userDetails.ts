import type { StoredUserDetailsProps } from "../utilities/type";

export const userDetails = async (
    callback: (error: Error | null, data: StoredUserDetailsProps | null) => void
): Promise<void> => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/me`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });

        const result: StoredUserDetailsProps = await response.json();

        if (result?.user?._id) {
            callback(null, result);
            localStorage.setItem("userDetails", JSON.stringify(result));
        } else {
            callback(new Error(result.message || "Failed to retrieve user details."), null);
        }
    } catch (error) {
        callback(error as Error, null);
    }
};