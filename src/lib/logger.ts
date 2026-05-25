import { createConsola } from "consola"

export const logger = createConsola({
  level: 4,
  formatOptions: {
    compact: false,
    colors: true,
    date: false,
    columns: 80
  }
})
