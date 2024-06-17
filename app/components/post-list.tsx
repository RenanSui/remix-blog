import { usePostAtom } from '@/hooks/post'
import { useNewPost } from '@/hooks/use-new-post'
import { useProfileByUserId } from '@/hooks/use-profile'
import { cn } from '@/lib/utils'
import { Post } from '@/types'
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

type PostListProps = { items: Post[] }

export function PostList({ items }: PostListProps) {
  return (
    <div className="flex flex-col gap-2 p-4 pt-0">
      {items.map((item) => (
        <PostItem key={item.id} post={item} />
      ))}
    </div>
  )
}

const PostItem = ({ post }: { post: Post }) => {
  const { data } = useProfileByUserId(post.authorId)
  const [selectedPost, setSelectedPost] = usePostAtom()
  const [, setNewPost] = useNewPost()
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
        setNewPost(false)
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
            <div className="grid ">
              <div className="font-semibold">{profile?.name}</div>
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
      <div className="line-clamp-2 text-xs text-muted-foreground">
        {post.body.substring(0, 300)}
      </div>
    </button>
  )
}
