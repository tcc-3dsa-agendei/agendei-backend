import { auth } from "@/integrations/better-auth"
import type {
  LoginDto,
  ProfileResponseDto,
  RegisterDto,
  ResetPasswordDto
} from "@/modules/auth/auth.types"
import { UnauthorizedError } from "@/shared/errors/app.error"

export class AuthController {
  async login(data: LoginDto) {
    return auth.api.signInEmail({
      body: {
        email: data.email,
        password: data.password,
        callbackURL: data.callbackUrl,
        rememberMe: data.rememberMe
      }
    })
  }

  async register(data: RegisterDto) {
    return auth.api.signUpEmail({
      body: {
        callbackURL: data.callbackUrl,
        image: data.image,
        rememberMe: data.rememberMe,
        name: data.name,
        email: data.email,
        phoneNumber: data.phone,
        password: data.password
      }
    })
  }

  async profile(headers: Headers): Promise<ProfileResponseDto> {
    const session = await auth.api.getSession({
      headers
    })

    if (!session) {
      throw new UnauthorizedError()
    }

    return session.user
  }

  async resetPassword(data: ResetPasswordDto) {
    return auth.api.requestPasswordReset({
      body: {
        email: data.email,
        redirectTo: data.redirectTo
      }
    })
  }
}
