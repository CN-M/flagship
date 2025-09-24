import { makeServerEnv } from "@flagship/env";
import { apiSchema } from "@flagship/schemas";

export const env = makeServerEnv(apiSchema);
