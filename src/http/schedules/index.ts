import { createScheduleRoute } from "@/http/schedules/create-schedule"
import { deleteScheduleRoute } from "@/http/schedules/delete-schedule"
import { editScheduleRoute } from "@/http/schedules/edit-schedule"
import { getAllSchedulesRoute } from "@/http/schedules/get-all-schedules"
import { getScheduleRoute } from "@/http/schedules/get-schedule"
import Elysia from "elysia"

export const schedulesRoutes = new Elysia({ prefix: "/schedules" }).use([
  createScheduleRoute,
  getAllSchedulesRoute,
  getScheduleRoute,
  editScheduleRoute,
  deleteScheduleRoute
])
