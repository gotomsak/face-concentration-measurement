export const getFpsData = async () => {
    return await fetch(process.env.REACT_APP_LOSURL + "/getFpsData", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": process.env.REACT_APP_LOSURL!,
        },
    });
};
