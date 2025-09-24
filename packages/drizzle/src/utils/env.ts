import { makeServerEnv } from "@flagship/env";
import { dbSchema } from "@flagship/schemas";

export const env = makeServerEnv(dbSchema);
