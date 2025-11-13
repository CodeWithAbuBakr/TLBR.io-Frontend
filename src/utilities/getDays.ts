export const getRemainingDays = (endDateString?: string): string => {
    if (!endDateString) return '0-day remaining';

    const endDate = new Date(endDateString);
    const today = new Date();
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return `${diffDays > 0 ? diffDays : 0}-day remaining`;
};

export const getAllRemainingDays = (endDateString?: string): string => {
    if (!endDateString) return '0 day';

    const endDate = new Date(endDateString);
    const today = new Date();
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return `${diffDays > 0 ? diffDays : 0} days`;
};

export const getDaysPassed = (startDate: string, endDate: string) => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();

    const totalDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    const passedDays = Math.ceil((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

    return Math.min(Math.max(passedDays, 0), totalDays);
};
