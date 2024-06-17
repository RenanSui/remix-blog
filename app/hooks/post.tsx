import { postService } from '@/lib/actions/post'
import { Post } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { atom, useAtom } from 'jotai'

type Config = {
  selected: Post['id'] | null
}

const configAtom = atom<Config>({
  selected: null,
})

export function usePostAtom() {
  return useAtom(configAtom)
}

export function usePostById(postId: string | null) {
  return useQuery({
    queryKey: [`use-post-by-id-${postId}`],
    queryFn: async () => (postId ? await postService.getById(postId) : null),
    gcTime: Infinity,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  })
}
