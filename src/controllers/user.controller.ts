import { Request, Response, NextFunction } from "express";
import * as userService from '../services/user.service';


export const getAllUsers = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const allUsersResult = await userService.findAllUsers();
        res.status(200).json(allUsersResult)
    } catch (err:any) {
        next(err);
    }
}

export const getUserById = async(req:Request, res:Response, next:NextFunction) => {
    try {
        const userFoundResult = await userService.findUserById(req.params.id!);
        res.status(201).json(userFoundResult);
    } catch (err:any) {
        next(err);
    }
}

export const createUser = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const createUserResult = await userService.createUser(req.body);
        res.status(201).json(createUserResult);
    } catch (err:any) {
        next(err)
    }
}

export const updateUser = async(req:Request, res:Response, next:NextFunction) => {
    try {
        const updateUserResult = await userService.updateUser(req.params.id!, req.body);
        res.status(200).json(updateUserResult);
    } catch (err:any) {
        next(err);
    }
}

export const removeUserById = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const deletedUserResult = await userService.deleteUserById(req.params.id!)
        res.status(200).json(deletedUserResult);
    } catch (err:any) {
        next(err);
    }
}