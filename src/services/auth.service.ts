import User, { IUser } from "../models/user.model";
import bcrypt from 'bcrypt';
import { AuthPayload } from "../models/auth.model";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import { UserNotFoundError } from "../errors/userNotFoundError";
import { InvalidCredentialsError } from "../errors/invalidCredetialsError";
import { AlreadyExistsError } from "../errors/alreadyExistsError";
import { RequiredFieldError } from "../errors/requiredFieldError";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || '';
const SALT = parseInt(process.env.SALT_ROUNDS!);


export const login = async (email:string, password:string) => {
    const user = await User.findOne({email:email});
    if (!user) {
        throw new UserNotFoundError("User with this email does not exist", 404);
    }

    const match = await bcrypt.compare(password, user.password);
    if(!match) throw new InvalidCredentialsError("Invalid Credentials", 401);

    const payload: AuthPayload = {
        id: user._id,
        email: user.email,
        username: user.username,
        role: user.role

    }
    const token = jwt.sign(payload as any, JWT_SECRET, {expiresIn: "1h"})
    //console.log(token);
    return {user,token}
}


export const register = async(payload: Partial<IUser>) => {
   
    if (!payload.email || !payload.username || !payload.password){
        throw new RequiredFieldError("This is a required field.", 401)
    }

    const hashed = await bcrypt.hash(payload.password, SALT);
    payload.password = hashed;

    const existedEmail = await User.findOne({email: payload.email})
    if (existedEmail) {
        throw new AlreadyExistsError("User with this email already exists.", 409)
    }
    
    const existedUsername = await User.findOne({username: payload.username})
    if (existedUsername) {
            throw new AlreadyExistsError("User with this username already exists", 409)
        }

    const user = new User({
        ...payload,
        role:"EDITOR"
        }
    )
    return user.save();
} 