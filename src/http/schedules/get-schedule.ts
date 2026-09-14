import { Elysia } from "elysia"
import z from "zod"
import { db } from "@/drizzle"
import { logger } from "@/lib/logger"
import { sessionMiddleware } from "@/middleware/session-middleware"

export const getSchedule = new Elysia().use(sessionMiddleware).get(
  "/:scheduleId",
  async ({ status, session, params: { scheduleId } }) => {
    logger.info("Buscando agenda...", {
      id: scheduleId
    })

    const schedule = await db.query.schedule.findFirst({
      where: ({ userId, id }, { eq, and }) => and(eq(userId, session.user.id), eq(id, scheduleId)),
      columns: {
        updatedAt: false
      }
    })

    if (!schedule) {
      logger.debug("Agenda não encontrada", {
        details: {
          id: scheduleId
        }
      })
      throw status("Not Found", "Agenda não encontrada")
    }

    logger.info("Agenda encontrada", {
      schedule
    })

    return schedule
  },
  {
    auth: true,
    params: z.object({
      scheduleId: z.uuidv7("Formato do ID inválido")
    })
  }
)
