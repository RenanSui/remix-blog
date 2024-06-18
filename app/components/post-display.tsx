import { usePostAtom, usePostById } from '@/hooks/post'
import { usePostDisplayAction } from '@/hooks/use-post-display-action'
import { useProfileByUserId } from '@/hooks/use-profile'
import { cn } from '@/lib/utils'
import { Profile } from '@/types'
import { Link } from '@remix-run/react'
import { format } from 'date-fns/format'
import { AddNewPost } from './add-new-post'
import { Icons } from './icon'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button, buttonVariants } from './ui/button'
import { Separator } from './ui/separator'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'

interface PostDisplayProps {
  profile: Profile | null
}

export function PostDisplay({ profile }: PostDisplayProps) {
  const [post, setPost] = usePostAtom()
  const [action, setAction] = usePostDisplayAction()

  return (
    <div className="flex h-full flex-col">
      <div className="p-2 gap-2 flex items-center justify-end">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setAction('add')
                setPost({ selected: null })
              }}
            >
              <Icons.pencil className="h-4 w-4" />
              <span className="sr-only"></span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Post</TooltipContent>
        </Tooltip>
        <Separator orientation="vertical" className="mx-1 h-6" />
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              disabled={!post.selected}
              onClick={() => {
                setAction('post')
                setPost({ selected: null })
              }}
            >
              <Icons.clear className="h-4 w-4" />
              <span className="sr-only">Deselect</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Deselect</TooltipContent>
        </Tooltip>
      </div>
      <Separator />

      {action === 'add' && profile && (
        <div className="p-4">
          <AddNewPost />
        </div>
      )}

      {action === 'post' && post.selected && (
        <PostItem postId={post.selected} />
      )}

      {action === 'add' && !profile && (
        <div className="p-8 flex flex-col items-center gap-4">
          Sign in to start posting.
          <Link to="/signin" className={cn(buttonVariants({ size: 'sm' }))}>
            Sign In
          </Link>
        </div>
      )}

      {action === 'post' && !post.selected && (
        <p className="p-8 text-center text-muted-foreground">
          No message selected
        </p>
      )}
    </div>
  )
}

const PostItem = ({ postId }: { postId: string }) => {
  const post = usePostById(postId)?.data?.data
  const profile = useProfileByUserId(post?.authorId)?.data?.data

  if (!post) {
    return (
      <p className="p-8 text-center text-muted-foreground">Post not found</p>
    )
  }

  if (!profile) {
    return (
      <p className="p-8 text-center text-muted-foreground">User not found</p>
    )
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-start p-4">
        <div className="flex items-start gap-4 text-sm">
          <Avatar>
            <AvatarImage
              src={profile?.image}
              alt={`${profile?.username}'s profile picture.`}
            />
            <AvatarFallback>
              {profile.name
                .split(' ')
                .map((chunk) => chunk[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
          <div className="grid ">
            <div className="font-semibold">{profile.name}</div>
            <div className="font-semibold text-muted-foreground/50">
              @{profile.username}
            </div>
          </div>
        </div>
        {post.createdAt && (
          <div className="ml-auto text-xs text-muted-foreground">
            {format(new Date(post.createdAt), 'PPpp')}
          </div>
        )}
      </div>
      <Separator />
      <div className="flex-1 whitespace-pre-wrap p-4 text-sm">{post.body}</div>
    </div>
  )
}
