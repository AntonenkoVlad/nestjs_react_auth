import * as z from 'zod';

export const emailSchema = z.object({
  email: z.string().email(),
});

export const passwordSchema = z.object({
  password: z.string().min(6).max(12),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(12),
});

export const signUpSchema = loginSchema.extend({
  username: z.string().min(2),
});

export type ILogin = z.infer<typeof loginSchema>;
export type ISignUp = z.infer<typeof signUpSchema>;
export type IEmailSchema = z.infer<typeof emailSchema>;
export type IPasswordSchema = z.infer<typeof passwordSchema>;
