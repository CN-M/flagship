import jwt from "jsonwebtoken";
import { env } from "./env";

const { SECRET, REFRESH_SECRET } = env;

type Tenant = {
	id: string;
	name: string;
};

export const generateAccessToken = (tenant: Tenant) => {
	return jwt.sign(tenant, SECRET, { expiresIn: "1h" });
};

export const generateRefreshToken = (tenant: Tenant) => {
	return jwt.sign(tenant, REFRESH_SECRET, { expiresIn: "15d" });
};
