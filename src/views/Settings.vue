<script setup lang="ts">
import { store } from '@/store'
import InputNumber from '../components/InputNumber.vue'

function updateMinimumAge(value: unknown) {
  store.minimumAgeInMonths = Number(value) || 0
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <router-link to="/" class="text-violet-600 hover:underline text-sm">&larr; Back</router-link>

    <h1 class="text-xl font-bold text-gray-700">Settings</h1>

    <div>
      <div class="flex items-center gap-2">
        <InputNumber 
          :model-value="store.minimumAgeInMonths"
          label="MINIMUM AGE"
          caption="months"
          @update:model-value="($event) => updateMinimumAge($event)"
        />
      </div>
    </div>
  </div>
</template>
