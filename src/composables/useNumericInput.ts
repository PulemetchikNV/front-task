import { computed, ref, watch, type Ref } from 'vue'
import { formatDigits, parseDigitsToNumber, toDigits } from '@/utils/numericInput'

type UseNumericInputOptions = {
  isFocused: Ref<boolean>
  minWidth?: number
}

export function useNumericInput(value: Ref<number>, options: UseNumericInputOptions) {
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
    value.value = digits === '' ? 0 : Number(digits)
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
    const pastedText = event.clipboardData?.getData('text') ?? ''

    if (/\D/.test(pastedText)) {
      event.preventDefault()
      updateValue(pastedText)
    }
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
    parseDigitsToNumber,
  }
}
