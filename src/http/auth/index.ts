import { createCompanyRoute } from "@/http/auth/create-company"
import { getProfileRoute } from "@/http/auth/get-profile"
import { loginUserRoute } from "@/http/auth/login-user"
import { registerUserRoute } from "@/http/auth/register-user"
import Elysia from "elysia"

export const authRoutes = new Elysia().use([
  createCompanyRoute,
  getProfileRoute,
  loginUserRoute,
  registerUserRoute
])
