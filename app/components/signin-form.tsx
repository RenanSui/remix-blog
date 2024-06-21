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
import { getParsedErrors } from '@/lib/errors/utils'
import { AuthSchema, authSchema } from '@/lib/validations/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSubmit } from '@remix-run/react'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Icons } from './icon'
import { PasswordInput } from './password-input'

export default function SignInForm() {
  const submit = useSubmit()
  const [loading, setLoading] = React.useState(false)

  const form = useForm<AuthSchema>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(formData: AuthSchema) {
    try {
      const parsed = authSchema.safeParse(formData)
      if (!parsed.success) throw new Error(getParsedErrors(parsed))
      submit(formData, { action: '/signin', method: 'POST' })
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
                <Input type="text" placeholder="email@gmail.com" {...field} />
              </FormControl>
              <FormMessage className="dark:text-red-500" />
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
              <FormMessage className="dark:text-red-500" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="mt-2 bg-neutral-900 text-neutral-50 shadow hover:bg-neutral-900/90 dark:bg-neutral-900 dark:text-neutral-50 dark:hover:bg-neutral-900/90"
          disabled={loading}
        >
          {loading && (
            <Icons.spinner
              className="mr-2 size-4 animate-spin text-white"
              aria-hidden="true"
            />
          )}
          Sign in
          <span className="sr-only">Sign in</span>
        </Button>
      </form>
    </Form>
  )
}
