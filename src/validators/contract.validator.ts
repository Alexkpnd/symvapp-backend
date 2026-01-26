import { z } from "zod";


export const createContractSchema = z.object({
    contractNum: z.string(),
    contractSeller : z.string().optional(),
    contractBuyer : z.string().optional(),
    contractPrice : z.string().optional(),
    propertyArea : z.string().optional(),
    createdBy : z.string().optional(),
    isSigned : z.boolean().optional()
}).strict();

export const updateContractSchema = createContractSchema.partial().strict();