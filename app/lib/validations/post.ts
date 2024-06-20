import { z } from 'zod'

export const createPostSchema = z.object({
  body: z.string().min(1, { message: 'Post is required' }),
})

export type CreatePostSchema = z.infer<typeof createPostSchema>

export const searchPostSchema = z.object({
  searchQuery: z.string().min(1, { message: 'Search is required' }),
})

export type SearchPostSchema = z.infer<typeof searchPostSchema>
