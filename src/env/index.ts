import { z } from "zod"
import "dotenv/config"
import { logger } from "@/lib/logger"

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  BETTER_AUTH_URL: z.url(),
  BETTER_AUTH_SECRET: z.string().min(32),
  DATABASE_URL: z.string().endsWith("sqlite"),
  FRONTEND_URL: z.url(),
  PORT: z.coerce.number().int().positive(),
  EVOLUTION_SERVER_URL: z.url()
})

const parsedEnv = envSchema.safeParse(process.env)

if (!parsedEnv.success) {
  logger.error("Variáveis de ambiente inválidas", {
    errors: z.treeifyError(parsedEnv.error)
  })

  process.exit(1)
}

export const env = parsedEnv.data
