import { drizzle } from "drizzle-orm/node-postgres";

export { flags, tenants } from "../tables";

import { env } from "../env";

export { and, eq } from "drizzle-orm";

export const db = drizzle({
	connection: {
		connectionString: env.DATABASE_URL,
		ssl: true,
	},
});
