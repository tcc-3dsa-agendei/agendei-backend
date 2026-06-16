import { prisma } from "@/lib/prisma"
import { authPlugin } from "@/plugins/auth-plugin"
import Elysia from "elysia"
import z from "zod"

const createServiceSchema = z.strictObject({
  name: z
    .string()
    .nonempty("Campo obrigatório")
    .max(128, "O nome do serviço deve conter no máximo 128 caracteres."),
  description: z
    .string()
    .max(128, "A descrição do serviço deve conter no máximo 128 caracteres")
    .optional(),
  durationInMinutes: z
    .number()
    .int()
    .positive()
    .min(5, "A duração mínima de um serviço deve ser de 5 minutos")
    .max(60, "A duração de um serviço deve ser no máximo de 60 minutos"),
  price: z
    .number()
    .positive()
    .min(1, "O preço deve ser de R$ 1 no mínimo")
    .optional()
})

export const createServiceRoute = new Elysia().use(authPlugin).post(
  "/services",
  async ({ status, body, session }) => {
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

    await prisma.service.create({
      data: {
        name: body.name,
        durationInMinutes: body.durationInMinutes,
        price: body.price,
        description: body.description,
        companyId: company.id
      },
      omit: {
        companyId: true,
        updatedAt: true,
        id: true
      }
    })

    return status(201, {
      message: "Serviço criado com sucesso"
    })
  },
  {
    body: createServiceSchema,
    auth: true
  }
)
