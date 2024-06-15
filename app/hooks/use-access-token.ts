import { Auth } from '@/types'
import { atom, useAtom } from 'jotai'

type Config = Auth['accessToken'] | null

export const accessTokenAtom = atom<Config>(null)

export function useAccessToken() {
  return useAtom(accessTokenAtom)
}
