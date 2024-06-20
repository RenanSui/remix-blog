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

export class PostService {
  serverURL: string | undefined

  constructor(serverURL: string | undefined) {
    this.serverURL = serverURL
  }

  async create(formData: Inputs, accessToken: string) {
    const response = await fetch(`${this.serverURL}/api/post/create`, {
      ...postFetchConfig,
      headers: {
        ...postFetchConfig.headers,
        authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ ...formData }),
    })
    return (await response.json()) as HTTPResponse<Post, PostStatusCode>
  }

  async getAll(skip = 0, take = 7) {
    const URL = `${this.serverURL}/api/post?skip=${skip}&take=${take}`
    const response = await fetch(URL)
    return (await response.json()) as HTTPResponse<Post[], PostStatusCode>
  }

  async getById(postId: string) {
    const response = await fetch(`${this.serverURL}/api/post/id/${postId}`)
    return (await response.json()) as HTTPResponse<Post, PostStatusCode>
  }

  async getByUserId(userId: string, skip = 0, take = 7) {
    const URL = `${this.serverURL}/api/post/user/${userId}?skip=${skip}&take=${take}`
    const response = await fetch(URL)
    return (await response.json()) as HTTPResponse<Post[], PostStatusCode>
  }

  async update(formData: Partial<Post>, accessToken: string) {
    const response = await fetch(`${this.serverURL}/api/post/update`, {
      ...postFetchConfig,
      headers: {
        ...postFetchConfig.headers,
        authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ ...formData }),
    })
    return (await response.json()) as HTTPResponse<Post, PostStatusCode>
  }

  async delete({ id, authorId }: Post, accessToken: string) {
    const response = await fetch(`${this.serverURL}/api/post/delete`, {
      ...postFetchConfig,
      headers: {
        ...postFetchConfig.headers,
        authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ id, authorId }),
    })
    return (await response.json()) as HTTPResponse<void, PostStatusCode>
  }
}
