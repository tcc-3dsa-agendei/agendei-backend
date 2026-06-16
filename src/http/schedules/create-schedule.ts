import { prisma } from "@/lib/prisma"
import { authPlugin } from "@/plugins/auth-plugin"
import Elysia from "elysia"
import z from "zod"

const createScheduleSchema = z.strictObject({
  weekDay: z.number().int().min(0).max(6),
  startTime: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Horário inválido"),
  endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Horário inválido")
})

export const createScheduleRoute = new Elysia().use(authPlugin).post(
  "/schedules",
  async ({ session, status, body }) => {
    const company = await prisma.company.findUnique({
      where: {
        userId: session.userId
      },
      select: {
        id: true
      }
    })

    if (!company) {
      return status(404, {
        message: "É necessário ter uma empresa para continuar"
      })
    }

    await prisma.schedule.create({
      data: {
        companyId: company.id,
        weekDay: body.weekDay,
        startTime: body.startTime,
        endTime: body.endTime
      }
    })

    return status(200, {
      message: "Agenda criada com sucesso"
    })
  },
  {
    auth: true,
    body: createScheduleSchema
  }
)
