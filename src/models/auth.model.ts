import { Types } from "mongoose";

export interface AuthPayload {
    id: Types.ObjectId,
    email: string;
    username: string;
    role: string;
}