import { z } from "zod"

const envSchema = z.object({
  DATABASE_URL: z.url(),
  BETTER_AUTH_SECRET: z.uuid(),
  BETTER_AUTH_URL: z.url(),
  EVOLUTION_SERVER_URL: z.url(),
  AUTHENTICATION_API_KEY: z.uuid(),
  FRONTEND_URL: z.url()
})

export const env = envSchema.parse(Bun.env)
