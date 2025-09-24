import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload, TokenExpiredError } from "jsonwebtoken";
import { db, eq, users } from "../config/db";
import { env } from "../config/env";
import { generateAccessToken } from "../config/util";

const { SECRET, REFRESH_SECRET } = env;

declare global {
	namespace Express {
		interface User {
			id: string;
			name: string;
		}

		// interface Tenant {
		// 	id: string;
		// 	name: string;
		// }

		interface Request {
			user?: User;
			// tenant?: Tenant;
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

		const [user] = await db
			.select({ id: users.id, name: users.name, email: users.email })
			.from(users)
			.where(eq(users.id, id));

		if (!user) {
			return res.status(400).json({ error: "User not found" });
		}

		req.user = user;
		next();
	} catch (err) {
		if (err instanceof TokenExpiredError) {
			try {
				const { id } = jwt.verify(refreshToken, REFRESH_SECRET) as JwtPayload;

				const [user] = await db
					.select({ id: users.id, email: users.email, name: users.name })
					.from(users)
					.where(eq(users.id, id));

				if (!user) {
					return res.status(400).json({ error: "User not found" });
				}

				const newAccessToken = generateAccessToken(user);
				console.log("New Access Token Generated");

				res.header("authorization", newAccessToken);
				req.user = user;
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
