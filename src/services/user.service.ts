import User, {IUser} from '../models/user.model';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const SALT = parseInt(process.env.SALT_ROUNDS!);


export const findAllUsers = async() => {
    const result = await User.find();
    return result;
};

// Admin Role User Creation
export const createUser = async(payload: IUser ) => {
    if (payload.password) {
        const hash = await bcrypt.hash(payload.password, SALT);
        payload.password = hash;
    }

    // if (payload.role) {
    //     payload.role = "EDITOR";
    // }

    const user = new User(payload)
    return user.save();
}
