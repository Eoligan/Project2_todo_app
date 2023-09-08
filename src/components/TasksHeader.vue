<script setup>
import { ref, onMounted } from "vue"
import { useTaskStore } from "@/stores/task"
import { useUserStore } from "@/stores/user"
import { useCardStore } from "@/stores/card"
import { Icon } from "@iconify/vue"
import ErrorComponent from "@/components/ErrorComponent.vue"
import { useRoute, RouterLink } from "vue-router"

const taskStore = useTaskStore()
const userStore = useUserStore()
const cardStore = useCardStore()
let taskTitle = ref("")

const isLengthOk = ref(true)

const route = useRoute()

const addTask = async () => {
  const title = taskTitle.value
  taskTitle.value = ""
  if (title.length < 3) {
    isLengthOk.value = false

    setTimeout(() => {
      isLengthOk.value = true
    }, 4000)
    return
  }
  await taskStore.addTask(userStore.user.id, title, route.params.id)
}

const getCardTitle = async () => {
  const response = await cardStore.getCardById(route.params.id)
  return response[0].title
}

const card_title = ref()
onMounted(async () => {
  card_title.value = await getCardTitle()
})
</script>

<template>
  <div class="flex w-full items-center gap-x-4">
    <div class="transition-all duration-150 ease-in hover:text-brand">
      <RouterLink :to="{ name: 'cardview' }">
        <Icon class="h-8 w-8" icon="material-symbols:arrow-back" />
      </RouterLink>
    </div>
    <h2
      class="relative w-full flex-1 place-self-start font-sans-serif text-3xl text-black md:text-4xl"
    >
      {{ card_title }}
    </h2>
    <div class="group relative flex h-8 w-full grow items-center">
      <div v-if="!isLengthOk" class="absolute left-0 top-[3.25rem]">
        <ErrorComponent message="At least 3 characters" />
      </div>
      <input
        id="addTask"
        v-model="taskTitle"
        placeholder="Write a task to add"
        type="text"
        class="ml-2 h-8 w-full border-b-2 border-black border-x-transparent border-t-transparent pl-2 font-sans-serif focus:rounded focus:border-transparent focus:text-black focus:outline-none focus:ring-2 focus:ring-brand"
        @keydown.enter="addTask"
      />
      <button @click="addTask" class="ml-2 min-w-fit">
        <Icon
          icon="material-symbols:add"
          width="2.5rem"
          height="2.5rem"
          class="text-black transition-all duration-150 ease-in hover:text-brand"
        />
      </button>
    </div>
  </div>
</template>

<style></style>
