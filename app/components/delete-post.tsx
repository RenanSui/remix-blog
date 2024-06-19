'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { usePostAtom } from '@/hooks/post'
import { useAccessToken } from '@/hooks/use-access-token'
import { useMediaQuery } from '@/hooks/use-media-query'
import { usePostDisplayAction } from '@/hooks/use-post-display-action'
import { PostErrorHandler } from '@/lib/errors/handle-post-error'
import { Post } from '@/types'
import { useQueryClient } from '@tanstack/react-query'
import * as React from 'react'
import { toast } from 'sonner'
import { Icons } from './icon'
import { useSeverURLAtom } from '@/hooks/use-server-url'
import { PostService } from '@/lib/actions/post'

interface DeletePostProps
  extends React.ComponentPropsWithoutRef<typeof Dialog> {
  post: Post
}

export function DeletePost({ post, children }: DeletePostProps) {
  const isDesktop = useMediaQuery('(min-width: 640px)')
  const [loading, setLoading] = React.useState(false)
  const [, setAction] = usePostDisplayAction()
  const [accessToken] = useAccessToken()
  const [serverURL] = useSeverURLAtom()
  const queryClient = useQueryClient()
  const [, setPost] = usePostAtom()

  const onDelete = async () => {
    if (!accessToken) return
    if (!post) return

    setLoading(true)
    try {
      const postService = new PostService(serverURL)
      const { status } = await postService.delete(post, accessToken)

      PostErrorHandler(status)

      toast.success('Post deleted.')

      queryClient.invalidateQueries({ queryKey: [`post-by-id-${post.id}`] })
      queryClient.invalidateQueries({
        queryKey: [`post-by-userId-${post.authorId}`],
      })

      setPost({ selected: null })
      setAction('post')
    } catch (err) {
      const error = err as { message: string }
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  if (isDesktop) {
    return (
      <Dialog>
        <DrawerTrigger asChild>
          {children}
          {/* <Button variant="destructive">Delete post</Button> */}
        </DrawerTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Delete post</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              post.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="pt-4">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="button"
              onClick={onDelete}
              disabled={loading}
              variant="destructive"
            >
              {loading && (
                <Icons.spinner
                  className="mr-2 size-4 animate-spin"
                  aria-hidden="true"
                />
              )}
              Delete post
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        {children}
        {/* <Button variant="destructive">Delete post</Button> */}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Delete post</DrawerTitle>
          <DrawerDescription>
            This action cannot be undone. This will permanently delete your
            post.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="flex-col-reverse px-0">
          <DrawerClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DrawerClose>
          <Button
            type="button"
            onClick={onDelete}
            disabled={loading}
            variant="destructive"
          >
            {loading && (
              <Icons.spinner
                className="mr-2 size-4 animate-spin"
                aria-hidden="true"
              />
            )}
            Delete post
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
