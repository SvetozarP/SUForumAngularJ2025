import { User } from ".";

export interface Post {
    id: string;
    text: string;
    userID: User;
    themeId: string;
    createdAt: Date;
}