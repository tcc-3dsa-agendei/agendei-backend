import { env } from "@/env"
import { schedulesRoutes } from "@/http/schedules"
import { servicesRoutes } from "@/http/services"
import { authPlugin } from "@/plugins/auth-plugin"
import cors from "@elysiajs/cors"
import Elysia from "elysia"
import { notficationsRoutes } from "@/http/notifications"

export const app = new Elysia()
  .onError(({ code, error }) => {
    if (code === "VALIDATION") {
      return {
        message: "Dados inválidos",
        details: error.message
      }
    }

    if (code === "NOT_FOUND") {
      return {
        message: "Rota não encontrada",
        details: error.message
      }
    }
  })
  .use(
    cors({
      allowedHeaders: ["Content-Type", "Authorization"],
      maxAge: 300,
      credentials: true,
      methods: ["POST", "GET", "DELETE", "PATCH", "OPTIONS"],
      origin: env.FRONTEND_URL
    })
  )
  .use(authPlugin)
  .use(notficationsRoutes)
  .use(schedulesRoutes)
  .use(servicesRoutes)
  .listen(3333, ({ url }) => {
    console.log(`Servidor rodando: ${url}`)
  })
