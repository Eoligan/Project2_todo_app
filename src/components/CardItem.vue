<script setup>
import { ref, onMounted } from "vue"
import { useTaskStore } from "@/stores/task"
import { useCardStore } from "../stores/card"
import { Icon } from "@iconify/vue"

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
  // const hour = _date.getHours().toString().padStart(2, "0")
  // const min = _date.getMinutes().toString().padStart(2, "0")

  formatted.value.date = `${day}/${month}/${year}`
  // formatted.value.time = `${hour}:${min}`
}
</script>

<template>
  <div class="w-full border-b border-stone-300 px-3 py-2 text-center text-lg">
    {{ card.title }}
  </div>
  <div class="self-end p-2 text-xs italic text-stone-400">
    {{ formatted.date }}
    <!-- {{ formatted.time }} -->
  </div>
  <ul class="mt-2 grow space-y-2 self-start pl-3 pr-2 text-[0.925rem]">
    <li
      v-for="task in taskStore.previewTasks[props.card.id]"
      :key="task.id"
      class="line-clamp-1 before:pr-1 before:content-['\2022']" :class="{'line-through' : task.is_completed}"
    >
      {{ task.title }}
    </li>
  </ul>
  <button
    @click.prevent="cardStore.deleteCard(card.id)"
    class="self-end rounded-full"
  >
    <Icon
      class="z-10 m-1 h-6 w-6 text-red-700 hover:!text-red-600 group-hover:text-red-700 lg:text-transparent lg:group-hover:text-red-700"
      icon="material-symbols:delete"
    />
  </button>
</template>
