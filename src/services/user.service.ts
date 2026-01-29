import User, {IUser} from '../models/user.model';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { EmptyListError } from '../errors/emptyListError';
import { UserNotFoundError } from '../errors/userNotFoundError';
import { AlreadyExistsError } from '../errors/alreadyExistsError';
import { NoPriviligesError } from '../errors/priviligesError';

dotenv.config();

const SALT = parseInt(process.env.SALT_ROUNDS!);


export const findAllUsers = async() => {
    const result = await User.find().lean();
    if (result.length === 0) {
        throw new EmptyListError("No users in database", 404)
    }
    return result;
}

export const findUserById = async(id: string) => {
    const result = await User.findOne({_id:id}).lean();
    if (!result) {
        throw new UserNotFoundError("User with this id not found", 404);
    }

    return result;
}

// Admin Role User Creation
export const createUser = async(payload: IUser ) => {
    if (payload.password) {
        const hashed = await bcrypt.hash(payload.password, SALT);
        payload.password = hashed;
    }
    if (payload.email) {
        const existedEmail = await User.findOne({email: payload.email})
        if (existedEmail) {
            throw new AlreadyExistsError("User with this email already exists.", 409)
        }
    } 

    if (payload.username) {
        const existedUsername = await User.findOne({username: payload.username})
        if (existedUsername) {
            throw new AlreadyExistsError("User with this username already exists", 409)
        }
    }
    
    const user = new User(payload)
    return user.save();
}


export const updateUser = async(id: string, payload: Partial<IUser>) => {
    if (payload.password) {
        const hashed = await bcrypt.hash(payload.password, SALT);
        payload.password = hashed;
    }
    const updatedUser = User.findByIdAndUpdate(id, payload, {new:true});
    return updatedUser
}

export const deleteUserById = async (id:string) => {
    const checkAdminRole = await User.findOne({_id:id})
    if (checkAdminRole?.role === 'ADMIN') {
        throw new NoPriviligesError("User deletion forbidden",403)
    }
    return  User.findByIdAndDelete(checkAdminRole?._id);
}