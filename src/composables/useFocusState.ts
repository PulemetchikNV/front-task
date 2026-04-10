import { ref } from 'vue'

export function useFocusState() {
  const isFocused = ref(false)

  function handleFocusIn() {
    isFocused.value = true
  }

  function handleFocusOut() {
    isFocused.value = false
  }

  return {
    isFocused,
    handleFocusIn,
    handleFocusOut,
  }
}
