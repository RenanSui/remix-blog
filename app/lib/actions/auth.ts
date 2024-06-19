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

export class AuthService {
  serverURL: string | undefined

  constructor(serverURL: string | undefined) {
    this.serverURL = serverURL
  }

  async signIn(formData: Inputs) {
    const response = await fetch(`${this.serverURL}/api/auth/login`, {
      ...postFetchConfig,
      body: JSON.stringify({ ...formData }),
    })
    return (await response.json()) as HTTPResponse<Auth, AuthStatusCode>
  }

  async signUp(formData: Inputs) {
    const response = await fetch(`${this.serverURL}/api/auth/register`, {
      ...postFetchConfig,
      body: JSON.stringify({ ...formData }),
    })
    return (await response.json()) as HTTPResponse<Auth, AuthStatusCode>
  }

  async signOut() {
    await fetch(`${this.serverURL}/api/auth/logout`, {
      credentials: 'include',
    })
  }
}
