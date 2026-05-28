import { phoneValidator } from "@/shared/utils/phone-validator"
import z from "zod"

export const sendWhatsappNotificationSchema = z.strictObject({
  number: z.string().nonempty("Campo obrigatório").refine(phoneValidator),
  text: z.string().nonempty("Campo obrigatório")
})
