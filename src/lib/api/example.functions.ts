// NOTE: createServerFn (TanStack Start/SSR) has been removed in SPA mode.
// This file is kept as a stub. If you add a real backend, replace these
// with fetch() calls to your API endpoints.

import { z } from "zod";
import { getServerConfig } from "../config.server";

const greetingSchema = z.object({ name: z.string().min(1) });

export async function getGreeting(input: { data: { name: string } }) {
  const validated = greetingSchema.parse(input.data);
  const config = getServerConfig();
  return {
    greeting: `Hello, ${validated.name}!`,
    mode: config.nodeEnv ?? "unknown",
  };
}
