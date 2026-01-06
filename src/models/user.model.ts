import { Schema, model, Document } from "mongoose";

export interface IAddress {
    street?: string;
    streetNum?: string;
    postCode?: string;
    city?: string;
    country?: string;
};

export interface IPhone {
    type?: string;
    phoneNum?: string;
}

export interface IUser extends Document {
    email: string;
    password: string;
    firstname?: string;
    lastname?: string;
    role?: string;
    address?: IAddress;
    phone?: IPhone[];
}

const AddressSchema = new Schema<IAddress>({
    street: {type: String},
    streetNum: {type: String},
    postCode: {type: String},
    city: {type: String},
    country: {type: String}
    },
    {
        _id: false
    }
);

const PhoneSchema = new Schema<IPhone>({
        type: {type: String},
        phoneNum: {type: String} 
    },
    {
        _id: false
    }
)


const UserSchema = new Schema<IUser> ({
    email: {type: String, required: [true, "Email is a required field."], unique: true, trim:true, lowercase: true, index:true},
    password: {type: String, required:[true, "Password is a required field."]},
    firstname: {type: String},
    lastname: {type: String},
    role: {type: String, enum: ["ADMIN", "EDITOR"], default:"EDITOR"},
    address: AddressSchema,
    phone: {type: [PhoneSchema]},
    },
    {
    collection: "users",
    timestamps: true
    }
);


export default model("User", UserSchema);