import { authPlugin } from "@/plugins/auth-plugin"
import Elysia from "elysia"

export const getProfileRoute = new Elysia().use(authPlugin).get(
  "/",
  async ({ session, user }) => {
    return {
      data: {
        session,
        user
      }
    }
  },
  {
    auth: true
  }
)
