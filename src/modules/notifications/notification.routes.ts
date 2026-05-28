import { NotificationController } from "@/modules/notifications/notification.controller"
import { sendWhatsappNotificationSchema } from "@/modules/notifications/notification.schemas"
import Elysia from "elysia"

const controller = new NotificationController()

export const notificationRoutes = new Elysia({ prefix: "/notifications" }).post(
  "/send",
  async ({ body }) => {
    await controller.sendWhatsappNotification(body)
  },
  {
    body: sendWhatsappNotificationSchema
  }
)
