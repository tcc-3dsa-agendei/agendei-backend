import { isValidCnpj } from "@brazilian-utils/brazilian-utils"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { betterAuth } from "better-auth/minimal"
import { z } from "zod"
import { db } from "@/drizzle"
import * as schema from "@/drizzle/schema"
import { env } from "@/env"
import { logger } from "@/lib/logger"

export const auth = betterAuth({
  appName: "Agendei",
  baseURL: env.BETTER_AUTH_URL,
  secret: env.BETTER_AUTH_SECRET,
  trustedOrigins: [env.FRONTEND_URL],
  database: drizzleAdapter(db, {
    provider: "sqlite",
    debugLogs: env.NODE_ENV === "development",
    transaction: true,
    usePlural: false,
    schema
  }),
  logger: {
    log(level, message, ...args) {
      switch (level) {
        case "debug":
          logger.debug(message, {
            ...args
          })
          break

        case "error":
          logger.error(message, {
            ...args
          })
          break

        case "warn":
          logger.warn(message, {
            ...args
          })
          break

        default:
          logger.info(message, {
            ...args
          })
          break
      }
    }
  },
  advanced: {
    database: {
      generateId: () => crypto.randomUUID(),
      joins: true
    }
  },
  user: {
    additionalFields: {
      cnpj: {
        type: "string",
        unique: true,
        validator: {
          input: z.string().refine(isValidCnpj)
        }
      }
    }
  },
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    maxPasswordLength: 128,
    autoSignIn: true
  }
})
