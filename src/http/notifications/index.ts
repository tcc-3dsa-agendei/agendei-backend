import { sendNotificationRoute } from "@/http/notifications/send-notification"
import Elysia from "elysia"

export const notficationsRoutes = new Elysia({ prefix: "/notifications" }).use(
  sendNotificationRoute
)
