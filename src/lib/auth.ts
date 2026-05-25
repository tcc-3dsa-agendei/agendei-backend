import { sendWhatsappMessage } from "@/http/whatsapp-message"
import { env } from "@/lib/env"
import { prisma } from "@/prisma"
import { systemMessage } from "@/utils/system-message"
import { isValidMobilePhone } from "@brazilian-utils/brazilian-utils"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { betterAuth } from "better-auth/minimal"
import { nextCookies } from "better-auth/next-js"
import { phoneNumber } from "better-auth/plugins"

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
  user: {
    additionalFields: {
      company_taxId: {
        type: "string",
        required: true,
        input: true,
        unique: true
      },
      company_street: {
        type: "string",
        required: true,
        input: true
      },
      company_district: {
        type: "string",
        required: true,
        input: true
      }
    }
  },
  plugins: [
    nextCookies(),
    phoneNumber({
      requireVerification: true,
      phoneNumberValidator: (phone: string) => {
        const normalizedPhone = phone.replace(/\D/g, "")

        const brPhone = normalizedPhone.startsWith("55")
          ? normalizedPhone.slice(2)
          : normalizedPhone

        return isValidMobilePhone(brPhone)
      },
      sendOTP: async ({ code, phoneNumber }) => {
        await sendWhatsappMessage({
          number: phoneNumber,
          text: systemMessage(
            `Insira o código a seguir para confirmar seu número no Agendei: ${code}`,
            "validation"
          )
        })
      }
    })
  ]
})
