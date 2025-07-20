import { User } from ".";

export interface PostModel {
    _id: string;
    text: string;
    userId: User;
    created_at: Date;
}