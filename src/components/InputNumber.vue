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
    return `${Math.max(72, characters * 11 + 24)}px`
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
            :class="isFocused ? 'outline-1 outline-violet-500' : ''"
        />
        <div class="flex flex-col">
            <label
                v-if="label"
                :for="id"
                :class="isFocused ? 'text-violet-700' : 'text-[#1E0E4C]'"
                class="font-label block mb-[10px]"
            > 
                {{ label }}
            </label>
            <div class="flex items-center gap-2">
                <input
                    :id="id"
                    :value="displayValue"
                    :style="{ width: inputWidth }"
                    :class="isFocused ? 'text-violet-950' : 'text-[#CFCADF]'"
                    class="font-caption cursor-pointer box-border h-[44px] rounded-[6px] border border-violet-200 bg-white px-[8px] pr-[16px] py-[8px] text-[18px] leading-[100%] font-normal caret-violet-500 outline-none focus:border-[1.5px] focus:border-violet-500"
                    @input="updateValue(($event.target as HTMLInputElement).value)"
                    @focusin="handleFocusIn"
                    @focusout="handleFocusOut"
                />
                <span class="font-caption leading-[100%] text-[#1E0E4C]">{{ caption }}</span>
            </div>
        </div>
    </div>
</template>
