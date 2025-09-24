import { drizzle } from "drizzle-orm/node-postgres";

export {
	apiKeys,
	apiKeysRelations,
	flagAuditLogs,
	flagAuditLogsRelations,
	flags,
	flagsRelations,
	tenants,
	users,
	userTenants,
	userTenantsRelations,
} from "../schema";

import { env } from "../env";

export { and, eq, InferInsertModel, InferSelectModel } from "drizzle-orm";

export const db = drizzle({
	connection: {
		connectionString: env.DATABASE_URL,
		ssl: true,
	},
});
