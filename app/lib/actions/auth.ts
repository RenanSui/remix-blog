import type { Auth, HTTPResponse } from '@/types'
import type { z } from 'zod'
import type { AuthStatusCode } from '../errors/handle-auth-error'
import type { authSchema } from '../validations/auth'

type Inputs = z.infer<typeof authSchema>

const postFetchConfig = {
  method: 'POST',
  credentials: 'include',
  headers: { 'Content-Type': 'application/json' },
} satisfies RequestInit

export const auth = {
  signIn: async (formData: Inputs) => {
    const response = await fetch('http://localhost:8000/api/auth/login', {
      ...postFetchConfig,
      body: JSON.stringify({ ...formData }),
    })
    return (await response.json()) as HTTPResponse<Auth, AuthStatusCode>
  },

  signUp: async (formData: Inputs) => {
    const response = await fetch('http://localhost:8000/api/auth/register', {
      ...postFetchConfig,
      body: JSON.stringify({ ...formData }),
    })
    return (await response.json()) as HTTPResponse<Auth, AuthStatusCode>
  },

  signOut: async () => {
    await fetch('http://localhost:8000/api/auth/logout', {
      credentials: 'include',
    })
  },
}
