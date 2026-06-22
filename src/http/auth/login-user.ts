import { auth } from "@/lib/auth"
import { safeAsync } from "@/utils/safe"
import Elysia from "elysia"
import z from "zod"

const loginUserSchema = z.object({
  email: z
    .email("Endereço de e-mail invállido")
    .max(256, "O endereço de e-mail deve ter no máximo 256 caracteres"),
  password: z
    .string()
    .min(8, "A senha deve ter no mínimo 8 caracteres")
    .max(128, "A senha deve ter no máximo 128 caracteres")
})

export const loginUserRoute = new Elysia().post(
  "/",
  async ({ status, body }) => {
    const [error, data] = await safeAsync(() =>
      auth.api.signInEmail({
        body: {
          email: body.email,
          password: body.password,
          rememberMe: true
        }
      })
    )

    if (error) {
      return status(500, {
        message: error.message
      })
    }

    return {
      data
    }
  },
  {
    body: loginUserSchema
  }
)
