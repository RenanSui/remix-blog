import { atom, useAtom } from 'jotai'

export const serverURLAtom = atom<string | undefined>(undefined)

export function useSeverURLAtom() {
  return useAtom(serverURLAtom)
}
