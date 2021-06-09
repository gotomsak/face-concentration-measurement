import React, { useState, useEffect, useLayoutEffect } from "react";
import { DataGrid, GridColDef } from "@material-ui/data-grid";
import { AdminGetUserAllRes } from "../../apis/backendAPI/admin/interfaces";
import { getUserAll } from "../../apis/backendAPI/admin/getUserAll";
interface UsersView {
    id: Number;
    username?: string;
    email?: string;
}

const UsersViewComponent: React.FC = () => {
    const [usersViewCol, setUsersViewCol] = useState<GridColDef[]>([
        { field: "id", headerName: "ID", width: 100 },
        // { field: "user_id", headerName: "USERID", width: 70 },
        { field: "username", headerName: "USERNAME", width: 160 },
        {
            field: "email",
            headerName: "EMAIL",
            width: 160,
        },
    ]);
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
        getUserAll().then((res: any) => {
            const changeData = userIDtoID(res.data["users_info"]);
            console.log(changeData);
            setUsersViewData(changeData);
            // res.data[]
        });
    }, []);
    return (
        <div style={{ height: 400, width: "80%" }}>
            <DataGrid rows={usersViewData} columns={usersViewCol} />
        </div>
    );
};

export default UsersViewComponent;
