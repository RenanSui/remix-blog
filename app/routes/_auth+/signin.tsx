import { Shell } from '@/components/shell'
import SignInForm from '@/components/signin-form'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { profileService } from '@/lib/actions/profile'
import { getCookie } from '@/lib/utils'
import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node'
import { Link, redirect } from '@remix-run/react'

export async function loader({ request }: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get('Cookie') ?? ''
  const accessToken = getCookie('accessToken', cookieHeader)
  const profile = accessToken ? await profileService.getMe(accessToken) : null
  return profile ? redirect('/signout') : null
}

export const meta: MetaFunction = () => {
  return [{ title: 'Blog - Sign in', description: 'Sign in to your account' }]
}

export default function Login() {
  return (
    <Shell className="max-w-lg">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Sign in</CardTitle>
          <CardDescription>
            Choose your preferred sign in method
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {/* <OAuthSignIn /> */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <SignInForm />
        </CardContent>
        <CardFooter className="flex flex-wrap items-center justify-between gap-2">
          <div className="text-sm text-muted-foreground">
            <span className="mr-1 hidden sm:inline-block">
              Don&apos;t have an account?
            </span>
            <Link
              aria-label="Sign up"
              to="/signup"
              className="text-primary underline-offset-4 transition-colors hover:underline"
            >
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </Shell>
  )
}
