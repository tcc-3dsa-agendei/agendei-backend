import { $fetchEvolutionApi } from "@/lib/evolution-api"
import { errorResponse, successResponse } from "@/models/response"
import { messageInput } from "@/models/whatsapp-send-message"
import Elysia from "elysia"

export const sendWhatsappMessage = new Elysia().post(
  "/whatsapp/send-message",
  async ({ body: { number, text }, status }) => {
    const { data, error } = await $fetchEvolutionApi(
      "/message/sendText/evolution-api-ecommerce",
      {
        body: {
          number,
          text
        }
      }
    )

    if (error) {
      return status("error", {
        success: false,
        message: "Erro ao enviar mensagem via Whatsapp",
        details: error.message as string
      })
    }

    return status("success", {
      success: true,
      message: "Mensagem enviada com sucesso",
      details: data.key.id
    })
  },
  {
    body: messageInput,
    response: {
      success: successResponse,
      error: errorResponse
    }
  }
)
