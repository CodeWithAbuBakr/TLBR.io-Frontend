import { refreshToken } from "../services/auth/refreshToken";
import { refreshCSRFToken } from "./auth/refreshCSRFToken";
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
        if (err instanceof Error && err.message === "Please login - no token") {
            // Wrap callback-based refreshToken in a Promise
            return new Promise<T>((resolve, reject) => {
                refreshToken(async (refreshError, data) => {
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
export const getRefreshedCSRFToken = (userId: string): Promise<ResponseProps> =>
    wrapWithTokenRefresh(() =>
        wrapWithPromise<ResponseProps>((callback) => refreshCSRFToken(userId, callback))
    );

export const getUserDetails = (): Promise<StoredUserDetailsProps> =>
    wrapWithTokenRefresh(() => wrapWithPromise<StoredUserDetailsProps>(userDetails));

export const getAllUserDetails = (): Promise<StoredAllUserDetailsProps> =>
    wrapWithTokenRefresh(() => wrapWithPromise<StoredAllUserDetailsProps>(allUserDetails));

export const getCreateCheckout = (userId: string, plan: string): Promise<ResponseProps> =>
    wrapWithTokenRefresh(() =>
        wrapWithPromise<ResponseProps>((callback) => createCheckout(userId, plan, callback))
    );

export const getVerifySession = (sessionId: string): Promise<ResponseProps> =>
    wrapWithTokenRefresh(() =>
        wrapWithPromise<ResponseProps>((callback) => verifySession(sessionId, callback))
    );

export const removeUser = (userId: string): Promise<ResponseProps> =>
    wrapWithTokenRefresh(() =>
        new Promise<ResponseProps>((resolve, reject) => {
            deleteUser(userId, (err, data) => {
                if (err) reject(err);
                else if (data) resolve(data);
                else reject(new Error("No data returned from deleteUser"));
            });
        })
    );

export const doLogout = (): Promise<ResponseProps> =>
    wrapWithTokenRefresh(() => wrapWithPromise<ResponseProps>(logoutUser));
