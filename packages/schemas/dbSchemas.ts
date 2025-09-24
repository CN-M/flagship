import { z } from "zod";

export const dbSetupSchema = {
	DATABASE_URL: z.url(),
	DATABASE_NAME: z.string().min(1),
	DATABASE_PASSWORD: z.string().min(1),
};

export const dbSchema = {
	DATABASE_URL: z.url(),
};
