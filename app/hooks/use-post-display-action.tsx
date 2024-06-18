import { atom, useAtom } from 'jotai'

const configAtom = atom<'post' | 'add' | 'update'>('post')

export function usePostDisplayAction() {
  return useAtom(configAtom)
}
