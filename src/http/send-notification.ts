import { evolution } from "@/lib/evolution"
import { phoneValidator } from "@/utils/phone-validator"
import { systemMessage } from "@/utils/system-message"
import { EvolutionApiError } from "@solufy/evolution-sdk"
import Elysia from "elysia"
import z from "zod"

export const sendNotificationSchema = z.strictObject({
  number: z
    .string()
    .nonempty("Campo obrigatório")
    .refine(phoneValidator, "Número de telefone com formato inválido"),
  text: z
    .string()
    .nonempty("Campo obrigatório")
    .max(128, "A mensagem deve conter no máximo 128 caracteres.")
})

export const sendNotificationRoute = new Elysia().post(
  "/notifications",
  async ({ body, status }) => {
    try {
      const { messageId } = await evolution.messages.sendText({
        number: body.number,
        text: systemMessage(body.text, "confirmation")
      })

      return status(201, {
        message: `Mensagem enviada com sucesso: ${messageId}`
      })
    } catch (error) {
      return status(500, {
        message: `Erro ao enviar mensagem via WhatsApp!`,
        details: `${error instanceof EvolutionApiError ? error.message : "Erro desconhecido"}`
      })
    }
  },
  {
    body: sendNotificationSchema
  }
)
