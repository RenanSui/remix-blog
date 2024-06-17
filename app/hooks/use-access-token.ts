import { atom, useAtom } from 'jotai'

export const accessTokenAtom = atom<string | null>(null)

export function useAccessToken() {
  return useAtom(accessTokenAtom)
}
