import { env } from "@/env"
import { prisma } from "@/lib/prisma"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { betterAuth } from "better-auth/minimal"
import { nextCookies } from "better-auth/next-js"
import { phoneNumber } from "better-auth/plugins"
import { phoneValidator } from "@/utils/phone-validator"
import { systemMessage } from "@/utils/system-message"
import { sendNotification } from "@/http/send-notification"

export const auth = betterAuth({
  baseURL: env.BETTER_AUTH_URL,
  secret: env.BETTER_AUTH_SECRET,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
    debugLogs: true,
    transaction: true,
    usePlural: false
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    maxPasswordLength: 64,
    autoSignIn: false
  },
  plugins: [
    nextCookies(),
    phoneNumber({
      requireVerification: true,
      phoneNumberValidator: (phone: string) => phoneValidator(phone),
      sendOTP: async data => {
        await sendNotification({
          number: data.phoneNumber,
          text: systemMessage(
            `Insira o código a seguir para confirmar seu número no Agendei: ${data.code}`,
            "validation"
          )
        })
      }
    })
  ]
})
