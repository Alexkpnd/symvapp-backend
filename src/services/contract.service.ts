import Contract, { IContract } from '../models/contract.model';
import { EmptyListError } from '../errors/emptyListError';
import { AlreadyExistsError } from '../errors/alreadyExistsError';
import { ContractNotFoundError } from '../errors/contractNoFoundError';


export const findAllContracts = async() => {
    const result = await Contract.find().populate({path:'createdBy', select:'username -_id'}).lean();
    if (result.length === 0) {
        throw new EmptyListError("No contracts in database", 404)
    }

    return result;
}

export const findContractById = async(id: string) => {
    const result = await Contract.findOne({_id:id}).lean();
    if (!result) {
        throw new ContractNotFoundError("Contract requested, not found", 404);
    }

    return result;
}

export const createContract = async(payload: IContract, userId: string) =>{
    
       let fixedConNum = payload.contractNum?.trim();
    
    const existedCon = await Contract.findOne({contractNum : fixedConNum})
        if (existedCon && existedCon.contractNum === fixedConNum) {
            throw new AlreadyExistsError("Contract number already exists", 409)
        }
   
    const contract = new Contract({...payload, contractNum:fixedConNum, createdBy:userId});
    return contract.save()

}

export const updateContractById = async(id:string, payload: Partial<IContract>) => {
    const contractFoundResult = await Contract.findByIdAndUpdate(id, payload)
    if (!contractFoundResult) {
        throw new ContractNotFoundError("No contract with this id found", 404);
    }

    return contractFoundResult;
}

export const deleteContractById = async(id: string) => {
    const result = await Contract.findByIdAndDelete(id);
    if (!result) {
         throw new ContractNotFoundError("No contract with this id found", 404);
    }

    return result;
}