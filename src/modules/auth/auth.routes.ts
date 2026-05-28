import { AuthController } from "@/modules/auth/auth.controller"
import { loginSchema, registerSchema } from "@/modules/auth/auth.schemas"
import Elysia from "elysia"

const controller = new AuthController()

export const authRoutes = new Elysia({ prefix: "/auth" })
  .post("/register", async ({ body }) => await controller.register(body), {
    body: registerSchema
  })
  .post("/login", async ({ body }) => await controller.login(body), {
    body: loginSchema
  })
  .get(
    "/profile",
    async ({ request: { headers } }) => await controller.profile(headers)
  )
