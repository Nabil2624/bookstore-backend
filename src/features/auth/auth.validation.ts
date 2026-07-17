import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().trim().min(2).max(100),

  username: z
    .string()
    .trim()
    .min(3)
    .max(30)
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  email: z.email({
    message: 'Invalid email address',
  }),
  password: z
    .string()
    .min(8, {
      message: 'Password must be at least 8 characters long',
    })
    .regex(/[A-Z]/, {
      message: 'Password must contain at least one uppercase letter',
    })
    .regex(/[a-z]/, {
      message: 'Password must contain at least one lowercase letter',
    })
    .regex(/[0-9]/, {
      message: 'Password must contain at least one number',
    })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: 'Password must contain at least one special character',
    }),
  confirmPassword: z.string().min(1, {
    message: 'Confirm Password is required',
  }),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
});



export const loginSchema = z.object({

    login: z.string().trim().min(1, 'Username or email is required'),
    password: z.string().min(1, 'Password is required')
})


export const forgotPasswordSchema = z.object({
    email: z.email({
        message: 'Invalid email address',
    }),
})

export const resetPasswordSchema = z.object({
    email: z.email({
        message: 'Invalid email address',
    }),
    otp: z.string().length(6, 'OTP must be 6 characters'),
    newPassword: z
    .string()
    .min(8, {
      message: 'Password must be at least 8 characters long',
    })
    .regex(/[A-Z]/, {
      message: 'Password must contain at least one uppercase letter',
    })
    .regex(/[a-z]/, {
      message: 'Password must contain at least one lowercase letter',
    })
    .regex(/[0-9]/, {
      message: 'Password must contain at least one number',
    })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: 'Password must contain at least one special character',
    }),
     confirmPassword: z.string().min(1, {
    message: 'Confirm Password is required',
  }),

}).refine((data) => (data.newPassword === data.confirmPassword), {
    message: 'Passwords do not match',
    path: ['confirmPassword']
})


export const updateProfileSchema = z.object({
    name: z.string().trim().min(2).max(100),
     username: z
    .string()
    .trim()
    .min(3)
    .max(30)
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
     email: z.email({
    message: 'Invalid email address',
  }),
})






export type RegisterData = z.infer<typeof registerSchema>;
export type LoginData = z.infer<typeof loginSchema>;
export type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordData = z.infer<typeof resetPasswordSchema>;
export type UpdateProfileData = z.infer<typeof updateProfileSchema>;

