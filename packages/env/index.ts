import { createEnv } from "@t3-oss/env-core";
import type { ZodRawShape, z } from "zod";

export function makeServerEnv<ServerSchema extends ZodRawShape>(
	schema: ServerSchema,
	runtimeEnv = process.env,
) {
	const env = createEnv({
		server: schema,
		runtimeEnv,
		emptyStringAsUndefined: true,
	});

	return env as z.infer<z.ZodObject<ServerSchema>>;
}
