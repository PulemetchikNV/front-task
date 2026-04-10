<script setup lang="ts">
import { computed, ref, useId, watch } from 'vue'

defineOptions({
    name: 'InputNumber',
})

const props = defineProps<{
    photoSrc?: string
    label?: string
    caption?: string
}>()

const value = defineModel<number>({ 
    default: 0,
    set(newValue: unknown) {
        const digits = toDigits(newValue)

        if (!digits) {
            return 0
        }

        return Number(digits)
    }
})

const id = useId()
const displayValue = ref('')
const isFocused = ref(false)
const inputWidth = computed(() => {
    const characters = Math.max(displayValue.value.length, 1)
    return `${Math.max(72, characters * 12 + 16)}px`
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

function toDigits(newValue: unknown) {
    return String(newValue ?? '').replace(/\D/g, '')
}

function formatDigits(digits: string) {
    return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

function updateValue(newValue: unknown) {
    const digits = toDigits(newValue)

    displayValue.value = formatDigits(digits)
    value.value = digits === '' ? 0 : Number(digits)
}

function handleFocusIn() {
    isFocused.value = true
}

function handleFocusOut() {
    isFocused.value = false
    displayValue.value = formatDigits(toDigits(value.value))
}
</script>

<template>
    <div class="flex items-center gap-3">
        <img
            v-if="photoSrc"
            :src="(photoSrc)"
            :alt="label"
            class="w-[80px] h-[80px] rounded-full object-cover p-[4px] box-content"
            :class="isFocused ? 'outline-2 outline-violet-500' : ''"
        />
        <div class="flex flex-col">
            <label 
                :for="id"
                :class="isFocused ? 'text-violet-700' : 'text-gray-700'"
                class="font-label block mb-3"
            > 
                {{ label }}
            </label>
            <div class="flex items-center gap-2">
                <input
                    :id="id"
                    :value="displayValue"
                    :style="{ width: inputWidth }"
                    class="border-2 border-gray-300 focus:border-violet-600 rounded px-2 py-1 text-lg outline-none"
                    @input="updateValue(($event.target as HTMLInputElement).value)"
                    @focusin="handleFocusIn"
                    @focusout="handleFocusOut"
                />
                <span class="font-caption text-gray-600">{{ caption }}</span>
            </div>
        </div>
    </div>
</template>
