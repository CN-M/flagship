import { z } from "zod";

export const dbSetupSchema = {
	DATABASE_URL: z.url(),
	DATABASE_NAME: z.string().min(1),
	DATABASE_PASSWORD: z.string().min(1),
};

export const dbSchema = {
	DATABASE_URL: z.url(),
};

enum Environment {
	DEVELOPMENT = "development",
	PRODUCTION = "production",
	TEST = "test",
}

export const apiSchema = {
	// Node Env
	PORT: z.number().min(1000).max(9999),
	NODE_ENV: z.enum([
		Environment.DEVELOPMENT,
		Environment.PRODUCTION,
		Environment.TEST,
	]),

	// Auth Middleware
	SECRET: z.string().min(43),
	REFRESH_SECRET: z.string().min(43),
};

export const updateFlagSchema = z
	.object({
		enabled: z.boolean().optional(),
		name: z.string().min(1, "Name cannot be empty").optional(),
		description: z.string().optional(),
		key: z.string().min(1, "Key cannot be empty").optional(),
	})
	.strict();

export const createFlagSchema = z
	.object({
		enabled: z.boolean().optional(),
		key: z.string().min(1, "Key cannot be empty"),
		name: z.string().min(1, "Name cannot be empty"),
		description: z.string().optional(),
	})
	.strict();
