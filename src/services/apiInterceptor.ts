// const server = process.env.NEXT_PUBLIC_BASE_URL;

// let isRefreshing = false;
// let isRefreshingCSRFToken = false;

// let failedQueue: {
//     resolve: (token?: string | null) => void;
//     reject: (error: unknown) => void;
// }[] = [];

// let csrfFailedQueue: {
//     resolve: (token?: string | null) => void;
//     reject: (error: unknown) => void;
// }[] = [];

// // Helper to get cookie by name
// const getCookie = (name: string): string | undefined => {
//     const value = `; ${document.cookie}`;
//     const parts = value.split(`; ${name}=`);
//     if (parts.length === 2) return parts.pop()?.split(";").shift();
// };

// // Processes the failed queue for token refresh
// const processQueue = (error: unknown, token: string | null = null): void => {
//     failedQueue.forEach((prom) => {
//         if (error) {
//             prom.reject(error);
//         } else {
//             prom.resolve(token);
//         }
//     });
//     failedQueue = [];
// };

// // Processes the failed queue for CSRF refresh
// const processCSRFQueue = (error: unknown, token: string | null = null): void => {
//     csrfFailedQueue.forEach((prom) => {
//         if (error) {
//             prom.reject(error);
//         } else {
//             prom.resolve(token);
//         }
//     });
//     csrfFailedQueue = [];
// };

// // Refresh access token when expired
// const refreshAccessToken = async (): Promise<string | null> => {
//     try {
//         const response = await fetch(`${server}/api/v1/refresh/token`, {
//             method: "GET",
//             credentials: "include",
//         });

//         if (!response.ok) throw new Error("Failed to refresh token");

//         const data = await response.json();
//         const newToken = data?.token || null;

//         if (newToken) {
//             localStorage.setItem("token", newToken);
//         }

//         return newToken;
//     } catch (err) {
//         console.error("Token refresh failed:", err);
//         return null;
//     }
// };

// // Main fetch wrapper with automatic token & CSRF handling
// export const apiFetch = async (
//     url: string,
//     options: RequestInit = {}
// ): Promise<Response> => {
//     const token = localStorage.getItem("token");
//     const headers = new Headers(options.headers || {});

//     // Add Authorization header if token exists
//     if (token) {
//         headers.set("Authorization", `Bearer ${token}`);
//     }

//     // Add CSRF token for mutating requests
//     const method = options.method?.toLowerCase() || "get";
//     if (["post", "put", "delete"].includes(method)) {
//         const csrfToken = getCookie("csrfToken");
//         if (csrfToken) {
//             headers.set("x-csrf-token", csrfToken);
//         }
//     }

//     const requestOptions: RequestInit = {
//         ...options,
//         headers,
//         credentials: "include",
//     };

//     const response = await fetch(`${server}${url}`, requestOptions);

//     // CSRF handling block
//     if (!response.ok) {
//         const data = await response.clone().json().catch(() => ({}));
//         const errorCode = data?.code || "";

//         if (typeof errorCode === "string" && errorCode.startsWith("CSRF_")) {
//             if (isRefreshingCSRFToken) {
//                 // Corrected: match csrfFailedQueue typing
//                 return new Promise<Response>((resolve, reject) => {
//                     csrfFailedQueue.push({
//                         resolve: () => resolve(apiFetch(url, options)),
//                         reject,
//                     });
//                 });
//             }

//             isRefreshingCSRFToken = true;

//             try {
//                 await apiFetch("/api/v1/refresh-csrf", { method: "POST" });
//                 processCSRFQueue(null);
//                 return apiFetch(url, options);
//             } catch (error) {
//                 processCSRFQueue(error);
//                 console.error("Failed to refresh CSRF token", error);
//                 return Promise.reject(error);
//             } finally {
//                 isRefreshingCSRFToken = false;
//             }
//         }
//     }

//     // Handle access token refresh on 403
//     if (response.status === 403) {
//         if (!isRefreshing) {
//             isRefreshing = true;

//             try {
//                 const newToken = await refreshAccessToken();
//                 processQueue(null, newToken);

//                 if (newToken) {
//                     headers.set("Authorization", `Bearer ${newToken}`);
//                     return fetch(`${server}${url}`, { ...requestOptions, headers });
//                 } else {
//                     throw new Error("No new token received");
//                 }
//             } catch (err) {
//                 processQueue(err, null);
//                 throw err;
//             } finally {
//                 isRefreshing = false;
//             }
//         } else {
//             return new Promise<Response>((resolve, reject) => {
//                 failedQueue.push({
//                     resolve: (token) => {
//                         if (token) {
//                             headers.set("Authorization", `Bearer ${token}`);
//                         }
//                         resolve(fetch(`${server}${url}`, { ...requestOptions, headers }));
//                     },
//                     reject,
//                 });
//             });
//         }
//     }

//     return response;
// };

const server = import.meta.env.VITE_BASE_URL;

let isRefreshing = false;

let failedQueue: {
    resolve: (token?: string | null) => void;
    reject: (error: unknown) => void;
}[] = [];

// Processes the failed queue for token refresh
const processQueue = (error: unknown, token: string | null = null): void => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

// Refresh access token when expired
const refreshAccessToken = async (): Promise<string | null> => {
    try {
        const response = await fetch(`${server}/api/v1/refresh/token`, {
            method: "GET",
            credentials: "include",
        });

        if (!response.ok) throw new Error("Failed to refresh token");

        const data = await response.json();
        const newToken = data?.token || null;

        if (newToken) {
            localStorage.setItem("token", newToken);
        }

        return newToken;
    } catch (err) {
        console.error("Token refresh failed:", err);
        return null;
    }
};

// Main fetch wrapper with automatic token handling
export const apiFetch = async (
    url: string,
    options: RequestInit = {}
): Promise<Response> => {
    const token = localStorage.getItem("token");
    const headers = new Headers(options.headers || {});

    // Add Authorization header if token exists
    if (token) {
        headers.set("Authorization", `Bearer ${token}`);
    }

    const requestOptions: RequestInit = {
        ...options,
        headers,
        credentials: "include",
    };

    const response = await fetch(`${server}${url}`, requestOptions);

    // Handle access token refresh on 403
    if (response.status === 403) {
        if (!isRefreshing) {
            isRefreshing = true;

            try {
                const newToken = await refreshAccessToken();
                processQueue(null, newToken);

                if (newToken) {
                    headers.set("Authorization", `Bearer ${newToken}`);
                    return fetch(`${server}${url}`, { ...requestOptions, headers });
                } else {
                    throw new Error("No new token received");
                }
            } catch (err) {
                processQueue(err, null);
                throw err;
            } finally {
                isRefreshing = false;
            }
        } else {
            // Queue requests while refreshing token
            return new Promise<Response>((resolve, reject) => {
                failedQueue.push({
                    resolve: (token) => {
                        if (token) {
                            headers.set("Authorization", `Bearer ${token}`);
                        }
                        resolve(fetch(`${server}${url}`, { ...requestOptions, headers }));
                    },
                    reject,
                });
            });
        }
    }

    return response;
};