import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { NotAuthenticatedError } from "../errors/notAuthenticatedError";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET!;

declare global {
    namespace Express {
        interface Request {user: any}
    }
}


export const authenticate = (req:Request, res:Response, next:NextFunction) => {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
        throw new NotAuthenticatedError("Missing or invalid Authorization Header", 401);
    }

    const token = header.split(' ')[1];


    if (!token) {
        throw new NotAuthenticatedError("Invalid authorization format",401);
    }

    try {
        const payload = jwt.verify(token, JWT_SECRET);
        req.user = payload;
        //console.log("REQ USER>>>", req.user);
        next()
    } catch (err:any) {
        res.status(401).json({message: "Invalid or expired token"})
    }
}