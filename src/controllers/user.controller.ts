import { Request, Response, NextFunction } from "express";
import * as userService from '../services/user.service';


export const getAllUsers = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const AllUsersResult = await userService.findAllUsers();
        if (AllUsersResult.length === 0) {
            return res.status(200).json({ message: "No users found"})
        }
        res.status(200).json(AllUsersResult)
    } catch (err) {
        res.status(400).json({message: err})
    }
}

export const createUser = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const createUserResult = await userService.createUser(req.body);
        res.status(201).json(createUserResult);
    } catch (err) {
        res.status(400).json({message:"Error in User Creation", error: err})
    }
}