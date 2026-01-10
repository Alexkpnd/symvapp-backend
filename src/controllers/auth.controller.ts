import { Request, Response, NextFunction } from "express";
import * as authService from '../services/auth.service';


export const login = async (req:Request, res: Response, next: NextFunction) => {
    try {
        const {email, password} = req.body;
        const result = await authService.login(email, password);
        res.status(200).json({token:result.token, user:result.user});
    } catch (err: any) {
        next(err);
    }
}

export const register = async (req:Request, res: Response, next: NextFunction) => {
    try {
        const created = await authService.register(req.body);
        res.status(201).json({id:created._id, username: created.username, role: created.role})
    }catch (err) {
        next(err);
    }
}

export const me = async (req:Request, res: Response, next: NextFunction) =>{
    if (!req.user) return res.status(401).json({ message: 'Not authenticated' });
    res.json(req.user);
}