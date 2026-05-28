import { authRoutes } from "@/modules/auth/auth.routes"
import { notificationRoutes } from "@/modules/notifications/notification.routes"
import { AppError } from "@/shared/errors/app.error"
import cors from "@elysiajs/cors"
import { APIError as BetterAuthApiError } from "better-auth"
import Elysia from "elysia"

export const app = new Elysia()
  .onError(({ code, error }) => {
    if (code === "VALIDATION" || code === "NOT_FOUND") {
      return {
        statusCode: error.status,
        code,
        message: error.message
      }
    }

    if (error instanceof AppError) {
      return {
        statusCode: error.statusCode,
        code: error.code,
        message: error.message
      }
    }

    if (error instanceof BetterAuthApiError) {
      return {
        statusCode: error.statusCode,
        code: error.body?.code,
        message: error.message
      }
    }

    return {
      statusCode: 500,
      code: "INTERNAL_ERROR",
      message: "Erro interno do servidor"
    }
  })
  .use(
    cors({
      allowedHeaders: ["Content-Type", "Authorization"]
    })
  )
  .use(authRoutes)
  .use(notificationRoutes)
  .listen(3333)
