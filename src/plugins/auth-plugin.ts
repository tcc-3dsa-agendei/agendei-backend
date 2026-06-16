import { auth } from "@/lib/auth"
import Elysia from "elysia"

export const authPlugin = new Elysia().mount(auth.handler).macro({
  auth: {
    resolve: async ({ request, status }) => {
      const session = await auth.api.getSession({
        headers: request.headers
      })

      if (!session) {
        return status(401, {
          message: "Não autorizado"
        })
      }

      return {
        session: session.session,
        user: session.user
      }
    }
  }
})
