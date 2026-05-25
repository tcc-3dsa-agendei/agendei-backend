import { isValidPhone } from "@brazilian-utils/brazilian-utils"
import { z } from "zod"

export const messageInput = z.object({
  number: z
    .string()
    .refine(phone => {
      return isValidPhone(phone, { version: 2 })
    }, "Número inválido")
    .transform(phone => `55${phone}`),
  text: z.string().nonempty()
})

export const messageOutput = z.object({
  key: z.object({ remoteJid: z.string(), fromMe: z.boolean(), id: z.string() }),
  message: z.object({ extendedTextMessage: z.object({ text: z.string() }) }),
  messageTimestamp: z.string(),
  status: z.string()
})

export type MessageInput = z.infer<typeof messageInput>
export type MessageOutput = z.infer<typeof messageOutput>
