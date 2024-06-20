import { SettingsSkeleton } from '@/components/loadings/settings-skeleton'
import { useMounted } from '@/hooks/use-mounted'
import { Outlet } from '@remix-run/react'

export default function Layout() {
  const mounted = useMounted()
  return mounted ? <Outlet /> : <SettingsSkeleton />
}
