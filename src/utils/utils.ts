export const getNowTimeString = (): string => {
    const date = new Date();
    return (
        date.getFullYear().toString() +
        "-" +
        ("00" + (date.getMonth() + 1).toString()).slice(-2) +
        "-" +
        ("00" + date.getDate().toString()).slice(-2) +
        " " +
        ("00" + date.getHours().toString()).slice(-2) +
        ":" +
        ("00" + date.getMinutes().toString()).slice(-2) +
        ":" +
        ("00" + date.getSeconds().toString()).slice(-2)
    );
};

export const range = (start: number, end: number) =>
    Array.from({ length: end - start + 1 }, (v, k) => k + start);
