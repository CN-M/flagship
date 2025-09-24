import * as z from "zod";

export const userRegisterSchema = z.object({
	email: z.email().min(1),
	name: z.string().min(1),
	password: z.string().min(6),
});

export const userLoginSchema = z.object({
	email: z.email().min(1),
	password: z.string().min(6),
});
