import { createServiceRoute } from "@/http/services/create-service"
import { getServicesRoute } from "@/http/services/get-services"
import { updateServiceRoute } from "@/http/services/update-service"
import { deleteServiceRoute } from "@/http/services/delete-service"
import Elysia from "elysia"

export const servicesRoutes = new Elysia({ prefix: "/services" }).use([
  getServicesRoute,
  createServiceRoute,
  updateServiceRoute,
  deleteServiceRoute
])
