import type { NextFunction, Request, Response } from "express";
import type * as z from "zod";

export const validateBody = (schema: z.ZodSchema) => {
	return (req: Request, res: Response, next: NextFunction) => {
		const parseResult = schema.safeParse(req.body);

		if (!parseResult.success) {
			return res.status(400).json({
				error: "Invalid request data",
				details: parseResult.error,
			});
		}

		req.body = parseResult.data;
		next();
	};
};
