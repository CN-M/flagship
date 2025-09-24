import { relations } from "drizzle-orm";
import {
	boolean,
	index,
	pgTable,
	text,
	timestamp,
	uuid,
} from "drizzle-orm/pg-core";

/* -------------------------------
   USERS
-------------------------------- */
export const users = pgTable("users", {
	id: uuid().defaultRandom().primaryKey(),
	email: text("email").notNull().unique(),
	passwordHash: text("password_hash").notNull(), // if handling auth directly
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/* -------------------------------
   TENANTS (Organizations)
-------------------------------- */
export const tenants = pgTable("tenants", {
	id: uuid().defaultRandom().primaryKey(),
	name: text("name").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/* -------------------------------
   USER ↔ TENANT (Memberships)
-------------------------------- */
export const userTenants = pgTable("user_tenants", {
	id: uuid().defaultRandom().primaryKey(),
	userId: uuid("user_id").notNull(),
	tenantId: uuid("tenant_id").notNull(),
	role: text("role").default("member").notNull(), // 'owner', 'admin', 'member'
	createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const userTenantsRelations = relations(userTenants, ({ one }) => ({
	user: one(users, {
		fields: [userTenants.userId],
		references: [users.id],
	}),
	tenant: one(tenants, {
		fields: [userTenants.tenantId],
		references: [tenants.id],
	}),
}));

/* -------------------------------
   API KEYS
-------------------------------- */
export const apiKeys = pgTable("api_keys", {
	id: uuid().defaultRandom().primaryKey(),
	tenantId: uuid("tenant_id").notNull(),
	key: text("key").notNull().unique(),
	label: text("label"), // e.g., "staging", "production"
	createdBy: uuid("created_by"), // user who created the key
	createdAt: timestamp("created_at").defaultNow().notNull(),
	revokedAt: timestamp("revoked_at"),
});

export const apiKeysRelations = relations(apiKeys, ({ one }) => ({
	tenant: one(tenants, {
		fields: [apiKeys.tenantId],
		references: [tenants.id],
	}),
	creator: one(users, {
		fields: [apiKeys.createdBy],
		references: [users.id],
	}),
}));

/* -------------------------------
   FLAGS
-------------------------------- */
export const flags = pgTable(
	"flags",
	{
		id: uuid().defaultRandom().primaryKey(),
		key: text("key").notNull(),
		name: text("name").notNull(),
		description: text("description"),
		enabled: boolean("enabled").default(false).notNull(),
		tenantId: uuid("tenant_id").notNull(),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at").defaultNow().notNull(),
	},
	(table) => ({
		keyTenantIndex: index("flags_key_tenant_idx").on(table.key, table.tenantId),
	}),
);

export const flagsRelations = relations(flags, ({ one }) => ({
	tenant: one(tenants, {
		fields: [flags.tenantId],
		references: [tenants.id],
	}),
}));

/* -------------------------------
   AUDIT LOGS (Optional but useful)
-------------------------------- */
export const flagAuditLogs = pgTable("flag_audit_logs", {
	id: uuid().defaultRandom().primaryKey(),
	flagId: uuid("flag_id").notNull(),
	userId: uuid("user_id"),
	action: text("action").notNull(), // e.g. 'enabled', 'disabled', 'created'
	createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const flagAuditLogsRelations = relations(flagAuditLogs, ({ one }) => ({
	flag: one(flags, {
		fields: [flagAuditLogs.flagId],
		references: [flags.id],
	}),
	user: one(users, {
		fields: [flagAuditLogs.userId],
		references: [users.id],
	}),
}));
