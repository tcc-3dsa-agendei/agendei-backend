import { auth } from "@/lib/auth"
import { phoneValidator } from "@/utils/phone-validator"
import { safeAsync } from "@/utils/safe"
import Elysia from "elysia"
import z from "zod"

const createUserSchema = z
  .object({
    name: z
      .string()
      .min(3, "O nome deve ter no mínimo 3 caracteres")
      .max(256, "O nome deve ter no máximo 256 caracteres"),
    phone: z.string().refine(phoneValidator, "Formato de telefone inválido"),
    email: z
      .email("Endereço de e-mail invállido")
      .max(256, "O endereço de e-mail deve ter no máximo 256 caracteres"),
    password: z
      .string()
      .min(8, "A senha deve ter no mínimo 8 caracteres")
      .max(128, "A senha deve ter no máximo 128 caracteres"),
    confirmPassword: z
      .string()
      .min(8, "As senhas não coincidem")
      .max(128, "As senhas não coincidem")
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "As senhas não coincidem",
        path: ["confirmPassword"]
      })
    }
  })

export const registerUserRoute = new Elysia().post(
  "/",
  async ({ status, body }) => {
    const [error, data] = await safeAsync(() =>
      auth.api.signUpEmail({
        body: {
          name: body.name,
          phoneNumber: body.phone,
          email: body.email,
          password: body.password
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
    body: createUserSchema
  }
)
