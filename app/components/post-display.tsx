import { usePostAtom } from '@/hooks/post'
import {
  DisplayAction,
  usePostDisplayAction,
} from '@/hooks/use-post-display-action'
import { useProfileByUserId } from '@/hooks/use-profile'
import { useSeverURLAtom } from '@/hooks/use-server-url'
import { PostService } from '@/lib/actions/post'
import { cn } from '@/lib/utils'
import { Post, Profile } from '@/types'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import { Await, Link } from '@remix-run/react'
import { format } from 'date-fns/format'
import * as React from 'react'
import { AddNewPost } from './add-new-post'
import { DeletePost } from './delete-post'
import { Icons } from './icon'
import { PostDisplaySkeleton } from './loadings/post-display-skeleton'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { buttonVariants } from './ui/button'
import { Separator } from './ui/separator'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'
import { UpdatePost } from './update-post'

interface PostDisplayProps {
  profile: Profile | null
}

export function PostDisplay({ profile }: PostDisplayProps) {
  const [{ selected }] = usePostAtom()
  const [serverURL] = useSeverURLAtom()
  const postService = new PostService(serverURL)
  const post = selected ? postService.getById(selected) : null

  return (
    <React.Suspense fallback={<PostDisplaySkeleton />}>
      <Await
        resolve={post}
        errorElement={
          <p className="p-8 text-center">Error loading post display</p>
        }
      >
        {(data) =>
          data?.data ? (
            // eslint-disable-next-line no-use-before-define
            <PostDisplayHeader post={data?.data} profile={profile}>
              <TabsContent value="post">
                <PostDisplayItem post={data.data} />
              </TabsContent>
              <TabsContent value="add">
                <PostDisplayAdd profile={profile} />
              </TabsContent>
              <TabsContent value="update">
                <PostDisplayUpdate post={data.data} profile={profile} />
              </TabsContent>
            </PostDisplayHeader>
          ) : (
            // eslint-disable-next-line no-use-before-define
            <PostDisplayHeader post={null} profile={profile}>
              <p className="p-8 text-center text-muted-foreground">
                No message selected
              </p>
            </PostDisplayHeader>
          )
        }
      </Await>
    </React.Suspense>
  )
}

type PostDisplayHeader = React.HTMLAttributes<HTMLDivElement> & {
  post: Post | null | undefined
  profile: Profile | null
}

function PostDisplayHeader({ post, profile, children }: PostDisplayHeader) {
  const [postId, setPost] = usePostAtom()
  const [action, setAction] = usePostDisplayAction()
  return (
    <Tabs
      className="flex h-full flex-col"
      value={action}
      defaultValue={action}
      onValueChange={(value) => setAction(value as DisplayAction)}
    >
      <TabsList className="p-2 gap-2 flex items-center">
        {profile && (
          <Tooltip>
            <TooltipTrigger asChild>
              <TabsTrigger
                value="add"
                className={buttonVariants({ variant: 'ghost', size: 'icon' })}
              >
                <Icons.add className="h-4 w-4" />
                <span className="sr-only"></span>
              </TabsTrigger>
            </TooltipTrigger>
            <TooltipContent>Add New</TooltipContent>
          </Tooltip>
        )}
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
        {post && post?.authorId === profile?.userId && (
          <Tooltip>
            <TooltipTrigger asChild>
              <TabsTrigger
                value="post"
                disabled={!postId.selected}
                className={buttonVariants({ variant: 'ghost', size: 'icon' })}
              >
                <DeletePost post={post}>
                  <Icons.delete className="h-4 w-4" />
                </DeletePost>
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
      {children}
    </Tabs>
  )
}

function PostDisplayAdd({ profile }: Pick<PostDisplayHeader, 'profile'>) {
  return profile ? (
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
  )
}

function PostDisplayUpdate({
  post,
  profile,
}: Pick<PostDisplayHeader, 'post' | 'profile'>) {
  return (
    profile &&
    post && (
      <div className="p-4">
        <UpdatePost post={post} />
      </div>
    )
  )
}

const PostDisplayItem = ({ post }: { post: Post }) => {
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
