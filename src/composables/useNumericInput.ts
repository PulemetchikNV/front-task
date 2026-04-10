import { computed, nextTick, ref, watch, type Ref } from 'vue'
import { formatDigits, toDigits } from '@/utils/numericInput'

type UseNumericInputOptions = {
  isFocused: Ref<boolean>
  minWidth?: number
}

export function useNumericInput(value: Ref<number | null>, options: UseNumericInputOptions) {
  const { isFocused, minWidth = 72 } = options
  const displayValue = ref('')

  const inputWidth = computed(() => {
    const characters = Math.max(displayValue.value.length, 1)
    return `${Math.max(minWidth, characters * 11 + 24)}px`
  })

  watch(
    value,
    (newValue) => {
      if (isFocused.value) {
        return
      }

      displayValue.value = formatDigits(toDigits(newValue))
    },
    { immediate: true },
  )

  function updateValue(newValue: unknown) {
    const digits = toDigits(newValue)

    displayValue.value = formatDigits(digits)
    value.value = digits === '' ? null : Number(digits)
  }

  function handleBeforeInput(event: InputEvent) {
    if (event.inputType.startsWith('delete')) {
      return
    }

    if (event.data && /\D/.test(event.data)) {
      event.preventDefault()
    }
  }

  function handlePaste(event: ClipboardEvent) {
    const input = event.target as HTMLInputElement | null

    if (!input) {
      return
    }

    const pastedText = event.clipboardData?.getData('text') ?? ''
    const isDigitsOnly = /^\d+$/.test(pastedText)

    if (!isDigitsOnly) {
      event.preventDefault()
      return
    }

    event.preventDefault()

    const selectionStart = input.selectionStart ?? input.value.length
    const selectionEnd = input.selectionEnd ?? selectionStart
    const leftDigits = toDigits(input.value.slice(0, selectionStart))
    const rightDigits = toDigits(input.value.slice(selectionEnd))
    const nextDigits = `${leftDigits}${pastedText}${rightDigits}`
    const caretDigitIndex = leftDigits.length + pastedText.length

    updateValue(nextDigits)

    void nextTick(() => {
      const nextCaretPosition = getCaretPositionFromDigitIndex(
        formatDigits(nextDigits),
        caretDigitIndex,
      )

      input.setSelectionRange(nextCaretPosition, nextCaretPosition)
    })
  }

  function syncDisplayValue() {
    displayValue.value = formatDigits(toDigits(value.value))
  }

  return {
    displayValue,
    inputWidth,
    updateValue,
    handleBeforeInput,
    handlePaste,
    syncDisplayValue,
  }
}

function getCaretPositionFromDigitIndex(formattedValue: string, digitIndex: number) {
  if (digitIndex <= 0) {
    return 0
  }

  let seenDigits = 0

  for (let i = 0; i < formattedValue.length; i += 1) {
    const character = formattedValue[i]

    if (character && /\d/.test(character)) {
      seenDigits += 1
    }

    if (seenDigits === digitIndex) {
      return i + 1
    }
  }

  return formattedValue.length
}
