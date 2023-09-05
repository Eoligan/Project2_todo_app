<script setup>
import { ref } from "vue"

const props = defineProps({
  card: Object,
})

const formatted = ref({
  date: null,
  time: null,
})
const formatDate = () => {
  console.log("entra: ", card.inserted_at)
  const _date = new Date(card.inserted_at)
  const day = _date.getDate()
  const month = _date.getMonth() + 1
  const year = _date.getFullYear()
  const hour = _date.getHours().toString().padStart(2, "0")
  const min = _date.getMinutes().toString().padStart(2, "0")

  formatted.value.date = `${day}/${month}/${year}`
  formatted.value.time = `${hour}:${min}`
}
</script>

<template>
  <div class="w-full border-b border-stone-300 px-3 py-2 text-center text-lg">
    {{ card.title }}
  </div>
  <div class="self-end p-2 text-xs italic text-stone-400">
    {{ formatted.date }}
    {{ formatted.time }}
  </div>

  <div class="grow self-start px-4 pt-5">asdada</div>
</template>
