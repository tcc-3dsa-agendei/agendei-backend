import { sendWhatsappMessage } from "@/routes/whatsapp-message"
import cors from "@elysiajs/cors"
import Elysia from "elysia"

export const app = new Elysia().use(
  cors({
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    maxAge: 300,
    methods: ["POST", "GET", "PATCH", "PUT", "DELETE"],
    origin: "http://localhost:5173"
  })
    .use(sendWhatsappMessage)
    .listen(3333, ({ url }) => {
      console.log(`Servidor rodando: ${url}`)
    })
)
