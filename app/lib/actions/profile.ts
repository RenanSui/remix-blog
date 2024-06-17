import type { HTTPResponse, Profile } from '@/types'
import type { AuthStatusCode } from '../errors/handle-auth-error'
import { UpdateProfileSchema } from '../validations/profile'

export const profileService = {
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
    return (await response.json()) as HTTPResponse<Profile, AuthStatusCode>
  },

  getByUserId: async (userId: string) => {
    const URL = `http://localhost:8000/api/profile/id/${userId}`
    const response = await fetch(URL, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return (await response.json()) as HTTPResponse<Profile, AuthStatusCode>
  },

  update: async (
    formData: UpdateProfileSchema & { id?: string; userId?: string },
    accessToken: string,
  ) => {
    const response = await fetch('http://localhost:8000/api/profile/update', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ ...formData }),
    })
    const { data } = (await response.json()) as HTTPResponse<
      Profile,
      AuthStatusCode
    >
    return data
  },
}
