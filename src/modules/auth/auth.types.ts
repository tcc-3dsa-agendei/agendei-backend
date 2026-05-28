import type {
  loginSchema,
  resetPasswordSchema,
  registerSchema
} from "@/modules/auth/auth.schemas"
import type { z } from "zod"
import type { auth } from "@/integrations/better-auth"

export type RegisterDto = z.infer<typeof registerSchema>
export type LoginDto = z.infer<typeof loginSchema>
export type ProfileResponseDto = typeof auth.$Infer.Session.user
export type ResetPasswordDto = z.infer<typeof resetPasswordSchema>
