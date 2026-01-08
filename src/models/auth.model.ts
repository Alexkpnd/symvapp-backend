import { Types } from "mongoose";

export interface AuthPayload {
    email: string;
    firstname: string;
    lastname:string;
}