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
