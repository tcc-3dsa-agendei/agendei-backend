import { env } from "@/shared/env"
import { prisma } from "@/shared/database/prisma"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { betterAuth } from "better-auth/minimal"
import { nextCookies } from "better-auth/next-js"
import { phoneNumber } from "better-auth/plugins"
import { phoneValidator } from "@/shared/utils/phone-validator"

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
      },
      company_number: {
        type: "string",
        required: true,
        input: true,
        unique: true
      },
      company_state: {
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
      phoneNumberValidator: (phone: string) => phoneValidator(phone),
      sendOTP: async (_data, ctx) => {
        console.log(ctx?.request)
        // await sendWhatsappMessage({
        //   number: phoneNumber,
        //   text: systemMessage(
        //     `Insira o código a seguir para confirmar seu número no Agendei: ${code}`,
        //     "validation"
        //   )
        // })
      }
    })
  ]
})
