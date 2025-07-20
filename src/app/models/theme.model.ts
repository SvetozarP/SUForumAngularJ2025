import { User } from ".";

export interface Theme {
    id: string;
    themeName: string;
    userId: User;
    subscribers: string[];
    posts: string[];
    createdAt: Date;
}