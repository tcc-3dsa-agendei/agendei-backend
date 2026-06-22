import { prisma } from "@/lib/prisma"
import { authPlugin } from "@/plugins/auth-plugin"
// import { safeAsync } from "@/utils/safe"
import { isValidCep, isValidCnpj } from "@brazilian-utils/brazilian-utils"
import Elysia from "elysia"
import z from "zod"

const createCompanySchema = z.object({
  name: z
    .string()
    .min(1, "O nome é obrigatório")
    .max(128, "O nome deve ter no máximo 128 caracteres"),
  taxId: z
    .string()
    .refine(isValidCnpj, "CPNJ inválido")
    .min(1, "O CNPJ é obrigatório")
    .max(14),
  zipCode: z
    .string()
    .refine(isValidCep, "CEP inválido")
    .max(8, "O CEP deve ter no mínimo 8 caracteres"),
  category: z.enum(
    ["saude", "beleza", "consultoria", "servicos", "outros"],
    "Categoria não encontrada"
  )
})

export const createCompanyRoute = new Elysia().use(authPlugin).post(
  "/",
  async ({ session, status }) => {
    const hasCompany = await prisma.company.findUnique({
      where: {
        userId: session.userId
      }
    })

    if (hasCompany) {
      return status(500, {
        message: "Você já possui uma conta empresarial criada para esse usuário"
      })
    }

    // const [error, company] = await safeAsync(() =>
    //   prisma.company.create({
    //     data: {
    //       userId: session.userId
    //     }
    //   })
    // )

    // if (error) {
    //   return status(500, {
    //     message: error.message
    //   })
    // }

    // return {
    //   data: company
    // }
  },
  {
    body: createCompanySchema,
    auth: true
  }
)
