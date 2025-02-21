export interface User {
    userName: string;
    displayName: string;
    token: string;
    image?: string;
    isAdmin: boolean;
    isDataEntryUser: boolean;
    isDairyOwnerUser: boolean;
    isCustomerUser: boolean;
    isSalesUser: boolean;
}

export interface UserFormValues {
    email: string;
    password: string;
    displayName?: string;
    userName?: string;
}