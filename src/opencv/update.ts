export const updateFreq = (max: any, min: any, now: any) => {
    if (max < now) {
        max = now;
    }
    if (min > now || min == 0) {
        min = now;
    }
    return { max: max, min: min };
};
