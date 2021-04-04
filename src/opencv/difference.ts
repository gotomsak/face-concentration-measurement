export const difference = (p0: any, p1: any) => {
    return Math.sqrt(
        Math.pow(p0["_x"] - p1["_x"], 2) + Math.pow(p0["_y"] - p1["_y"], 2)
    );
};
