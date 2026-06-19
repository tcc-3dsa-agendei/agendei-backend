import { createScheduleRoute } from "@/http/schedules/create-schedule"
import { getAllSchedulesRoute } from "@/http/schedules/get-all-schedules"
import Elysia from "elysia"

export const schedulesRoutes = new Elysia().use([
  createScheduleRoute,
  getAllSchedulesRoute
])
