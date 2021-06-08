export interface AdminUser {
    username?: string;
    email: string;
    password: string;
}

export interface AdminGetUserAllRes {
    user_id: Number;
    username?: string;
    email?: string;
}
