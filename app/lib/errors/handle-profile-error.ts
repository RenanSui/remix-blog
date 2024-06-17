import { StatusCodes } from 'http-status-codes'

export const HTPPUserErrorMessages = {
  200: 'The request has succeeded.',
  400: 'The server could not understand the request due to invalid syntax.',
  401: 'the user must authenticate to use the services.',
  403: 'The user does not have access rights to the content.',
  409: 'Username already taken.',
}

export type ProfileStatusCode = keyof typeof HTPPUserErrorMessages

export function ProfileErrorHandler(status?: ProfileStatusCode) {
  if (!status) return

  if (status === StatusCodes.OK) return

  const message = HTPPUserErrorMessages[status]
  throw new Error(message)
}
