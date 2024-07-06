export function validateHeaders(
  recordHeaders: string[],
  expectedHeaders: string[],
): boolean {
  if (recordHeaders.length !== expectedHeaders.length) {
    return false
  }
  const validHeaders = recordHeaders.every((elemento, index) => elemento === expectedHeaders[index])

  return validHeaders
}