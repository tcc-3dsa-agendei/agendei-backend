import z from "zod"

export type ResponseData = {
  status: "INTERNAL_SERVER_ERROR" | "SUCCESS" | "VALIDATION_ERROR"
  message: string
  details: string | typeof Object
}

export const successResponse = z.object({
  success: z.literal(true),
  message: z.string(),
  details: z.string()
})

export const errorResponse = z.object({
  success: z.literal(false),
  message: z.string(),
  details: z.string()
})
