import { relations } from "drizzle-orm"
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core"
import { user } from "@/drizzle/schema/user"

export const schedule = sqliteTable(
  "schedule",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => Bun.randomUUIDv7()),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    weekDay: integer("week_day").notNull(), // 0-6
    startTime: text("start_time").notNull(), // "09:00"
    endTime: text("end_time").notNull(), // "18:00"
    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .notNull()
      .$defaultFn(() => new Date()),
    updatedAt: integer("updated_at", { mode: "timestamp_ms" })
      .notNull()
      .$defaultFn(() => new Date())
      .$onUpdate(() => new Date())
  },
  (table) => [index("schedule_user_id_idx").on(table.userId)]
)

export const scheduleRelations = relations(schedule, ({ one }) => ({
  user: one(user, {
    fields: [schedule.userId],
    references: [user.id]
  })
}))
