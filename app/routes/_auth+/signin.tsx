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
import { accessTokenCookie } from '@/cookies.server'
import { AuthService } from '@/lib/actions/auth'
import { ProfileService } from '@/lib/actions/profile'
import { authSchema } from '@/lib/validations/auth'
import { Link } from '@remix-run/react'
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from '@vercel/remix'
import { redirect } from '@vercel/remix'

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const parsed = authSchema.safeParse(formData)
  const authService = new AuthService(process.env.SERVER_URL)

  if (!parsed.success || !parsed.data) {
    return redirect('/signin')
  }

  const { data } = await authService.signIn(parsed.data)

  if (!data?.accessToken) {
    return redirect('/signin')
  }

  return redirect('/', {
    headers: {
      'Set-Cookie': await accessTokenCookie.serialize(data.accessToken),
    },
  })
}

export async function loader({ request }: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get('Cookie') ?? ''
  const accessToken: string | null = await accessTokenCookie.parse(cookieHeader)

  const profileService = new ProfileService(process.env.SERVER_URL)
  const profile = (await profileService.getMe(accessToken))?.data || null

  return profile ? redirect('/signout') : null
}

export const meta: MetaFunction = () => {
  return [{ title: 'Blog - Sign in', description: 'Sign in to your account' }]
}

export default function SignInPage() {
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
