import { Shell } from '@/components/shell'
import { SignUpForm } from '@/components/signup-form'
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
  return [{ title: 'Blog - Sign up', description: 'Sign up for an account' }]
}

export default function SignUpPage() {
  return (
    <Shell className="max-w-lg">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Sign up</CardTitle>
          <CardDescription>
            Choose your preferred sign up method
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
          <SignUpForm />
        </CardContent>
        <CardFooter>
          <div className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link
              aria-label="Sign in"
              to="/signin"
              className="text-primary underline-offset-4 transition-colors hover:underline"
            >
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </Shell>
  )
}
