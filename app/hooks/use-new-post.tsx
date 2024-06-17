import { atom, useAtom } from 'jotai'

const configAtom = atom(false)

export function useNewPost() {
  return useAtom(configAtom)
}
