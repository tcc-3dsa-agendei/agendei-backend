import dedent from "dedent"

const messageTypes = {
  validation: "Agendei | Validação de segurança",
  confirmation: "Agendei | Confirmação do sistema"
}

export function systemMessage(
  text: string,
  type: "confirmation" | "validation"
): string {
  return dedent`
  *${messageTypes[type]}*

  ${text}

  Ignore se você não solicitou essa mensagem.

  Atenciosamente,
  _equipe Agendei_
  `
}
