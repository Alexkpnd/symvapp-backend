import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { ValidatedObjIdError } from "../errors/valObjectIdError";

export const validateObjId = (params='id') => (req: Request, res: Response, next:NextFunction) => {
    const validatedId = req.params[params]
    if (!validatedId || !mongoose.Types.ObjectId.isValid(validatedId)) {
        throw new ValidatedObjIdError("Error validating Id", 400)
    };
    next();
};