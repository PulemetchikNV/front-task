<script setup lang="ts">
import { useId } from 'vue'
import { useFocusState } from '@/composables/useFocusState'
import { useNumericInput } from '@/composables/useNumericInput'
import { parseDigitsToNumber } from '@/utils/numericInput'

defineOptions({
    name: 'InputNumber',
})

const props = defineProps<{
    photoSrc?: string
    label?: string
    caption?: string
}>()

const value = defineModel<number | null>({ 
    default: null,
    set(newValue: unknown) {
        return parseDigitsToNumber(newValue)
    }
})

const id = useId()
const { isFocused, handleFocusIn, handleFocusOut: clearFocus } = useFocusState()
const {
    displayValue,
    inputWidth,
    updateValue,
    handleBeforeInput,
    handlePaste,
    syncDisplayValue,
} = useNumericInput(value, { isFocused })

function handleFocusOut() {
    clearFocus()
    syncDisplayValue()
}
</script>

<template>
    <div class="flex items-center gap-3">
        <img
            v-if="photoSrc"
            :src="(photoSrc)"
            :alt="label"
            class="h-[80px] w-[80px] rounded-full object-cover p-[4px] box-content outline-1 transition-[outline-color] duration-200 ease-out"
            :class="isFocused ? 'outline-violet-500' : 'outline-transparent'"
        />
        <div class="flex flex-col">
            <label
                v-if="label"
                :for="id"
                :class="isFocused ? 'text-violet-700' : 'text-[#1E0E4C]'"
                class="font-label block mb-[10px] transition-colors duration-200 ease-out"
            > 
                {{ label }}
            </label>
            <div class="flex items-center gap-2">
                <input
                    :id="id"
                    :value="displayValue"
                    :style="{ width: inputWidth }"
                    inputmode="numeric"
                    :class="isFocused ? 'text-violet-950' : 'text-[#CFCADF]'"
                    class="font-caption cursor-pointer box-border h-[44px] rounded-[6px] border border-violet-200 bg-white px-[8px] pr-[16px] py-[8px] text-[18px] leading-[100%] font-normal caret-violet-500 outline-none transition-[border-color,color] duration-200 ease-out focus:border-[1.5px] focus:border-violet-500"
                    @beforeinput="handleBeforeInput"
                    @input="updateValue(($event.target as HTMLInputElement).value)"
                    @paste="handlePaste"
                    @focusin="handleFocusIn"
                    @focusout="handleFocusOut"
                />
                <span class="font-caption leading-[100%] text-[#1E0E4C]">{{ caption }}</span>
            </div>
        </div>
    </div>
</template>
