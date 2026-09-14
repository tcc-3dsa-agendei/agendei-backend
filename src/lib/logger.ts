import { Logger } from "tslog"

export const logger = new Logger({
  name: "agendei-api",
  pretty: {
    timeZone: "local",
    template: "{{hh}}:{{MM}}:{{ss}} {{logLevelName}} [{{name}}] "
  }
})
