import { Post } from '@/types'
import { atom, useAtom } from 'jotai'

type Config = {
  selected: Post['id'] | null
}

const configAtom = atom<Config>({
  selected: null,
})

export function usePost() {
  return useAtom(configAtom)
}
