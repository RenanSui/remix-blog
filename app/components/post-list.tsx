import { usePostAtom } from '@/hooks/post'
import { usePostDisplayAction } from '@/hooks/use-post-display-action'
import { useProfileByUserId } from '@/hooks/use-profile'
import { cn } from '@/lib/utils'
import { Post } from '@/types'
import { Link } from '@remix-run/react'
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow'
import * as React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

type PostListProps = React.HTMLAttributes<HTMLDivElement> & { items: Post[] }

export function PostList({ items, className }: PostListProps) {
  return (
    <div className={cn('flex flex-col gap-2 p-4 pt-0', className)}>
      {items.map((item) => (
        <PostItem key={item.id} post={item} />
      ))}
    </div>
  )
}

const PostItem = ({ post }: { post: Post }) => {
  const { data } = useProfileByUserId(post.authorId)
  const [selectedPost, setSelectedPost] = usePostAtom()
  const [, setAction] = usePostDisplayAction()
  const profile = data?.data

  return (
    <button
      className={cn(
        'flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent',
        selectedPost.selected === post.id && 'bg-muted',
      )}
      onClick={() => {
        setSelectedPost({
          ...selectedPost,
          selected: post.id,
        })
        setAction('post')
      }}
    >
      <div className="flex w-full flex-col gap-1">
        <div className="flex items-start">
          <div className="flex items-start gap-4 text-sm">
            <Avatar>
              <AvatarImage
                src={profile?.image}
                alt={`${profile?.username}'s profile picture.`}
              />
              <AvatarFallback>
                {profile?.name
                  .split(' ')
                  .map((chunk) => chunk[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex gap-2">
              <Link
                className="font-semibold hover:underline z-50 relative"
                to={`/profile/${profile?.username}`}
              >
                {profile?.name}
              </Link>
              <div className="font-semibold text-muted-foreground/50">
                @{profile?.username}
              </div>
            </div>
          </div>
          <div
            className={cn(
              'ml-auto text-xs',
              selectedPost.selected === post.id
                ? 'text-foreground'
                : 'text-muted-foreground',
            )}
          >
            {formatDistanceToNow(new Date(post.createdAt), {
              addSuffix: true,
            })}
          </div>
        </div>
      </div>
      <div className="line-clamp-2">{post.body.substring(0, 300)}</div>
    </button>
  )
}
