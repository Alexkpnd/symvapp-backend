import { Request, Response } from "express";

export const pageNotFound = async( req:Request, res:Response) => {
    console.log("Requested Page Not Found")
    res.status(404).json({message: "404. Page not found"})
}