'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'

import { PasswordInput } from '@/components/password-input'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { auth } from '@/lib/actions/auth'
import { AuthErrorHandler } from '@/lib/errors/handle-auth-error'
import { getParsedErrors } from '@/lib/errors/utils'
import { authSchema } from '@/lib/validations/auth'
import { useNavigate } from '@remix-run/react'
import { toast } from 'sonner'
import { Icons } from './icon'
import { useAccessToken } from '@/hooks/use-access-token'

type Inputs = z.infer<typeof authSchema>

export function SignUpForm() {
  const [loading, setLoading] = React.useState(false)
  const navigate = useNavigate()
  const [, setAccessToken] = useAccessToken()

  const form = useForm<Inputs>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(formData: Inputs) {
    setLoading(true)
    try {
      const parsed = authSchema.safeParse(formData)
      if (!parsed.success) throw new Error(getParsedErrors(parsed))

      const { status, data } = await auth.signUp(formData)
      AuthErrorHandler(status)

      setAccessToken(data ? data.accessToken : null)
      navigate(`/`)
    } catch (err) {
      const error = err as { message: string }
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="rodneymullen180@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="**********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="mt-2" disabled={loading}>
          {loading && (
            // eslint-disable-next-line react/jsx-pascal-case
            <Icons.spinner
              className="mr-2 size-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Continue
          <span className="sr-only">Continue to email verification page</span>
        </Button>
      </form>
    </Form>
  )
}
