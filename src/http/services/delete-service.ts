import { prisma } from "@/lib/prisma"
import { authPlugin } from "@/plugins/auth-plugin"
import Elysia from "elysia"
import z from "zod"

export const deleteServiceRoute = new Elysia().use(authPlugin).delete(
  "/:id",
  async ({ params, status, session }) => {
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

    await prisma.service.delete({
      where: {
        id: params.id,
        companyId: company.id
      }
    })

    return status(204)
  },
  {
    params: z.object({
      id: z.cuid2()
    }),
    auth: true
  }
)
