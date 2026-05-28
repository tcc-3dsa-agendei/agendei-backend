import z from "zod"

export const loginSchema = z.strictObject({
  password: z.string(),
  email: z.email(),
  callbackUrl: z.url().optional(),
  rememberMe: z.boolean().optional()
})

export const registerSchema = loginSchema.extend({
  name: z.string(),
  phone: z.string(),
  image: z.url().optional(),
  companyTaxId: z.string(),
  companyStreet: z.string(),
  companyDistrict: z.string(),
  companyNumber: z.string(),
  companyState: z.string()
})

export const resetPasswordSchema = z.strictObject({
  email: z.email(),
  redirectTo: z.url()
})
