import { z } from 'zod'

export const createPostSchema = z.object({
  body: z.string().min(1, { message: 'Post is required' }),
})

export type CreatePostSchema = z.infer<typeof createPostSchema>
