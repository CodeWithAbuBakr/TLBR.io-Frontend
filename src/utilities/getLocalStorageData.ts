import CryptoJS from "crypto-js";

export const isAuth = () => {
    let decryptedIsAuth;
    const encryptedIsAuth = localStorage.getItem("isAuth");

    if (encryptedIsAuth) {
        const bytes = CryptoJS.AES.decrypt(encryptedIsAuth, import.meta.env.VITE_SECRET_KEY);
        decryptedIsAuth = bytes.toString(CryptoJS.enc.Utf8);
    } else {
        decryptedIsAuth = null;
    }

    return decryptedIsAuth;
};

export const userSession = () => {
    let decryptedUserSession;
    const encryptedUserSession = localStorage.getItem("userSession");

    if (encryptedUserSession) {
        const bytes = CryptoJS.AES.decrypt(encryptedUserSession, import.meta.env.VITE_SECRET_KEY);
        const decryptedText = bytes.toString(CryptoJS.enc.Utf8);

        try {
            decryptedUserSession = JSON.parse(decryptedText);
        } catch (e) {
            console.error("Failed to parse decrypted user session JSON:", e);
            decryptedUserSession = null;
        }
    } else {
        decryptedUserSession = null;
    }

    return decryptedUserSession;
};

export const userDetails = () => {
    let decryptedUserDetails;
    const encryptedUserDetails = localStorage.getItem("userDetails");

    if (encryptedUserDetails) {
        const bytes = CryptoJS.AES.decrypt(encryptedUserDetails, import.meta.env.VITE_SECRET_KEY);
        const decryptedText = bytes.toString(CryptoJS.enc.Utf8);

        try {
            decryptedUserDetails = JSON.parse(decryptedText);
        } catch (e) {
            console.error("Failed to parse decrypted user details JSON:", e);
            decryptedUserDetails = null;
        }
    } else {
        decryptedUserDetails = null;
    }

    return decryptedUserDetails;
};

export const currentISO = () => {
    let decryptedCurrentISO;
    const encryptedCurrentISO = localStorage.getItem("currentISO");

    if (encryptedCurrentISO) {
        const bytes = CryptoJS.AES.decrypt(encryptedCurrentISO, import.meta.env.VITE_SECRET_KEY);
        decryptedCurrentISO = bytes.toString(CryptoJS.enc.Utf8);
    } else {
        decryptedCurrentISO = null;
    }

    return decryptedCurrentISO;
};