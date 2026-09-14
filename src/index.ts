import { cors } from "@elysia/cors"
import { Elysia } from "elysia"
import { env } from "@/env"
import { scheduleRoutes } from "@/http/schedules"
import { auth } from "@/lib/auth"
import { logger } from "@/lib/logger"

const app = new Elysia()

app.use(
  cors({
    origin: env.FRONTEND_URL,
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PATCH", "PUT"]
  })
)

app.mount(auth.handler)
app.use(scheduleRoutes)

app.listen(env.PORT, (server) => {
  logger.info("Servidor iniciado", {
    url: server.url.origin,
    port: server.port,
    environment: env.NODE_ENV
  })
})
