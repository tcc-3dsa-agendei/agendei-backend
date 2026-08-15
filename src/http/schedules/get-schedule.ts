import { prisma } from "@/lib/prisma"
import { authPlugin } from "@/plugins/auth-plugin"
import Elysia from "elysia"
import z from "zod"

export const getScheduleRoute = new Elysia().use(authPlugin).get(
  "/:id",
  async ({ session, status, params }) => {
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

    const schedule = await prisma.schedule.findFirst({
      where: {
        companyId: company.id,
        id: params.id
      },
      omit: {
        companyId: true
      }
    })

    if (!schedule) {
      return status(404, {
        message: "Erro ao encontrar agenda"
      })
    }

    return {
      data: schedule
    }
  },
  {
    auth: true,
    params: z.object({
      id: z.cuid2()
    })
  }
)
