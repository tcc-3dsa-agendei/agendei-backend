import { prisma } from "@/lib/prisma"
import { authPlugin } from "@/plugins/auth-plugin"
import Elysia from "elysia"
import z from "zod"

export const deleteScheduleRoute = new Elysia().use(authPlugin).patch(
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

    await prisma.schedule.delete({
      where: {
        companyId: company.id,
        id: params.id
      }
    })

    return status(204)
  },
  {
    auth: true,
    params: z.object({
      id: z.cuid2()
    })
  }
)
