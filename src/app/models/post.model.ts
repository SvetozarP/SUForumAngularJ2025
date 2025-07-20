import { User } from ".";

export interface PostModel {
    id: string;
    text: string;
    userID: User;
    themeId: string;
    createdAt: Date;
}