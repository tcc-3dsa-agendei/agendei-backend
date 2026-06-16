import { prisma } from "@/lib/prisma"
import { authPlugin } from "@/plugins/auth-plugin"
import Elysia from "elysia"
import z from "zod"

export const getServicePerIdRoute = new Elysia().use(authPlugin).get(
  "/services/:id",
  async ({ status, session, params }) => {
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

    const service = await prisma.service.findUnique({
      where: {
        companyId: company.id,
        id: params.id
      },
      omit: { companyId: true }
    })

    if (!service) {
      return status(404, {
        message: "Serviço não encontrado"
      })
    }

    return status(200, {
      service
    })
  },
  {
    auth: true,
    params: z.strictObject({
      id: z.cuid2("Formato de ID inválido")
    })
  }
)
