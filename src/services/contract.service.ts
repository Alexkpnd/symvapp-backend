import Contract, { IContract } from '../models/contract.model';
import { EmptyListError } from '../errors/EmptyListError';
import { AlreadyExistsError } from '../errors/alreadyExistsError';


export const findAllContracts = async() => {
    const result = await Contract.find();
    if (result.length === 0) {
        throw new EmptyListError("No contracts in database", 404)
    }

    return result;
}

export const createContract = async(payload: IContract, userId: string) =>{
    if(payload.contractNum) {
        const existedCon = await Contract.findOne({contractNum : payload.contractNum})
        if (existedCon) {
            throw new AlreadyExistsError("Contract number already exists", 409)
        }
    }
   
    const contract = new Contract({...payload, createdBy:userId});
    return contract.save();

}