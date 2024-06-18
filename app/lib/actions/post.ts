import { HTTPResponse, Post } from '@/types'
import type { z } from 'zod'
import { PostStatusCode } from '../errors/handle-post-error'
import { createPostSchema } from '../validations/post'

type Inputs = z.infer<typeof createPostSchema>

const postFetchConfig = {
  method: 'POST',
  credentials: 'include',
  headers: { 'Content-Type': 'application/json' },
} satisfies RequestInit

export const postService = {
  create: async (formData: Inputs, accessToken: string) => {
    const response = await fetch('http://localhost:8000/api/post/create', {
      ...postFetchConfig,
      headers: {
        ...postFetchConfig.headers,
        authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ ...formData }),
    })
    return (await response.json()) as HTTPResponse<Post, PostStatusCode>
  },

  getById: async (postId: string) => {
    const response = await fetch(`http://localhost:8000/api/post/id/${postId}`)
    return (await response.json()) as HTTPResponse<Post, PostStatusCode>
  },

  getByUserId: async (userId: string) => {
    const URL = `http://localhost:8000/api/post/user/${userId}`
    const response = await fetch(URL)
    return (await response.json()) as HTTPResponse<Post[], PostStatusCode>
  },

  update: async (formData: Partial<Post>, accessToken: string) => {
    const response = await fetch('http://localhost:8000/api/post/update', {
      ...postFetchConfig,
      headers: {
        ...postFetchConfig.headers,
        authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ ...formData }),
    })
    return (await response.json()) as HTTPResponse<Post, PostStatusCode>
  },
}
