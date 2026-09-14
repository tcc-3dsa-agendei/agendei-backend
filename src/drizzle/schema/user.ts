import { relations } from "drizzle-orm"
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"
import { account } from "@/drizzle/schema/account"
import { session } from "@/drizzle/schema/session"

export const user = sqliteTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified", { mode: "boolean" }).default(false).notNull(),
  image: text("image"),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .$onUpdate(() => new Date())
    .notNull(),
  cnpj: text("cnpj").notNull().unique()
})

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account)
}))
