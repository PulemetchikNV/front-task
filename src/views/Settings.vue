<script setup lang="ts">
import { computed } from 'vue'
import { store } from '@/store'
import InputNumber from '../components/InputNumber.vue'

const minimumAgeModel = computed<number | null>({
  get: () => store.minimumAgeInMonths,
  set: (value) => {
    store.minimumAgeInMonths = value
  },
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <router-link to="/" class="text-violet-600 hover:underline text-sm">&larr; Back</router-link>

    <h1 class="text-xl font-bold text-gray-700">Settings</h1>

    <div>
      <div class="flex items-center gap-2">
        <InputNumber 
          v-model="minimumAgeModel"
          label="MINIMUM AGE"
          caption="months"
        />
      </div>
    </div>
  </div>
</template>
