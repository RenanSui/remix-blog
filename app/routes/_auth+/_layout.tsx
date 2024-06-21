import { Icons } from '@/components/icon'
import { siteConfig } from '@/config/site'
import { getSidebarCookies } from '@/cookies.server'
import { ProfileService } from '@/lib/actions/profile'
import { getCookie } from '@/lib/utils'
import { Link, Outlet } from '@remix-run/react'
import { LoaderFunctionArgs, json } from '@vercel/remix'

export async function loader({ request }: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get('Cookie') ?? ''

  console.log({ cookieHeader })

  const accessToken = getCookie('accessToken', cookieHeader)

  console.log({ accessToken })

  const serverURL = process.env.SERVER_URL

  console.log({ serverURL })

  const profileService = new ProfileService(serverURL)
  const profile = (await profileService.getMe(accessToken))?.data || null

  console.log({ profile })

  const { sidebarCookies, headers } = await getSidebarCookies(cookieHeader)
  const { collapsed, layout } = sidebarCookies

  return json(
    { collapsed, layout, profile, accessToken, serverURL, cookieHeader },
    { headers },
  )
}

export default function Layout() {
  return (
    <div className="relative grid min-h-screen grid-cols-1 overflow-hidden lg:grid-cols-2">
      <Link
        to="/"
        className="absolute left-8 top-6 z-40 flex items-center text-lg font-bold tracking-tight text-neutral-50/80 transition-colors hover:text-neutral-50 lg:text-neutral-950/80 lg:hover:text-neutral-950 dark:lg:text-neutral-50/80 lg:hover:dark:text-neutral-50"
      >
        {/* eslint-disable-next-line react/jsx-pascal-case */}
        <Icons.logo className="mr-2 size-6" aria-hidden="true" />
        <span>{siteConfig.name}</span>
      </Link>
      <main className="absolute left-1/2 top-1/2 z-30 flex w-full -translate-x-1/2 -translate-y-1/2 items-center lg:static lg:left-0 lg:top-0 lg:flex lg:translate-x-0 lg:translate-y-0">
        <Outlet />
      </main>
      <div className="relative aspect-video size-full">
        <img
          src={siteConfig.unsplash.auth.imageUrl}
          alt="Japanese street with people passing by"
          className="absolute inset-0 object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-black/80 lg:to-black/40" />
        <div className="absolute bottom-4 right-4 z-20 line-clamp-1 rounded-md bg-muted px-3 py-1.5 text-sm text-muted-foreground">
          Photo by{' '}
          <a
            href={siteConfig.unsplash.auth.authorUrl}
            className="underline transition-colors hover:text-foreground"
          >
            {siteConfig.unsplash.auth.author}{' '}
          </a>
          {' on '}
          <a
            href={siteConfig.unsplash.auth.imagePageUrl}
            className="underline transition-colors hover:text-foreground"
          >
            Unsplash
          </a>
        </div>
      </div>
    </div>
  )
}
