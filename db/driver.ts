/// <reference lib="deno.unstable" />
import { z } from "https://deno.land/x/zod@v3.21.4/mod.ts";
import { createPentagon } from "https://deno.land/x/pentagon/mod.ts";
const kv = await Deno.openKv();

export const User = z.object({
  id: z.string().uuid().describe("primary"),
  email: z.string().email(),
  session: z.string().optional(),
});

const db = createPentagon(kv, {
  users: {
    schema: User,
  },
});

export default db;