import type { z } from 'zod'

export function getParsedErrors(
  parsed: z.SafeParseReturnType<unknown, unknown>,
) {
  return parsed.error?.errors.map((error) => error.message).join('. ')
}
