import { Elysia } from "elysia"
import z from "zod"
import { db } from "@/drizzle"
import { schedule } from "@/drizzle/schema"
import { logger } from "@/lib/logger"
import { sessionMiddleware } from "@/middleware/session-middleware"

export const createSchedule = new Elysia().use(sessionMiddleware).post(
  "/",
  async ({ status, session, body: { weekDay, startTime, endTime } }) => {
    const requestId = Bun.randomUUIDv7()

    return logger.runInContext({ requestId }, async () => {
      logger.debug("Iniciando criação da agenda")

      try {
        logger.info("Criando agenda", {
          userId: session.user.id
        })

        const result = await db
          .insert(schedule)
          .values({
            endTime,
            startTime,
            weekDay,
            userId: session.user.id
          })
          .returning()

        logger.info("Agenda criada", {
          userId: session.user.id,
          ...result[0]
        })

        return schedule
      } catch (error) {
        logger.error("Erro ao criar agenda", {
          error
        })

        throw status("Bad Request", `Erro ao criar agenda: ${error}`)
      }
    })
  },
  {
    auth: true,
    body: z.object({
      weekDay: z.coerce
        .number()
        .int()
        .positive()
        .gte(0, "Valor mínimo deve ser 0")
        .lte(6, "O valor máximo deve ser 6"),
      endTime: z.string(),
      startTime: z.string()
    })
  }
)
