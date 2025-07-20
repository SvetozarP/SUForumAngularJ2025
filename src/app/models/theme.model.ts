import { User } from ".";

export interface ThemeModel {
    _id: string;
    themeName: string;
    userId: User;
    subscribers: string[];
    posts: string[];
    created_at: Date;
}