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

export const findContractById = async (req:Request, res:Response, next:NextFunction) =>{
    try {
        const contractByIdResult = await contractService.findContractById(req.params.id!);
        return res.status(200).json(contractByIdResult);
    } catch (err:any) {
        next(err)
    }
}


export const createNewContract = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const newContractResult = await contractService.createContract(req.body, req.user.id);
        res.status(201).json(newContractResult);
    } catch (err:any) {
        next(err)
    }
}

export const updateContract = async(req:Request, res:Response, next:NextFunction) => {
    try {
        const updateContractResult = await contractService.updateContractById(req.params.id!, req.body);
        res.status(201).json(updateContractResult);
    } catch (err:any) {
        next(err)
    }
}

export const removeContract = async(req:Request, res:Response, next:NextFunction) => {
    try {
        const removedContractResult = await contractService.deleteContractById(req.params.id!)
        res.status(201).json(removedContractResult);
    } catch (err:any) {
        next(err)
    }
        
}