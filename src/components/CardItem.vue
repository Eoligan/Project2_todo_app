<script setup>
import { ref, onMounted } from "vue"
import { useTaskStore } from "@/stores/task"

const props = defineProps({
  card: Object,
})
const taskStore = useTaskStore()

onMounted(async () => {
  formatDate()
  await taskStore.getPreviewTasks(props.card.id)
  console.log(taskStore.previewTasks[0][0])
})

const formatted = ref({
  date: null,
  time: null,
})
const formatDate = () => {
  const _date = new Date(props.card.inserted_at)
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

  <ul class="grow self-start px-4 pt-5">
    <!-- <li v-for="task in taskStore.previewTasks[props.card.id]" :key="task.id">
      {{ task.title }}
    </li> -->
  </ul>
</template>
