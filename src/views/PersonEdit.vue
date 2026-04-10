<script setup lang="ts">
import InputNumber from '../components/InputNumber.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { store } from '@/store'

const route = useRoute()

const person = computed(() => {
  const id = Number(route.params.id)
  return store.people.find((p) => p.id === id)
})

const ageInHoursModel = computed<number | null>({
  get: () => person.value?.ageInHours ?? null,
  set: (value) => {
    if (person.value) {
      person.value.ageInHours = value
    }
  },
})
</script>

<template>
  <div v-if="person" class="flex flex-col gap-4">
    <router-link to="/" class="text-violet-600 hover:underline text-sm">&larr; Back</router-link>

    <InputNumber 
      v-model="ageInHoursModel"
      :label="`${person.name.toUpperCase()} IS`"
      caption="hours old"
      photoSrc="/img.jpg"
    ></InputNumber>
  </div>

  <div v-else>
    <p class="text-gray-600">Person not found</p>
    <router-link to="/" class="text-violet-600 hover:underline text-sm">Back to list</router-link>
  </div>
</template>
