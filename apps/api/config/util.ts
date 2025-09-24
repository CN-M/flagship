import jwt from "jsonwebtoken";
import { env } from "./env";

const { SECRET, REFRESH_SECRET } = env;

type User = {
	id: string;
	name: string;
};

export const generateAccessToken = (user: User) => {
	return jwt.sign(user, SECRET, { expiresIn: "1h" });
};

export const generateRefreshToken = (user: User) => {
	return jwt.sign(user, REFRESH_SECRET, { expiresIn: "15d" });
};
