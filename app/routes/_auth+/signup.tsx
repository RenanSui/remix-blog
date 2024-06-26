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
import { accessTokenCookie } from '@/cookies.server'
import { AuthService } from '@/lib/actions/auth'
import { ProfileService } from '@/lib/actions/profile'
import { authSchema } from '@/lib/validations/auth'
import { Link } from '@remix-run/react'
import {
  ActionFunctionArgs,
  redirect,
  type LoaderFunctionArgs,
  type MetaFunction,
} from '@vercel/remix'

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()
  const parsed = authSchema.safeParse(formData)
  const authService = new AuthService(process.env.SERVER_URL)

  if (!parsed.success || !parsed.data) {
    return redirect('/signup')
  }

  const { data } = await authService.signUp(parsed.data)

  if (!data?.accessToken) {
    return redirect('/signup')
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
