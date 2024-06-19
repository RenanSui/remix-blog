import { PostService } from '@/lib/actions/post'
import { Post } from '@/types'
import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query'
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

export function usePostByUserId(userId = '', skip = 0, take = 7) {
  const [serverURL] = useSeverURLAtom()

  return useInfiniteQuery({
    queryKey: [`post-by-userId-${userId}`],
    queryFn: async ({ pageParam }) => {
      const postService = new PostService(serverURL)
      const posts = await postService.getByUserId(userId, pageParam, take)
      return { ...posts, pageParam: posts.hasNextPage ? posts.skip : null }
    },
    placeholderData: keepPreviousData,
    initialPageParam: skip,
    getNextPageParam: (lastPage) => {
      return lastPage.pageParam
    },
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
