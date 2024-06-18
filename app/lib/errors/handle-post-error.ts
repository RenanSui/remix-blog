import { StatusCodes } from 'http-status-codes'

export const HTPPErrorMessages = {
  200: 'The request has succeeded.',
  400: 'The information sent is incorrect.',
  401: 'the user must authenticate to use the services.',
  403: 'The user does not have access rights to the content.',
  404: 'Post not found.',
}

export type PostStatusCode = keyof typeof HTPPErrorMessages

export function PostErrorHandler(status?: PostStatusCode) {
  if (!status) return

  if (status === StatusCodes.OK) return

  const message = HTPPErrorMessages[status]
  throw new Error(message)
}
