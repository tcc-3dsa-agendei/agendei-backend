import { isValidMobilePhone } from "@brazilian-utils/brazilian-utils"

export const phoneValidator = (phone: string) => {
  const normalizedPhone = phone.replace(/\D/g, "")
  const brPhone = normalizedPhone.startsWith("55")
    ? normalizedPhone.slice(2)
    : normalizedPhone

  return isValidMobilePhone(brPhone)
}
