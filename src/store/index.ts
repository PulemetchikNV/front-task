import { reactive } from 'vue'

export interface Person {
  id: number
  name: string
  ageInHours: number | null
}

export interface AppState {
  people: Person[]
  minimumAgeInMonths: number | null
}

export const store = reactive<AppState>({
  people: [
    { id: 1, name: 'Samuel', ageInHours: 262800 },
    { id: 2, name: 'Bob', ageInHours: 350400 },
    { id: 3, name: 'Charlie', ageInHours: 219000 },
  ],
  minimumAgeInMonths: 0,
})
