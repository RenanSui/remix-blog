import { ProfileSkeleton } from '@/components/loadings/profile-skeleton'
import { useMounted } from '@/hooks/use-mounted'
import { Outlet } from '@remix-run/react'

export default function Layout() {
  const mounted = useMounted()
  return mounted ? <Outlet /> : <ProfileSkeleton />
}
