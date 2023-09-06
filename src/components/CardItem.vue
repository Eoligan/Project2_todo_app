<script setup>
import { ref, onMounted } from "vue"
import { useTaskStore } from "@/stores/task"
import { useCardStore } from "../stores/card"

const props = defineProps({
  card: Object,
})
const cardStore = useCardStore()
const taskStore = useTaskStore()

onMounted(async () => {
  formatDate()
  await taskStore.getPreviewTasks(props.card.id)
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
  <ul class="mt-2 grow space-y-2 self-start pl-3 pr-2 text-[0.925rem]">
    <li
      v-for="task in taskStore.previewTasks[props.card.id]"
      :key="task.id"
      class="line-clamp-1 before:pr-1 before:content-['\2022']"
    >
      {{ task.title }}
    </li>
  </ul>
  <button
    @click.prevent="cardStore.deleteCard(card.id)"
    class="m-0.5 self-end rounded-full border border-red-500 px-1.5 py-0.5 text-sm text-red-500 transition-all duration-150 ease-in hover:bg-red-500 hover:text-white focus:bg-red-500 focus:text-white lg:border-transparent lg:text-transparent lg:hover:!text-white lg:group-hover:border-red-500 lg:group-hover:text-red-500"
  >
    Delete
  </button>
</template>
