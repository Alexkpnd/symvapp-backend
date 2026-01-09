import { Types } from "mongoose";

export interface AuthPayload {
    email: string;
    username: string;
    role: string;
}