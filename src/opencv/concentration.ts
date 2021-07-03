export const getConcentration = (
    moveNum: any,
    maxFrequency: any,
    minFrequency: any
) => {
    try {
        const bunsi = maxFrequency - moveNum;
        const bunbo = maxFrequency - minFrequency;

        console.log("bunsi " + bunsi);
        console.log("bunbo " + bunbo);
        const res = bunsi / bunbo;

        console.log("c2: " + res.toString());
        console.log("c2moveNum:" + moveNum);
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
