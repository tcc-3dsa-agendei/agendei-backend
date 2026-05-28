import { env } from "@/shared/env"
import { EvolutionClient, EvolutionInstance } from "@solufy/evolution-sdk"

const client = new EvolutionClient({
  serverUrl: env.EVOLUTION_SERVER_URL,
  token: env.AUTHENTICATION_API_KEY
})

export const evolution = new EvolutionInstance("evolution-api-agendei", {
  serverUrl: client.options.serverUrl,
  token: client.options.token
})
