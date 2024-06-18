import { atom, useAtom } from 'jotai'

export type DisplayAction = 'post' | 'add' | 'update'

const configAtom = atom<DisplayAction>('post')

export function usePostDisplayAction() {
  return useAtom(configAtom)
}
