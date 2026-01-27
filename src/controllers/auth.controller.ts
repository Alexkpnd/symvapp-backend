import { Request, Response, NextFunction } from "express";
import * as authService from '../services/auth.service';


export const login = async (req:Request, res: Response, next: NextFunction) => {
    try {
        const {email, password} = req.body;
        const result = await authService.login(email, password);
        res.status(200).json({token:result.token});
    } catch (err: any) {
        next(err);
    }
}

export const register = async (req:Request, res: Response, next: NextFunction) => {
    try {
        const created = await authService.register(req.body);
        res.status(201).json({id:created._id, username: created.username, role: created.role})
    }catch (err: any) {
        next(err);
    }
}

export const me = async (req:Request, res: Response, next: NextFunction) =>{
    try{
        const result = await authService.showMe(req.user.id);
        res.status(200).json(result)
    } catch (err:any) {
        next(err);
    }
}