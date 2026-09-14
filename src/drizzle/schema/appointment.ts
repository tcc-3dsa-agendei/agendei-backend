import { relations } from "drizzle-orm"
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core"
import { service } from "@/drizzle/schema/service"
import { user } from "@/drizzle/schema/user"

export const appointmentStatusEnum = [
  "scheduled",
  "confirmed",
  "completed",
  "cancelled",
  "no_show"
] as const

export type AppointmentStatus = (typeof appointmentStatusEnum)[number]

export const appointment = sqliteTable(
  "appointment",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => Bun.randomUUIDv7()),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    serviceId: text("service_id")
      .notNull()
      .references(() => service.id),
    customerName: text("customer_name").notNull(),
    customerPhone: text("customer_phone").notNull(),
    startAt: integer("start_at", { mode: "timestamp_ms" }).notNull(),
    endAt: integer("end_at", { mode: "timestamp_ms" }).notNull(),
    status: text("status", { enum: appointmentStatusEnum }).notNull().default("scheduled"),
    notes: text("notes"),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .notNull()
      .$defaultFn(() => new Date()),
    updatedAt: integer("updated_at", { mode: "timestamp_ms" })
      .notNull()
      .$defaultFn(() => new Date())
      .$onUpdate(() => new Date())
  },
  (table) => [
    index("appointment_user_id_idx").on(table.userId),
    index("appointment_service_id_idx").on(table.serviceId),
    index("appointment_start_at_idx").on(table.startAt)
  ]
)

export const appointmentRelations = relations(appointment, ({ one }) => ({
  user: one(user, {
    fields: [appointment.userId],
    references: [user.id]
  }),
  service: one(service, {
    fields: [appointment.serviceId],
    references: [service.id]
  })
}))
