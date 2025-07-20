import { User } from ".";

export interface ThemeModel {
    id: string;
    themeName: string;
    userId: User;
    subscribers: string[];
    posts: string[];
    createdAt: Date;
}