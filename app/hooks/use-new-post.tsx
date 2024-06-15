import { atom, useAtom } from 'jotai'

const configAtom = atom(true)

export function useNewPost() {
  return useAtom(configAtom)
}
