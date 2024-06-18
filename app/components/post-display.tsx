import { usePostAtom, usePostById } from '@/hooks/post'
import {
  DisplayAction,
  usePostDisplayAction,
} from '@/hooks/use-post-display-action'
import { useProfileByUserId } from '@/hooks/use-profile'
import { cn } from '@/lib/utils'
import { Post, Profile } from '@/types'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import { Link } from '@remix-run/react'
import { format } from 'date-fns/format'
import { AddNewPost } from './add-new-post'
import { Icons } from './icon'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { buttonVariants } from './ui/button'
import { Separator } from './ui/separator'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'
import { UpdatePost } from './update-post'

interface PostDisplayProps {
  profile: Profile | null
}

export function PostDisplay({ profile }: PostDisplayProps) {
  const [postId, setPost] = usePostAtom()
  const [action, setAction] = usePostDisplayAction()
  const post = usePostById(postId.selected)?.data?.data

  return (
    <Tabs
      className="flex h-full flex-col"
      value={action}
      defaultValue={action}
      onValueChange={(value) => setAction(value as DisplayAction)}
    >
      <TabsList className="p-2 gap-2 flex items-center">
        <Tooltip>
          <TooltipTrigger asChild>
            <TabsTrigger
              value="add"
              className={buttonVariants({ variant: 'ghost', size: 'icon' })}
              onClick={() => setPost({ selected: null })}
            >
              <Icons.add className="h-4 w-4" />
              <span className="sr-only"></span>
            </TabsTrigger>
          </TooltipTrigger>
          <TooltipContent>Add New</TooltipContent>
        </Tooltip>
        {post?.authorId === profile?.userId && (
          <Tooltip>
            <TooltipTrigger asChild>
              <TabsTrigger
                value="update"
                disabled={!postId.selected}
                className={buttonVariants({ variant: 'ghost', size: 'icon' })}
              >
                <Icons.pencil className="h-4 w-4" />
                <span className="sr-only"></span>
              </TabsTrigger>
            </TooltipTrigger>
            <TooltipContent>Update</TooltipContent>
          </Tooltip>
        )}
        {post?.authorId === profile?.userId && (
          <Tooltip>
            <TooltipTrigger asChild>
              <TabsTrigger
                value="delete"
                disabled={!postId.selected}
                className={buttonVariants({ variant: 'ghost', size: 'icon' })}
              >
                <Icons.delete className="h-4 w-4" />
                <span className="sr-only"></span>
              </TabsTrigger>
            </TooltipTrigger>
            <TooltipContent>Delete</TooltipContent>
          </Tooltip>
        )}
        <Tooltip>
          <TooltipTrigger asChild className="ml-auto">
            <TabsTrigger
              value="post"
              className={buttonVariants({ variant: 'ghost', size: 'icon' })}
              disabled={!postId.selected}
              onClick={() => setPost({ selected: null })}
            >
              <Icons.clean className="h-4 w-4" />
              <span className="sr-only">Clean display</span>
            </TabsTrigger>
          </TooltipTrigger>
          <TooltipContent>Clean display</TooltipContent>
        </Tooltip>
      </TabsList>
      <Separator />
      <TabsContent value="post">
        {postId.selected && post ? (
          <PostItem post={post} />
        ) : (
          <p className="p-8 text-center text-muted-foreground">
            No message selected
          </p>
        )}
      </TabsContent>
      <TabsContent value="add">
        {profile ? (
          <div className="p-4">
            <AddNewPost />
          </div>
        ) : (
          <div className="p-8 flex flex-col items-center gap-4">
            Sign in to start posting.
            <Link to="/signin" className={cn(buttonVariants({ size: 'sm' }))}>
              Sign In
            </Link>
          </div>
        )}
      </TabsContent>
      <TabsContent value="update">
        {profile && post && (
          <div className="p-4">
            <UpdatePost post={post} />
          </div>
        )}
      </TabsContent>
    </Tabs>
  )
}

const PostItem = ({ post }: { post: Post }) => {
  const profile = useProfileByUserId(post.authorId)?.data?.data

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
