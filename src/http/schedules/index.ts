import { Elysia } from "elysia"
import { createSchedule } from "@/http/schedules/create-schedule"
import { getAllSchedules } from "@/http/schedules/get-all-schedules"
import { getSchedule } from "@/http/schedules/get-schedule"

export const scheduleRoutes = new Elysia({ prefix: "/agendas" }).use([
  getAllSchedules,
  getSchedule,
  createSchedule
])
