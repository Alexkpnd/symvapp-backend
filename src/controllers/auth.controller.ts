import { Request, Response, NextFunction } from "express";
import * as authService from '../services/auth.service';

// export const login = async (req:Request, res: Response, next: NextFunction) => {
//     try {
//         const {username, password} = req.body;
//         const result = await authService.login(username,password);
//         res.status(200).json({token:result.token, user:result.user});
//     } catch (err: any) {
//         next(err);
//     }
// }