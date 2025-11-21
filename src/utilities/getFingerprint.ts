import FingerprintJS from '@fingerprintjs/fingerprintjs';

const getFingerprint = async () => {
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    return result.visitorId;
};


export const showFingerprint = async () => {
    const fingerPrint = await getFingerprint();
    return fingerPrint;
};
