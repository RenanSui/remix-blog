import type { z } from "zod";

export function getParsedErrors(parsed: z.SafeParseReturnType<any, any>) {
  return parsed.error?.errors.map((error) => error.message).join(". ")
}
