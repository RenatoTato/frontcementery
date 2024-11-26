export enum UserRole {
    Administrador = 1,
    Secretaria = 2,
    Deudo = 3
}
export interface User {
    id: number;
    password: string;
    last_login: string | null;
    is_superuser: boolean;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    is_staff: boolean;
    is_active: boolean;
    date_joined: string;
    groups: UserRole[]; // Array de roles usando el enum
    user_permissions: number[];
}
export interface loginModel{
    username: string;
    password: string;
}
export interface RefreshModel{
    refresh:string;
    access:string;
}