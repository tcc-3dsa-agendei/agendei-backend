import { env } from "@/env"
import { schedulesRoutes } from "@/http/schedules"
import { servicesRoutes } from "@/http/services"
import { authPlugin } from "@/plugins/auth-plugin"
import cors from "@elysiajs/cors"
import Elysia from "elysia"
import { notficationsRoutes } from "@/http/notifications"
import { authRoutes } from "@/http/auth"
import { auth } from "@/lib/auth"

export const app = new Elysia()
  .onError(({ code, error, request }) => {
    if (code === "VALIDATION") {
      return {
        message: error.messageValue?.message
      }
    }

    if (code === "NOT_FOUND") {
      const url = new URL(request.url)

      return {
        message: `Rota não encontrada: ${url.pathname}`
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
  .mount(auth.handler)
  .use(notficationsRoutes)
  .use(schedulesRoutes)
  .use(servicesRoutes)
  .use(authRoutes)
  .listen(3333, ({ url }) => {
    console.log(`Servidor rodando: ${url}`)
  })
