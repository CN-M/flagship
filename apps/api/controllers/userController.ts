import type { userLoginSchema, userRegisterSchema } from "@flagship/schemas";
import argon2 from "argon2";
import type { Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import type * as z from "zod";
import { db, eq, users } from "../config/db";
import { env } from "../config/env";
import { generateAccessToken, generateRefreshToken } from "../config/util";
import type { TypedRequest } from "./types";

type UserLogin = z.infer<typeof userLoginSchema>;
type UserRegister = z.infer<typeof userRegisterSchema>;

const { REFRESH_SECRET, NODE_ENV, AUTH_SECRET } = env;

export const registerUser = async (
	req: TypedRequest<UserRegister>,
	res: Response,
) => {
	try {
		const { email, name, password } = req.body;

		if (!email || !name || !password) {
			return res.status(400).json({ error: "Please fill in all fields" });
		}

		const [user] = await db
			.select({ id: users.id, email: users.email })
			.from(users)
			.where(eq(users.email, email));

		if (user) {
			return res.status(400).json({ error: "User already exists" });
		}

		const hashedPassword = await argon2.hash(password, {
			secret: Buffer.from(AUTH_SECRET),
		});

		const [newUser] = await db
			.insert(users)
			.values({
				email,
				name,
				password: hashedPassword,
			})
			.returning({
				id: users.id,
				name: users.name,
			});

		if (newUser) {
			const { id, name } = newUser;

			const accessToken = generateAccessToken({
				id,
				name,
			});

			const refreshToken = generateRefreshToken({
				id,
				name,
			});

			res
				.cookie("refreshToken", refreshToken, {
					httpOnly: true,
					secure: NODE_ENV === "production",
					sameSite: NODE_ENV === "production" ? "strict" : "lax",
					maxAge: 15 * 24 * 60 * 60 * 1000, // 15 Days
				})
				.header("authorization", accessToken);

			return res.status(201).json({
				id,
				name,
				accessToken,
			});
		} else {
			return res.status(400).json({ error: "Invalid user data" });
		}
	} catch (err) {
		console.error("Error creating user:", err);
		return res.status(500).json({ error: "Internal server error" });
	}
};

export const loginUser = async (
	req: TypedRequest<UserLogin>,
	res: Response,
) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({ error: "Please fill in all fields" });
		}

		const [user] = await db
			.select({
				id: users.id,
				name: users.name,
				password: users.password,
			})
			.from(users)
			.where(eq(users.email, email));

		if (!user) {
			return res.status(400).json({ error: "Invalid credentials" });
		}

		const verifyPassword = await argon2.verify(user.password, password);
		if (!verifyPassword) {
			return res.status(400).json({ error: "Invalid credentials" });
		}

		const { id, name } = user;

		const accessToken = generateAccessToken({
			id,
			name,
		});

		const refreshToken = generateRefreshToken({
			id,
			name,
		});

		res
			.cookie("refreshToken", refreshToken, {
				httpOnly: true,
				secure: NODE_ENV === "production",
				sameSite: NODE_ENV === "production" ? "strict" : "lax",
				maxAge: 15 * 24 * 60 * 60 * 1000, // 15 Days
			})
			.header("authorization", accessToken);

		return res.status(201).json({
			id,
			name,
			accessToken,
		});
	} catch (err) {
		console.error("Error logging in user:", err);
		return res.status(500).json({ error: "Internal server error" });
	}
};

export const logoutUser = async (req: Request, res: Response) => {
	try {
		console.log("logout console:", req.cookies.refreshToken);
		res.clearCookie("refreshToken");
		return res.status(200).json({ message: "User successfully logged out" });
	} catch (err) {
		console.error("Error logging out user:", err);
		return res.status(500).json({ error: "Internal server error" });
	}
};

export const refreshUser = async (req: Request, res: Response) => {
	const refreshToken = req.cookies.refreshToken;

	if (!refreshToken) {
		return res.status(401).json({ error: "Not authorised, no refresh token!" });
	}

	try {
		const { id } = jwt.verify(refreshToken, REFRESH_SECRET) as JwtPayload;

		const [user] = await db
			.select({ id: users.id, name: users.name })
			.from(users)
			.where(eq(users.id, id))
			.limit(1);

		if (!user) {
			return res.status(400).json({ error: "User not found" });
		}

		const newAccessToken = generateAccessToken(user);

		console.log("New User successfully refreshed");

		res.header("authorization", newAccessToken);

		req.user = user;
	} catch (err) {
		console.error("Error:", err);
		return res.status(401).json({ error: "Invalid refresh token" });
	}
};

export const updateUser = async (req: Request, res: Response) => {
	try {
		const { name } = req.body;

		if (!req.user) {
			return res
				.status(400)
				.json({ error: "Not authoriized, please login or register" });
		}

		const { id } = req.user;

		const updatedUser = await db
			.update(users)
			.set({ name })
			.where(eq(users.id, id))
			.returning({ id: users.id, name: users.name });

		res.status(200).json(updatedUser);
	} catch (err) {
		console.error("Error updating user data:", err);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const deleteUser = async (req: Request, res: Response) => {
	if (!req.user) {
		return res
			.status(400)
			.json({ error: "Not authoriized, please login or register" });
	}

	const { id } = req.user;

	try {
		const deletedUser = await db
			.delete(users)
			.where(eq(users.id, id))
			.returning({ id: users.id, name: users.id });

		res.status(200).json({ message: "User deleted", user: deletedUser });
	} catch (err) {
		console.error("Error deleting task:", err);
		res.status(500).json({ error: "Internal server error." });
	}
};
