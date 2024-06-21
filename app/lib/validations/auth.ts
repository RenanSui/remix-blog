import * as z from 'zod'
import * as zfd from 'zod-form-data'

export const authSchema = zfd.formData({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .max(100, { message: 'Password must be at most 100 characters long' }),
})

export type AuthSchema = z.infer<typeof authSchema>
