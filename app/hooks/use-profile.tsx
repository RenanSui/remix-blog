import { profile } from '@/lib/actions/profile'
import { useQuery } from '@tanstack/react-query'

export const useProfileByUserId = (userId: string | null) => {
  return useQuery({
    queryKey: [`use-profile-by-userid-${userId}`],
    queryFn: async () => (userId ? await profile.getByUserId(userId) : null),
    gcTime: Infinity,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  })
}