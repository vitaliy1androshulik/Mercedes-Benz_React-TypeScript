export type UserFormField = {
    email?: string;
    password?: string;
    phoneNumber?: string;
    birthdate?: Date;
    // remember?: boolean;
};

export type UserLoginField = {
    email?: string;
    password?: string;
    // remember?: boolean;
};

export interface AccountData {
    id: string;
    email: string;
    birthdate?: Date;
}