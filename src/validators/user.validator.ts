import { z } from 'zod';

export const addressSchema = z.object({
    street: z.string().optional(),
    streeNum: z.string().optional(),
    postCode: z.string().optional(),
    city: z.string().optional(),
    country: z.string().optional()
})

export const phoneSchema = z.object({
    type: z.string().optional(),
    phoneNum: z.string().optional()
})

export const createUserSchema = z.object({
    email: z.string().email(),
    password: z.string().regex(/(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)(?=.*?[\W_])^.{8,}$/),
    username: z.string().min(3),
    firstname: z.string().optional(),
    lastname: z.string().optional(),
    role: z.literal(["EDITOR", "ADMIN"]).optional(),
    address: addressSchema.optional(),
    phone: z.array(phoneSchema).optional()
}).strict();

export const updateUserSchema = createUserSchema.partial().strict();