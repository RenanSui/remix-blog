import type { HTTPResponse, User } from '@/types'
import type { AuthStatusCode } from '../errors/handle-auth-error'

export const user = {
  getMe: async (accessToken: string) => {
    const response = await fetch('http://localhost:8000/api/user/me', {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${accessToken}`,
      },
    })
    const data = (await response.json()) as HTTPResponse<User, AuthStatusCode>
    return data.data
  },
}
