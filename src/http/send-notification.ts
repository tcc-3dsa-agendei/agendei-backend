import { evolution } from "@/lib/evolution"
import { phoneValidator } from "@/utils/phone-validator"
import { systemMessage } from "@/utils/system-message"
import { EvolutionApiError } from "@solufy/evolution-sdk"
import Elysia, { status } from "elysia"
import z from "zod"

export const sendNotificationSchema = z.strictObject({
  number: z.string().nonempty("Campo obrigatório").refine(phoneValidator),
  text: z.string().nonempty("Campo obrigatório")
})

type NotificationData = z.infer<typeof sendNotificationSchema>

export async function sendNotification(data: NotificationData) {
  try {
    const { messageId } = await evolution.messages.sendText({
      number: data.number,
      text: systemMessage(data.text, "confirmation")
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
}

export const sendNotificationRoute = new Elysia().post(
  "/notifications/send",
  async ({ body }) => {
    await sendNotification(body)
  },
  {
    body: sendNotificationSchema
  }
)
