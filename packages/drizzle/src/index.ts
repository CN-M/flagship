import { drizzle } from "drizzle-orm/node-postgres";
import { env } from "./utils/env";

const db = drizzle({
	connection: {
		connectionString: env.DATABASE_URL,
		ssl: true,
	},
});

export default db;
