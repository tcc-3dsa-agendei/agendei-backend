import { prisma } from "@/lib/prisma"
import { authPlugin } from "@/plugins/auth-plugin"
import Elysia from "elysia"

export const getAllSchedulesRoute = new Elysia().use(authPlugin).get(
  "/schedules",
  async ({ session, status }) => {
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

    const schedules = await prisma.schedule.findMany({
      where: {
        companyId: company.id
      },
      omit: {
        companyId: true,
        id: true
      }
    })

    if (schedules.length === 0) {
      return status(404, {
        message: "Você não possui agendas criadas no momento"
      })
    }

    return status(200, {
      schedules
    })
  },
  {
    auth: true
  }
)
