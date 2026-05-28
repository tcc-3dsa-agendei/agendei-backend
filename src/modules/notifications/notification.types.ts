import type { sendWhatsappNotificationSchema } from "@/modules/notifications/notification.schemas"
import type { z } from "zod"

export type SendNotificationDto = z.infer<typeof sendWhatsappNotificationSchema>
