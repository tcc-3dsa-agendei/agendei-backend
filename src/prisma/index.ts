import { env } from "@/lib/env"
import { PrismaClient } from "./generated/client"
import { PrismaPg } from "@prisma/adapter-pg"

const adapter = new PrismaPg({
  connectionString: env.DATABASE_URL
})

export const prisma = new PrismaClient({
  adapter
})
