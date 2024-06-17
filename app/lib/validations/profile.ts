import * as z from 'zod'

export const updateProfileSchema = z.object({
  name: z
    .string()
    .min(2)
    .transform((value) => value.trim()),
  username: z
    .string()
    .min(2)
    .transform((value) => value.replace(/\s+/g, '').trim()),
  image: z.string().optional(),
  bio: z.string().optional(),
})

export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>
