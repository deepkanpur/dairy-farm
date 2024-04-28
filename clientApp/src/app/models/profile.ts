import { User } from "./user";

export interface IProfile {
    userName: string;
    displayName: string;
    image?: string;
    bio?: string;
    // following: boolean;
    // followersCount: number;
    // followingCount: number;
    // photos: Photo[];
}

export class Profile implements Profile {
    constructor(user: User) {
        this.userName = user.userName;
        this.displayName = user.displayName;
        this.image = user.image;        
    }
    
    userName: string;
    displayName: string;
    image?: string;
    bio?: string;
}