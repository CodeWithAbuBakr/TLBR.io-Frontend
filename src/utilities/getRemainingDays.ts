export const getRemainingDays = (endDateString?: string): string => {
    if (!endDateString) return '0-day remaining';

    const endDate = new Date(endDateString);
    const today = new Date();
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return `${diffDays > 0 ? diffDays : 0}-day remaining`;
};
