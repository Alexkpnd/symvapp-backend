import { Request, Response, NextFunction } from "express";
import { NoPriviligesError } from "../errors/priviligesError";


export const hasAdminRole = (req: Request, res: Response, next: NextFunction) => {
    try {
        const checkAdminRole = (req.user.role);
        if (checkAdminRole !== 'ADMIN') {
            throw new NoPriviligesError('Forbidden: Insufficient permissions: Not an ADMIN', 403)
        }
        next()
    } catch (err) {
        next(err)
    }

}