import { prisma } from "@/lib/prisma"
import { authPlugin } from "@/plugins/auth-plugin"
import Elysia from "elysia"
import z from "zod"

export const updateServiceRoute = new Elysia().use(authPlugin).delete(
  "/:id",
  async ({ params, status, session, body }) => {
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

    const editedService = await prisma.service.update({
      data: {
        ...body
      },
      where: {
        id: params.id,
        companyId: company.id
      }
    })

    return status(200, {
      editedService
    })
  },
  {
    params: z.strictObject({
      id: z.cuid2()
    }),
    body: z.strictObject({
      name: z
        .string()
        .nonempty("Campo obrigatório")
        .max(128, "O nome do serviço deve conter no máximo 128 caracteres.")
        .optional(),
      description: z
        .string()
        .max(128, "A descrição do serviço deve conter no máximo 128 caracteres")
        .optional(),
      durationInMinutes: z
        .number()
        .int()
        .positive()
        .min(5, "A duração mínima de um serviço deve ser de 5 minutos")
        .max(60, "A duração de um serviço deve ser no máximo de 60 minutos")
        .optional(),
      price: z
        .number()
        .positive()
        .min(1, "O preço deve ser de R$ 1 no mínimo")
        .optional()
    }),
    auth: true
  }
)
