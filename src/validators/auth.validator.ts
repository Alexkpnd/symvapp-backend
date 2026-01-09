import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string()
})

export const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().regex(/(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)(?=.*?[\W_])^.{8,}$/),
    username: z.string().min(3)
})