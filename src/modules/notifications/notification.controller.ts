import { evolution } from "@/integrations/evolution"
import type { SendNotificationDto } from "@/modules/notifications/notification.types"
import { ExternalServiceError } from "@/shared/errors/app.error"

export class NotificationController {
  async sendWhatsappNotification(data: SendNotificationDto) {
    try {
      return await evolution.messages.sendText(data)
    } catch {
      throw new ExternalServiceError("Falha ao enviar mensagem via WhatsApp")
    }
  }
}
