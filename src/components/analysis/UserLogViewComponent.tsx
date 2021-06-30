import React, { useState, useEffect, useLayoutEffect } from "react";

import { DataGrid, GridColDef } from "@material-ui/data-grid";
import { useHistory } from "react-router";

import { adminGetIDLogUser } from "../../apis/backendAPI/admin/getIDLogUser";
import { AdminGetIDLogUserRes } from "../../apis/backendAPI/admin/interfaces";

interface UserLogView {
    id: number;
    date: Date;
    conc_data_id: string;
}

const UserLogViewComponent: React.FC<{ userID: number | undefined }> = ({
    userID,
}) => {
    // const [userLogData, setUserLogData] = useState();
    const [userLogViewCol, setUsersViewCol] = useState<GridColDef[]>([
        {
            field: "id",
            headerName: "ID",
            width: 100,
        },

        { field: "date", headerName: "日付", width: 300 },
        {
            field: "conc_data_id",
            headerName: "集中度データID",
            width: 300,
        },
    ]);

    const [userLogViewData, setUserLogViewData] = useState<UserLogView[]>([]);
    const history = useHistory();
    useLayoutEffect(() => {
        if (userID !== undefined) {
            adminGetIDLogUser(userID).then((res: any) => {
                console.log(res);
                setUserLogViewData(
                    getIDLogUesrFormating(res.data["get_id_log_user"])
                );
            });
        }
    }, []);

    const getIDLogUesrFormating = (listData: AdminGetIDLogUserRes[]) => {
        console.log(listData);
        const newListData: UserLogView[] = listData.map(
            (value: AdminGetIDLogUserRes): UserLogView => {
                return {
                    id: value.ID,
                    date: value.CreatedAt,
                    conc_data_id: value.conc_data_id,
                };
            }
        );
        return newListData;
    };

    return (
        <div style={{ height: "100%", width: "70%" }}>
            {/* <DataGridNoRender></DataGridNoRender> */}
            <DataGrid
                rows={userLogViewData}
                columns={userLogViewCol}
                // checkboxSelection
                onCellClick={(params: any) => {
                    console.log(params);
                    console.log(userLogViewData);
                    console.log(history.location);
                    console.log(
                        history.location.pathname +
                            "/" +
                            params.row.conc_data_id
                    );
                    history.push(
                        history.location.pathname +
                            "/" +
                            params.row.conc_data_id
                    );
                }}
            />
        </div>
    );
};

export default React.memo(UserLogViewComponent);
