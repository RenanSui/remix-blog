import { ProfileService } from '@/lib/actions/profile'
import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query'
import { useSeverURLAtom } from './use-server-url'

export const useProfileByUserId = (userId: string | null | undefined) => {
  const [serverUrl] = useSeverURLAtom()

  return useQuery({
    queryKey: [`profile-by-userid-${userId}`],
    queryFn: async () => {
      const profileService = new ProfileService(serverUrl)
      return userId ? await profileService.getByUserId(userId) : null
    },
    gcTime: Infinity,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  })
}

export const useProfileAll = (skip = 0, take = 7) => {
  const [serverURL] = useSeverURLAtom()

  return useInfiniteQuery({
    queryKey: [`profile-all`],
    queryFn: async ({ pageParam }) => {
      const profileService = new ProfileService(serverURL)
      const posts = await profileService.getAll(pageParam, take)
      return { ...posts, pageParam: posts.hasNextPage ? posts.skip : null }
    },
    placeholderData: keepPreviousData,
    initialPageParam: skip,
    getNextPageParam: (lastPage) => {
      return lastPage.pageParam
    },
  })
}
