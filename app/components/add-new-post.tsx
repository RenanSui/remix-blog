import { usePostAtom } from '@/hooks/post'
import { useAccessToken } from '@/hooks/use-access-token'
import { useNewPost } from '@/hooks/use-new-post'
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

type AddNewPostProps = Omit<React.ComponentPropsWithRef<'form'>, 'onSubmit'>

export function AddNewPost({ className, ...props }: AddNewPostProps) {
  const [, setPost] = usePostAtom()
  const [, setNewPost] = useNewPost()
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
      const { data } = await postService.create(formData, accessToken)
      setPost({ selected: data ? data.id : null })
    } catch (error) {
      console.log(error)
    } finally {
      setNewPost(false)
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
              setNewPost(false)
            }}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  )
}
