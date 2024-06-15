import { atom, useAtom } from 'jotai'

type Config = string | null

export const accessTokenAtom = atom<Config>(null)

export function useAccessToken() {
  return useAtom(accessTokenAtom)
}
