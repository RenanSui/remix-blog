import { atom, useAtom } from 'jotai'

export const serverUrlAtom = atom<string | undefined>(undefined)

export function useSeverUrlAtom() {
  return useAtom(serverUrlAtom)
}
