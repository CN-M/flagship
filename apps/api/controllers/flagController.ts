import type { createFlagSchema, updateFlagSchema } from "@flagship/schemas";
import type { Request, Response } from "express";
import type * as z from "zod";
import { and, db, eq, flags, userTenants } from "../config/db";

interface TypedRequest<T> extends Request {
	body: T;
}

type UpdateFlagBody = z.infer<typeof updateFlagSchema>;
type CreateFlagBody = z.infer<typeof createFlagSchema>;

// This should require an API key
export const evaluateFlag = async (req: Request, res: Response) => {
	if (!req.user) {
		return res
			.status(400)
			.json({ error: "Not authoriized, please login or register" });
	}

	const { id } = req.user;

	const { id: flagId } = req.params;

	try {
		const [organization] = await db
			.select({ tenantId: userTenants.tenantId })
			.from(userTenants)
			.where(eq(userTenants.userId, id))
			.limit(1);

		if (!organization) {
			return res
				.status(401)
				.json({ error: "Not authoriized, user belongs to no organization" });
		}

		const [flag] = await db
			.select({
				id: flags.id,
				key: flags.key,
				description: flags.description,
				name: flags.name,
				enabled: flags.enabled,
			})
			.from(flags)
			.where(
				and(eq(flags.id, flagId), eq(flags.tenantId, organization.tenantId)),
			)
			.limit(1);

		res.status(200).json(flag);
	} catch (err) {
		console.error("Error fetching flag:", err);
		res.status(500).json({ error: "Internal server error." });
	}
};

export const getTenantFlags = async (req: Request, res: Response) => {
	if (!req.user) {
		return res
			.status(401)
			.json({ error: "Not authoriized, please login or register" });
	}

	const { id } = req.user;

	try {
		const [organization] = await db
			.select({ tenantId: userTenants.tenantId, role: userTenants.role })
			.from(userTenants)
			.where(eq(userTenants.userId, id))
			.limit(1);

		if (!organization) {
			return res
				.status(401)
				.json({ error: "Not authoriized, user belongs to no organization" });
		}

		const tenantFlags = await db
			.select({
				id: flags.id,
				key: flags.key,
				description: flags.description,
				name: flags.name,
				enabled: flags.enabled,
			})
			.from(flags)
			.where(eq(flags.tenantId, organization.tenantId));

		res.status(200).json(tenantFlags);
	} catch (err) {
		console.error("Error fetching flags:", err);
		res.status(500).json({ error: "Internal server error." });
	}
};

export const createFlag = async (
	req: TypedRequest<CreateFlagBody>,
	res: Response,
) => {
	if (!req.user) {
		return res
			.status(400)
			.json({ error: "Not authoriized, please login or register" });
	}

	const { id } = req.user;

	const body = req.body;

	try {
		const [organization] = await db
			.select({ tenantId: userTenants.tenantId, role: userTenants.role })
			.from(userTenants)
			.where(eq(userTenants.userId, id))
			.limit(1);

		if (!organization) {
			return res
				.status(401)
				.json({ error: "Not authoriized, user belongs to no organization" });
		}

		const { role } = organization;

		if (role === "civilian") {
			return res.status(403).json({ error: "Insufficient permissions." });
		}

		const [newFlag] = await db
			.insert(flags)
			.values({ ...body, tenantId: organization.tenantId })
			.returning({
				id: flags.id,
				key: flags.key,
				description: flags.description,
				name: flags.name,
				enabled: flags.enabled,
			});

		res.status(200).json(newFlag);
	} catch (err) {
		console.error("Error creating flag:", err);
		res.status(500).json({ error: "Internal server error." });
	}
};

export const updateFlag = async (
	req: TypedRequest<UpdateFlagBody>,
	res: Response,
) => {
	if (!req.user) {
		return res
			.status(400)
			.json({ error: "Not authoriized, please login or register" });
	}

	const { id } = req.user;
	const { id: flagId } = req.params;

	try {
		const [organization] = await db
			.select({ tenantId: userTenants.tenantId, role: userTenants.role })
			.from(userTenants)
			.where(eq(userTenants.userId, id))
			.limit(1);

		if (!organization) {
			return res
				.status(401)
				.json({ error: "Not authoriized, user belongs to no organization" });
		}

		const { role } = organization;

		if (role === "civilian") {
			return res.status(403).json({ error: "Insufficient permissions." });
		}

		const [flag] = await db
			.select({
				id: flags.id,
				key: flags.key,
				description: flags.description,
				name: flags.name,
				enabled: flags.enabled,
			})
			.from(flags)
			.where(
				and(eq(flags.id, flagId), eq(flags.tenantId, organization.tenantId)),
			)
			.limit(1);

		if (!flag) {
			return res.status(404).json({ error: "Flag not found" });
		}

		const body = req.body;

		const [updatedFlag] = await db
			.update(flags)
			.set({ ...body })
			.where(
				and(eq(flags.id, flagId), eq(flags.tenantId, organization.tenantId)),
			)
			.returning({
				id: flags.id,
				key: flags.key,
				description: flags.description,
				name: flags.name,
				enabled: flags.enabled,
			});

		return res.status(200).json(updatedFlag);
	} catch (err) {
		console.error("Error updating flag:", err);
		res.status(500).json({ error: "Internal server error." });
	}
};

export const deleteFlag = async (req: Request, res: Response) => {
	const { id: flagId } = req.params;

	if (!req.user) {
		return res
			.status(400)
			.json({ error: "Not authoriized, please login or register" });
	}

	const { id } = req.user;

	try {
		const [organization] = await db
			.select({ tenantId: userTenants.tenantId, role: userTenants.role })
			.from(userTenants)
			.where(eq(userTenants.userId, id))
			.limit(1);

		if (!organization) {
			return res
				.status(401)
				.json({ error: "Not authoriized, user belongs to no organization" });
		}

		const { role } = organization;

		if (role === "civilian") {
			return res.status(403).json({ error: "Insufficient permissions." });
		}

		const [deletedFlag] = await db
			.delete(flags)
			.where(
				and(eq(flags.id, flagId), eq(flags.tenantId, organization.tenantId)),
			)
			.returning({
				id: flags.id,
				key: flags.key,
				description: flags.description,
				name: flags.name,
				enabled: flags.enabled,
			});

		if (!deletedFlag) {
			return res.status(404).json({ error: "Flag not found" });
		}

		res.status(200).json({ message: "Flag deleted", flag: deletedFlag });
	} catch (err) {
		console.error("Error deleting flag:", err);
		res.status(500).json({ error: "Internal server error." });
	}
};
