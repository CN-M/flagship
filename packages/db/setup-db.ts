import { makeServerEnv } from "@flagship/env";
import { dbSetupSchema } from "@flagship/schemas";
import { Client } from "pg";

const env = makeServerEnv(dbSetupSchema);

async function createDatabaseIfNotExists() {
	const dbName = env.DATABASE_NAME;

	// Connect to postgres database (which always exists)
	const client = new Client({
		host: process.env.DB_HOST || "localhost",
		port: Number(process.env.DB_PORT) || 5432,
		user: process.env.DB_USER || "postgres",
		password: env.DATABASE_PASSWORD,
		database: "postgres",
	});

	try {
		await client.connect();

		// Check if database exists
		const result = await client.query(
			`SELECT 1 FROM pg_database WHERE datname = $1`,
			[dbName],
		);

		if (result.rows.length === 0) {
			// Database doesn't exist, create it
			console.log(`Creating database: ${dbName}`);
			await client.query(`CREATE DATABASE "${dbName}"`);
			console.log(`Database ${dbName} created successfully`);
		} else {
			console.log(`Database ${dbName} already exists`);
		}

		// Creates extension to allow gen_random_uuid()
		await client.query(`CREATE EXTENSION pgcrypto;`);
	} catch (error) {
		console.error("Error creating database:", error);
		process.exit(1);
	} finally {
		await client.end();
	}
}

// Run the function
createDatabaseIfNotExists();
