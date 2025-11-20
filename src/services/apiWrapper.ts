import { refreshTokens } from "../services/auth/refreshToken";
import { tokens } from "../utilities/getLocalStorageData";
import { userDetails } from "../services/userDetails";
import { allUserDetails } from "../services/admin/users/getUsers";
import { createCheckout } from "./billing/createCheckout";
import { verifySession } from "./billing/verifySession";
import { deleteUser } from "../services/admin/users/deleteUser";
import { logoutUser } from "../services/auth/logout";
import type { StoredUserDetailsProps, StoredAllUserDetailsProps, ResponseProps } from "../utilities/type";

// Wraps a callback-based API in a Promise
const wrapWithPromise = <T>(
    fn: (callback: (error: Error | null, data: T | null) => void) => Promise<void>
): Promise<T> => {
    return new Promise<T>((resolve, reject) => {
        fn((error, data) => {
            if (error) reject(error);
            else if (data) resolve(data);
            else reject(new Error("No data returned from API"));
        });
    });
};

// Wraps a Promise-returning API with token refresh logic
export const wrapWithTokenRefresh = async <T>(fn: () => Promise<T>): Promise<T> => {
    try {
        return await fn();
    } catch (err: unknown) {
        if (err instanceof Error && err.message === "Access token expired or invalid") {
            const decryptedTokens = tokens();
            const refreshToken = decryptedTokens?.refreshToken;

            // Wrap callback-based refreshToken in a Promise
            return new Promise<T>((resolve, reject) => {
                refreshTokens(refreshToken, async (refreshError, data) => {
                    if (refreshError) {
                        reject(refreshError);
                    } else {
                        console.log(data);

                        // Retry original function after token refresh
                        fn().then(resolve).catch(reject);
                    }
                });
            });
        } else {
            throw err;
        }
    }
};

// API wrappers
export const getUserDetails = (): Promise<StoredUserDetailsProps> =>
    wrapWithTokenRefresh(() => {
        const decryptedTokens = tokens();
        const accessToken = decryptedTokens?.accessToken;

        return wrapWithPromise<StoredUserDetailsProps>((callback) =>
            userDetails(accessToken, callback)
        );
    });

export const getAllUserDetails = (): Promise<StoredAllUserDetailsProps> =>
    wrapWithTokenRefresh(() => {
        const decryptedTokens = tokens();
        const accessToken = decryptedTokens?.accessToken;

        return wrapWithPromise<StoredAllUserDetailsProps>((callback) =>
            allUserDetails(accessToken, callback)
        );
    });

export const getCreateCheckout = (accessToken: string, userId: string, plan: string): Promise<ResponseProps> =>
    wrapWithTokenRefresh(() =>
        wrapWithPromise<ResponseProps>((callback) => createCheckout(accessToken, userId, plan, callback))
    );

export const getVerifySession = (accessToken: string, sessionId: string): Promise<ResponseProps> =>
    wrapWithTokenRefresh(() =>
        wrapWithPromise<ResponseProps>((callback) => verifySession(accessToken, sessionId, callback))
    );

export const removeUser = (accessToken: string, userId: string): Promise<ResponseProps> =>
    wrapWithTokenRefresh(() =>
        new Promise<ResponseProps>((resolve, reject) => {
            deleteUser(accessToken, userId, (err, data) => {
                if (err) reject(err);
                else if (data) resolve(data);
                else reject(new Error("No data returned from deleteUser"));
            });
        })
    );

export const doLogout = (accessToken: string,): Promise<ResponseProps> =>
    wrapWithTokenRefresh(() =>
        wrapWithPromise<ResponseProps>((callback) => logoutUser(accessToken, callback))
    );
