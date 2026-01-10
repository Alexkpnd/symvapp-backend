import { Schema, model, Document, Types } from "mongoose";

export interface IContract extends Document {
    contractNum? : number;
    contractSeller? : string;
    contractBuyer? : string;
    contractPrice? : string;
    propertyArea? : string;
    createdBy : Types.ObjectId,
    isSigned? : boolean;
}



const ContractSchema = new Schema<IContract> ({
    contractNum : {type: Number},
    contractSeller : {type: String},
    contractBuyer : {type: String},
    contractPrice : {type: String},
    propertyArea : {type: String},
    createdBy : {type: Schema.Types.ObjectId, ref: "User", required: true},
    isSigned : {type: Boolean, default: false}
},
{
    collection: "contracts",
    timestamps: true
})


export default model("Contract", ContractSchema);