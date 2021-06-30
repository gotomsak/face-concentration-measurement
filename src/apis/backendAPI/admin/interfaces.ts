export interface AdminUser {
    username?: string;
    email: string;
    password: string;
    token: string;
}

export interface AdminGetUserAllRes {
    user_id: Number;
    username?: string;
    email?: string;
}

export interface AdminGetIDLogUserRes {
    ID: number;
    CreatedAt: Date;
    conc_data_id: string;
    user_id: number;
    DeletedAt: Date;
    UpdateAt: Date;
}
