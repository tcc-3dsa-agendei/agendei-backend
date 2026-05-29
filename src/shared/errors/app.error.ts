export class AppError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    message: string
  ) {
    super(message)
  }
}

export class BadRequestError extends AppError {
  constructor(message = "Requisição inválida") {
    super(400, "BAD_REQUEST", message)
  }
}

export class ConflictError extends AppError {
  constructor(message = "Conflito") {
    super(409, "CONFLICT", message)
  }
}

export class ExternalServiceError extends AppError {
  constructor(message = "Erro no serviço externo") {
    super(502, "EXTERNAL_SERVICE_ERROR", message)
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Acesso negado") {
    super(401, "UNAUTHORIZED", message)
  }
}

export class ForbiddenError extends AppError {
  constructor(message = "Permissão necessária") {
    super(403, "FORBBIDEN", message)
  }
}
