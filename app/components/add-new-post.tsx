import { usePostAtom } from '@/hooks/post'
import { useAccessToken } from '@/hooks/use-access-token'
import { usePostDisplayAction } from '@/hooks/use-post-display-action'
import { postService } from '@/lib/actions/post'
import { cn } from '@/lib/utils'
import { CreatePostSchema, createPostSchema } from '@/lib/validations/post'
import { zodResolver } from '@hookform/resolvers/zod'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { Button } from './ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Textarea } from './ui/textarea'
import { PostErrorHandler } from '@/lib/errors/handle-post-error'
import { toast } from 'sonner'
import { getParsedErrors } from '@/lib/errors/utils'

type AddNewPostProps = Omit<React.ComponentPropsWithRef<'form'>, 'onSubmit'>

export function AddNewPost({ className, ...props }: AddNewPostProps) {
  const [, setPost] = usePostAtom()
  const [, setAction] = usePostDisplayAction()
  const [accessToken] = useAccessToken()

  const form = useForm<CreatePostSchema>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      body: '',
    },
  })

  const processForm = async (formData: CreatePostSchema) => {
    if (!accessToken) {
      return
    }

    try {
      const parsed = createPostSchema.safeParse(formData)
      if (!parsed.success) throw new Error(getParsedErrors(parsed))

      const { data, status } = await postService.create(formData, accessToken)

      PostErrorHandler(status)

      toast.success('Post created.')
      setPost({ selected: data ? data.id : null })
    } catch (err) {
      const error = err as { message: string }
      toast.error(error.message)
    } finally {
      setAction('post')
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(processForm)}
        className={cn('space-y-8', className)}
        {...props}
      >
        <p className="text-2xl">Add new post</p>
        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Post Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div
          className={cn(
            'space-x-2',
            form.formState.isLoading ? 'pointer-events-none opacity-60' : null,
          )}
        >
          <Button size="sm" type="submit">
            Submit
          </Button>
          <Button
            variant="ghost"
            type="button"
            onClick={() => {
              setPost({ selected: null })
              setAction('post')
            }}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  )
}
