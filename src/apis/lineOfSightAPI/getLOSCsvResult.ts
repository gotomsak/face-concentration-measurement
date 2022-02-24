export const getLOSCsvResult = async (
    csvFile: any,
    csvFileName: string,
    nickname: string,
    killCnt: Number
) => {
    return await fetch(process.env.REACT_APP_LOSURL + "/getLOSCsv", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": process.env.REACT_APP_LOSURL!,
        },
        body: JSON.stringify({
            csv: csvFile.result,
            file_name: csvFileName,
            nickname: nickname,
            kill_cnt: killCnt,
        }),
    });
};
