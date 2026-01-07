import { Request, Response, NextFunction } from "express";
import * as userService from '../services/user.service';


export const getAllUsers = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const AllUsersResult = await userService.findAllUsers();
        res.status(200).json(AllUsersResult)
    } catch (err:any) {
        next(err);
    }
}

export const createUser = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const createUserResult = await userService.createUser(req.body);
        res.status(201).json(createUserResult);
    } catch (err) {
        next(err)
    }
}

export const updateUser = async(req:Request, res:Response, next:NextFunction) => {
    try {
        const updateUserResult = await userService.updateUser(req.params.id!, req.body);
        res.status(201).json(updateUserResult);
    } catch (err) {
        next(err);
    }
}

export const updateUserByEmail = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const updateUserResult = await userService.updateUserByEmail(req.params.email!, req.body);
        res.status(201).json(updateUserResult);
    }catch (err) {
        next(err);
    }
}

export const removeUserById = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const deletedUserResult = await userService.deleteUserById(req.params.id!)
        res.status(201).json(deletedUserResult);
    } catch (err) {
        next(err);
    }
}