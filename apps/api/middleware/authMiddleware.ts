import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload, TokenExpiredError } from "jsonwebtoken";
import { db, eq, tenants } from "../config/db";
import { env } from "../config/env";
import { generateAccessToken } from "../config/util";

const { SECRET, REFRESH_SECRET } = env;

declare global {
	namespace Express {
		// interface User {
		// 	id: number;
		// 	email: string;
		// 	firstName: string;
		// 	lastName: string;
		// }

		interface Tenant {
			id: string;
			name: string;
		}

		interface Request {
			// user?: User;
			tenant?: Tenant;
		}
	}
}

export const protect = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const accessToken = req.headers.authorization?.startsWith("Bearer")
		? req.headers.authorization.split(" ")[1]
		: null;

	const refreshToken = req.cookies.refreshToken
		? req.cookies.refreshToken
		: null;

	if (!accessToken || !refreshToken) {
		return res.status(401).json({ error: "Not authorized, no tokens" });
	}

	try {
		const { id } = jwt.verify(accessToken, SECRET) as JwtPayload;

		const [tenant] = await db
			.select({ id: tenants.id, name: tenants.name })
			.from(tenants)
			.where(eq(tenants.id, id));

		if (!tenant) {
			return res.status(400).json({ error: "Tenant not found" });
		}

		req.tenant = tenant;
		next();
	} catch (err) {
		if (err instanceof TokenExpiredError) {
			try {
				const { id } = jwt.verify(refreshToken, REFRESH_SECRET) as JwtPayload;

				const [tenant] = await db
					.select()
					.from(tenants)
					.where(eq(tenants.id, id));

				if (!tenant) {
					return res.status(400).json({ error: "Tenant not found" });
				}

				const newAccessToken = generateAccessToken(tenant);
				console.log("New Access Token Generated");

				res.header("authorization", newAccessToken);
				req.tenant = tenant;
				next();
			} catch (err) {
				console.error("Error:", err);
				return res.status(401).json({ error: "Invalid refresh token" });
			}
		} else {
			console.error("Error:", err);
			return res.status(401).json({ error: "Not authorized" });
		}
	}
};
