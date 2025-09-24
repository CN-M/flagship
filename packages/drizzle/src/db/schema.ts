import { relations } from "drizzle-orm";
import {
	boolean,
	index,
	pgTable,
	text,
	timestamp,
	uuid,
} from "drizzle-orm/pg-core";

export const tenants = pgTable("tenants", {
	id: uuid().defaultRandom().primaryKey(),
	name: text("name").notNull(),
	apiKey: text("api_key").notNull().unique(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const tenantsRelations = relations(tenants, ({ many }) => ({
	flags: many(flags),
}));

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
		// Index to quickly look up flags by key per tenant
		keyTenantIndex: index("flags_key_tenant_idx").on(table.key, table.tenantId),
	}),
);

// Relations: flags → tenant (many-to-one)
export const flagsRelations = relations(flags, ({ one }) => ({
	tenant: one(tenants, {
		fields: [flags.tenantId],
		references: [tenants.id],
	}),
}));
