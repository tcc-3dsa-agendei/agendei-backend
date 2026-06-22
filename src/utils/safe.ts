type Result<T, E = Error> = [error: E, data: null] | [error: null, data: T]

export function safe<T, E = Error>(fn: () => T): Result<T, E> {
  try {
    return [null, fn()]
  } catch (error) {
    return [error as E, null]
  }
}

export async function safeAsync<T, E = Error>(
  fn: () => Promise<T>
): Promise<Result<T, E>> {
  try {
    return [null, await fn()]
  } catch (error) {
    return [error as E, null]
  }
}
