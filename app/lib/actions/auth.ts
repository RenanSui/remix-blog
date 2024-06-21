import type { Auth, HTTPResponse } from '@/types'
import type { AuthStatusCode } from '../errors/handle-auth-error'
import { AuthSchema } from '../validations/auth'

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

  async signIn(formData: AuthSchema) {
    const response = await fetch(`${this.serverURL}/api/auth/login`, {
      ...postFetchConfig,
      body: JSON.stringify({ ...formData }),
    })
    return (await response.json()) as HTTPResponse<Auth, AuthStatusCode>
  }

  async signUp(formData: AuthSchema) {
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
