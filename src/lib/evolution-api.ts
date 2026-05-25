import { env } from "@/lib/env"
import { messageInput, messageOutput } from "@/models/whatsapp-send-message"
import { createSchema, createFetch } from "@better-fetch/fetch"

const evolutionApiFetcherSchema = createSchema({
  "/message/sendText/evolution-api-ecommerce": {
    input: messageInput,
    output: messageOutput
  }
})

export const $fetchEvolutionApi = createFetch({
  schema: evolutionApiFetcherSchema,
  baseURL: env.EVOLUTION_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
    apikey: env.AUTHENTICATION_API_KEY
  }
})
