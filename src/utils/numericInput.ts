export function toDigits(value: unknown) {
  return String(value ?? '').replace(/\D/g, '')
}

export function formatDigits(digits: string) {
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

export function parseDigitsToNumber(value: unknown) {
  const digits = toDigits(value)

  if (!digits) {
    return 0
  }

  return Number(digits)
}
