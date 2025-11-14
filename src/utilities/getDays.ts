import { currentISO } from "./getLocalStorageData";
const decryptedCurrentISO = currentISO();

export const getDaysPassed = (startDate: string, endDate: string) => {
    if (!startDate || !endDate || !decryptedCurrentISO) return 0;

    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date(decryptedCurrentISO);

    const msPerDay = 1000 * 60 * 60 * 24;

    const totalDays = Math.ceil((end.getTime() - start.getTime()) / msPerDay);
    const remainingDays = Math.floor((end.getTime() - today.getTime()) / msPerDay);

    const passedDays = totalDays - remainingDays;

    return Math.min(Math.max(passedDays, 0), totalDays);
};

export const getRemainingDays = (endDateString?: string): string => {
    if (!endDateString || !decryptedCurrentISO) return '0-days remaining';

    const endDate = new Date(endDateString);
    const today = new Date(decryptedCurrentISO);

    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return `${diffDays > 0 ? diffDays : 0}-days remaining`;
};

export const getAllRemainingDays = (endDateString?: string): string => {
    if (!endDateString || !decryptedCurrentISO) return '0 day';

    const endDate = new Date(endDateString);
    const today = new Date(decryptedCurrentISO);

    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return `${diffDays > 0 ? diffDays : 0} days`;
};
