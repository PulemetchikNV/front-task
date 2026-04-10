<script setup lang="ts">
import {ref, useId} from 'vue'

defineOptions({
    name: 'InputNumber',
})

const props = defineProps<{
    photoSrc?: string
    label?: string
    caption?: string
}>()

const value = defineModel<number>('value', { 
    default: 0,
    set(newValue: unknown) {
        let oldValue = value.value
        if (isNaN(value)) {
            console.log({oldValue, newValue})
            return oldValue
        }
        return newValue
    }
})

const id = useId()
const displayValue = ref('')
const isFocued = ref<boolean>(false)

function updateValue(newValue: unknown) {

}

</script>

<template>
    <div class="flex items-center gap-3">
        <img
            v-if="photoSrc"
            :src="(photoSrc)"
            :alt="name"
            class="w-[80px] h-[80px] rounded-full object-cover p-[4px] box-content"
            :class="isFocued ? 'outline-2 outline-violet-500' : ''"
        />
        <div class="flex flex-col">
            <label 
                :for="id"
                :class="isFocued ? 'text-violet-700' : 'text-gray-700'"
                class="block text-sm font-bold tracking-wide"
            > 
                {{ label }}
            </label>
            <div class="flex items-center gap-2">
                <input
                    :id="id"
                    :value="displayValue"
                    class="border-2 border-gray-300 focus:border-violet-600 rounded px-2 py-1 text-lg outline-none"
                    @input="($event) => value = $event.target.value"
                    @focusin="isFocued = true"
                    @focusout="isFocued = false"
                />
                <span class="text-gray-600">hours old</span>
            </div>
        </div>
    </div>
</template>