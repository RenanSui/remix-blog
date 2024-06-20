import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useAccessToken } from '@/hooks/use-access-token'
// import { profileService } from '@/lib/actions/profile'
import { useSeverURLAtom } from '@/hooks/use-server-url'
import { ProfileService } from '@/lib/actions/profile'
import { ProfileErrorHandler } from '@/lib/errors/handle-profile-error'
import { cn } from '@/lib/utils'
import {
  UpdateProfileSchema,
  updateProfileSchema,
} from '@/lib/validations/profile'
import { Profile } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@remix-run/react'
import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'

type ProfileFormProps = {
  profile: Profile | null
}

export const ProfileForm = ({ profile }: ProfileFormProps) => {
  const [accessToken] = useAccessToken()
  const [serverUrl] = useSeverURLAtom()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof updateProfileSchema>>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: profile?.name ?? '',
      username: profile?.username ?? '',
      image: profile?.image ?? '',
      bio: profile?.bio ?? '',
    },
  })

  if (!profile) return null

  const onSubmit = async ({
    name,
    username,
    bio,
    image,
  }: UpdateProfileSchema) => {
    if (!accessToken) return null

    const UpdateData = { id: profile.id, userId: profile.userId }
    const profileService = new ProfileService(serverUrl)

    if (profile.name !== name) {
      try {
        const profileData = { ...UpdateData, name }
        const { status } = await profileService.updateProfile(
          profileData,
          accessToken,
        )
        ProfileErrorHandler(status)
      } catch (err) {
        const error = err as { message: string }
        toast.error(error.message)
      }
    }

    if (profile.username !== username) {
      try {
        const profileData = { ...UpdateData, username }
        const { status } = await profileService.updateUsername(
          profileData,
          accessToken,
        )
        ProfileErrorHandler(status)
      } catch (err) {
        const error = err as { message: string }
        toast.error(error.message)
      }
    }

    if (profile.image !== image) {
      try {
        const profileData = { ...UpdateData, image }
        const { status } = await profileService.updateAvatar(
          profileData,
          accessToken,
        )
        ProfileErrorHandler(status)
      } catch (err) {
        const error = err as { message: string }
        toast.error(error.message)
      }
    }

    if (profile.bio !== bio) {
      try {
        const profileData = { ...UpdateData, bio }
        const { status } = await profileService.updateBio(
          profileData,
          accessToken,
        )
        ProfileErrorHandler(status)
      } catch (err) {
        const error = err as { message: string }
        toast.error(error.message)
      }
    }

    const { userId } = profile
    queryClient.invalidateQueries({ queryKey: [`profile-by-userid-${userId}`] })
    toast.success('Profile updated.')
    navigate('/profile')
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Name
                <Required />
              </FormLabel>
              <FormControl>
                <Input placeholder="Potato Head" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Username
                <Required />
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="potatoheadcoolemail"
                  {...field}
                  onChange={(event) => {
                    const { value } = event.target
                    form.setValue('username', value.replace(/\s+/g, ''))
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Image URL
                <Required />
              </FormLabel>
              <FormControl>
                <div className="space-y-2">
                  <Input placeholder="potatoheadcoolemail" {...field} />
                  <Avatar className={cn('size-11')}>
                    <AvatarImage src={field.value} alt="user image" />
                    <AvatarFallback className="capitalize">
                      {profile.name
                        .split(' ')
                        .map((chunk) => chunk[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
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

        <Button type="submit">
          Update profile
          <span className="sr-only">Update profile</span>
        </Button>
      </form>
    </Form>
  )
}

const Required = () => <span className="text-red-500"> *</span>
