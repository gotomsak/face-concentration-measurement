export const getConcentration = (
    moveNum: any,
    maxFrequency: any,
    minFrequency: any
) => {
    const www = 10000;
    try {
        const res =
            Math.round(
                ((moveNum / www - maxFrequency / www) /
                    (minFrequency / www - maxFrequency / www)) *
                    1000
            ) / 1000;
        console.log("c2: " + res.toString());
        if (isNaN(res)) return 0;
        if (res < 0) return 0;
        if (res > 1) return 1;
        return res;
    } catch {
        return 0;
    }
};

export const getConcentrationSynthesis = (c1: any, c2: any, w: any) => {
    const res = (1 - w) * c1 + w * c2;
    if (res < 0) return 0;
    if (res > 1) return 1;
    return res;
};
