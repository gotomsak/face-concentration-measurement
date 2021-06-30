import React, { useState, useEffect, useLayoutEffect } from "react";
import {
    DataGrid,
    GridCellValue,
    GridColDef,
    GridValueGetterParams,
} from "@material-ui/data-grid";
import Link from "@material-ui/core/Link";
import { AdminGetUserAllRes } from "../../apis/backendAPI/admin/interfaces";
import { adminGetUserAll } from "../../apis/backendAPI/admin/getUserAll";
import { useHistory } from "react-router";

interface UsersView {
    id: Number;
    username?: string;
    email?: string;
}

const UsersViewComponent: React.FC = () => {
    const [usersViewCol, setUsersViewCol] = useState<GridColDef[]>([
        {
            field: "id",
            headerName: "ID",
            width: 100,
            // valueGetter: (params: GridValueGetterParams) =>
            //     `${(<a>${params.id}</a>)}`,
            // `<Link
            //     href="#"
            //     onClick={() => {
            //         console.log(params.getValue(params.id, "username"));
            //     }}
            // >
            //     {params.getValue(params.id, "username")}
            // </Link>`,
            // return params!.getValue(params.id, "id")!.toString();
        },
        // { field: "user_id", headerName: "USERID", width: 70 },
        { field: "username", headerName: "USERNAME", width: 160 },
        {
            field: "email",
            headerName: "EMAIL",
            width: 160,
        },
    ]);
    const history = useHistory();
    const [usersViewData, setUsersViewData] = useState<UsersView[]>([]);

    const userIDtoID = (listData: AdminGetUserAllRes[]) => {
        const newListData: UsersView[] = listData.map(
            (value: AdminGetUserAllRes): UsersView => {
                return {
                    id: value.user_id,
                    username: value.username,
                    email: value.email,
                };
            }
        );
        return newListData;
    };

    useLayoutEffect(() => {
        adminGetUserAll().then((res: any) => {
            const changeData = userIDtoID(res.data["users_info"]);
            console.log(changeData);
            setUsersViewData(changeData);
            // res.data[]
        });
    }, []);

    return (
        <div style={{ height: "100%", width: "50%" }}>
            <DataGrid
                rows={usersViewData}
                columns={usersViewCol}
                // checkboxSelection
                onCellClick={(params: any) => {
                    console.log(params);
                    history.push("/AdminAnalysis/" + String(params.id));
                }}
            />
        </div>
    );
};

export default UsersViewComponent;
