import { PostService } from '@/lib/actions/post'
import { Post } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { atom, useAtom } from 'jotai'
import { useSeverURLAtom } from './use-server-url'

type Config = {
  selected: Post['id'] | null
}

const configAtom = atom<Config>({
  selected: null,
})

export function usePostAtom() {
  return useAtom(configAtom)
}

export function usePostByUserId(userId: string | undefined) {
  const [serverURL] = useSeverURLAtom()

  return useQuery({
    queryKey: [`post-by-userId-${userId}`],
    queryFn: async () => {
      const postService = new PostService(serverURL)
      return userId ? await postService.getByUserId(userId) : null
    },
    gcTime: Infinity,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  })
}

export function usePostById(postId: string | null) {
  const [serverURL] = useSeverURLAtom()

  return useQuery({
    queryKey: [`post-by-id-${postId}`],
    queryFn: async () => {
      const postService = new PostService(serverURL)
      return postId ? await postService.getById(postId) : null
    },
    gcTime: Infinity,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  })
}
