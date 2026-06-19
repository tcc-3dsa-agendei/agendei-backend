import { prisma } from "@/lib/prisma"
import { authPlugin } from "@/plugins/auth-plugin"
import Elysia from "elysia"

export const getServicesRoute = new Elysia().use(authPlugin).get(
  "/services",
  async ({ status, session }) => {
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

    const services = await prisma.service.findMany({
      where: {
        companyId: company.id
      },
      omit: { companyId: true }
    })

    if (services.length === 0) {
      return status(404, {
        message: "Você não possui serviços criados no momento"
      })
    }

    return status(200, {
      services
    })
  },
  {
    auth: true
  }
)
