import * as z from "zod";

export const registerUserSchema = z.object({
  body: z.object({
    password: z.string().min(1),
    repeatedPassword: z.string().min(1),
    username: z.string().min(1),
    email: z.string().min(1),
  }),
});

export const loginUserSchema = z.object({
  body: z.object({
    password: z.string().min(1),
    username: z.string().min(1),
  }),
});
