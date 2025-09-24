import { makeServerEnv } from "@flagship/env";
import { dbSchema } from "@flagship/schemas";
import type * as z from "zod";

export const env = makeServerEnv(dbSchema);
export type Env = z.infer<typeof dbSchema>;
