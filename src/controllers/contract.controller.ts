import { Request, Response, NextFunction } from "express";
import * as contractService from '../services/contract.service';


export const findAllContracts = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const allContractsResult = await contractService.findAllContracts();
        res.status(200).json(allContractsResult);
    } catch (err:any) {
        next(err);
    }
}


export const createNewContract = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const newContractResult = await contractService.createContract(req.body, req.user.id);
        res.status(201).json(newContractResult);
    } catch (err) {
        next(err)
    }
}