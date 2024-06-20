import type { HTTPResponse, Profile } from '@/types'
import { ProfileStatusCode } from '../errors/handle-profile-error'
import { UpdateProfileSchema } from '../validations/profile'

type UpdateData<T> = Pick<Profile, 'id' | 'userId'> & T

export class ProfileService {
  serverURL: string | undefined

  constructor(serverURL: string | undefined) {
    this.serverURL = serverURL
  }

  async getMe(accessToken: string | null | undefined) {
    if (!accessToken) return null
    const response = await fetch(`${this.serverURL}/api/profile/me`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${accessToken}`,
      },
    })
    return (await response.json()) as HTTPResponse<Profile, ProfileStatusCode>
  }

  async getAll(skip = 0, take = 7) {
    const URL = `${this.serverURL}/api/profile?skip=${skip}&take=${take}`
    const response = await fetch(URL)
    return (await response.json()) as HTTPResponse<Profile[], ProfileStatusCode>
  }

  async getByUsername(username: string) {
    const URL = `${this.serverURL}/api/profile/username/${username}`
    const response = await fetch(URL, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return (await response.json()) as HTTPResponse<Profile, ProfileStatusCode>
  }

  async getByUserId(userId: string) {
    const URL = `${this.serverURL}/api/profile/id/${userId}`
    const response = await fetch(URL, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return (await response.json()) as HTTPResponse<Profile, ProfileStatusCode>
  }

  async updateProfile(
    { name, userId, id }: UpdateData<Pick<UpdateProfileSchema, 'name'>>,
    accessToken: string,
  ) {
    const response = await fetch(`${this.serverURL}/api/profile/update`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ name, userId, id }),
    })
    return (await response.json()) as HTTPResponse<void, ProfileStatusCode>
  }

  async updateUsername(
    { username, userId, id }: UpdateData<Pick<UpdateProfileSchema, 'username'>>,
    accessToken: string,
  ) {
    const response = await fetch(
      `${this.serverURL}/api/profile/update/username`,
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
  }

  async updateAvatar(
    { image, userId, id }: UpdateData<Pick<UpdateProfileSchema, 'image'>>,
    accessToken: string,
  ) {
    const response = await fetch(
      `${this.serverURL}/api/profile/update/avatar`,
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
  }

  async updateBio(
    { bio, userId, id }: UpdateData<Pick<UpdateProfileSchema, 'bio'>>,
    accessToken: string,
  ) {
    const response = await fetch(`${this.serverURL}/api/profile/update/bio`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ bio, userId, id }),
    })
    return (await response.json()) as HTTPResponse<void, ProfileStatusCode>
  }
}
