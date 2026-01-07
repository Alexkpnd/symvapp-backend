import { Schema, model, Document, Types } from "mongoose";

export interface IContract extends Document {
    contractNum? : number;
    conntractSeller? : string;
    contractBuyer? : string;
    contractPrice? : string;
    propertyArea? : string;
    createdBy : Types.ObjectId,
    isSigned? : boolean;
}



const ContractSchema = new Schema<IContract> ({
    contractNum : {type: Number, unique: true},
    conntractSeller : {type: String},
    contractBuyer : {type: String},
    contractPrice : {type: String},
    propertyArea : {type: String},
    createdBy : {type: Schema.Types.ObjectId, ref: "User", required: true},
    isSigned : {type: Boolean}
},
{
    collection: "contracts",
    timestamps: true
})


export default model("Contract", ContractSchema);