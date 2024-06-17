import type { HTTPResponse, Profile } from '@/types'
import { ProfileStatusCode } from '../errors/handle-profile-error'
import { UpdateProfileSchema } from '../validations/profile'

type UpdateData<T> = Pick<Profile, 'id' | 'userId'> & T

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
      ProfileStatusCode
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
    return (await response.json()) as HTTPResponse<Profile, ProfileStatusCode>
  },

  getByUserId: async (userId: string) => {
    const URL = `http://localhost:8000/api/profile/id/${userId}`
    const response = await fetch(URL, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return (await response.json()) as HTTPResponse<Profile, ProfileStatusCode>
  },

  updateProfile: async (
    { name, userId, id }: UpdateData<Pick<UpdateProfileSchema, 'name'>>,
    accessToken: string,
  ) => {
    const response = await fetch('http://localhost:8000/api/profile/update', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ name, userId, id }),
    })
    return (await response.json()) as HTTPResponse<void, ProfileStatusCode>
  },

  updateUsername: async (
    { username, userId, id }: UpdateData<Pick<UpdateProfileSchema, 'username'>>,
    accessToken: string,
  ) => {
    const response = await fetch(
      'http://localhost:8000/api/profile/update/username',
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ username, userId, id }),
      },
    )
    return (await response.json()) as HTTPResponse<void, ProfileStatusCode>
  },

  updateAvatar: async (
    { image, userId, id }: UpdateData<Pick<UpdateProfileSchema, 'image'>>,
    accessToken: string,
  ) => {
    const response = await fetch(
      'http://localhost:8000/api/profile/update/avatar',
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ image, userId, id }),
      },
    )
    return (await response.json()) as HTTPResponse<void, ProfileStatusCode>
  },

  updateBio: async (
    { bio, userId, id }: UpdateData<Pick<UpdateProfileSchema, 'bio'>>,
    accessToken: string,
  ) => {
    const response = await fetch(
      'http://localhost:8000/api/profile/update/bio',
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ bio, userId, id }),
      },
    )
    return (await response.json()) as HTTPResponse<void, ProfileStatusCode>
  },
}
