import { Request, Response,NextFunction } from "express";
import { EmptyListError } from "../errors/emptyListError";
import { UserNotFoundError } from "../errors/userNotFoundError";
import { AlreadyExistsError } from "../errors/alreadyExistsError";


export const errorHandler = (err:any, _req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof EmptyListError) {
        console.error(err);
        return res.status(err.statusCode).json({message: err.message})
    }

    if (err instanceof UserNotFoundError) {
        console.error(err);
        return res.status(err.statusCode).json({message:err.message})
    }


    if (err instanceof AlreadyExistsError) {
        console.error(err);
        return res.status(err.statusCode).json({message:err.message});
    }


    
    console.error(err); // programming / unknown error
    return res.status(500).json({message: 'Internal Server Error'})
}