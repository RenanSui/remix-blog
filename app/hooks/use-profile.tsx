import { ProfileService } from '@/lib/actions/profile'
import { useQuery } from '@tanstack/react-query'
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
