import { relations } from "drizzle-orm"
import { index, integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core"
import { appointment } from "@/drizzle/schema/appointment"
import { user } from "@/drizzle/schema/user"

export const service = sqliteTable(
  "service",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => Bun.randomUUIDv7()),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    description: text("description"),
    durationInMinutes: integer("duration_in_minutes").notNull(),
    price: real("price"),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .notNull()
      .$defaultFn(() => new Date()),
    updatedAt: integer("updated_at", { mode: "timestamp_ms" })
      .notNull()
      .$defaultFn(() => new Date())
      .$onUpdate(() => new Date())
  },
  (table) => [index("service_user_id_idx").on(table.userId)]
)

export const serviceRelations = relations(service, ({ one, many }) => ({
  user: one(user, {
    fields: [service.userId],
    references: [user.id]
  }),
  appointments: many(appointment)
}))
