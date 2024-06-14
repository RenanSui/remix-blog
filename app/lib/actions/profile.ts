import type { HTTPResponse, Profile } from '@/types'
import type { AuthStatusCode } from '../errors/handle-auth-error'

export const profile = {
  getMe: async (accessToken: string) => {
    const response = await fetch('http://localhost:8000/api/profile/me', {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${accessToken}`,
      },
    })
    const { data } = (await response.json()) as HTTPResponse<
      Profile,
      AuthStatusCode
    >
    return data
  },

  getByUsername: async (id: string) => {
    const URL = `http://localhost:8000/api/profile/username/${id}`
    const response = await fetch(URL, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const { data } = (await response.json()) as HTTPResponse<
      Profile,
      AuthStatusCode
    >
    return data
  },
}
