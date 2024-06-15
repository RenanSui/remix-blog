import { StatusCodes } from 'http-status-codes'

export const HTPPErrorMessages = {
  200: 'The request has succeeded.',
  400: 'The information sent is incorrect.',
  401: 'the user must authenticate to use the services.',
  403: 'The user does not have access rights to the content.',
  404: 'User not found.',
  409: 'User already exist.',
}

export type AuthStatusCode = keyof typeof HTPPErrorMessages

export function AuthErrorHandler(status?: AuthStatusCode) {
  if (!status) return

  if (status === StatusCodes.OK) return

  const message = HTPPErrorMessages[status]
  throw new Error(message)
}
