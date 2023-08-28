<script setup>
import { ref } from "vue"
import { useTaskStore } from "@/stores/task"
import { useUserStore } from "@/stores/user"
import TaskItem from "@/components/TaskItem.vue"
import errorMessage from "../lib/errors"
import { Icon } from "@iconify/vue"

const taskStore = useTaskStore()
const userStore = useUserStore()
let taskTitle = ref("")

const addTask = async () => {
  const title = taskTitle.value
  taskTitle.value = ""
  if (title.length <= 3) {
    errorMessage("add")
    return
  }
  await taskStore.addTask(userStore.user.id, title)
}
</script>

<template>
  <main class="flex flex-col items-center justify-center gap-6 font-averia">
    <h2
      class="after:w-48 relative font-averia-bold-italic text-5xl text-secondary after:absolute after:-left-0 after:bottom-1 after:-z-10 after:h-5 after:-skew-x-12 after:rounded-b after:bg-gradient-to-t after:from-slate-300 after:via-slate-100 after:to-transparent sm:text-6xl  sm:after:h-6 sm:after:w-60"
    >
      Task List
    </h2>
    <div
      class="flex w-11/12 items-center justify-between gap-2 md:w-4/5 lg:w-4/6"
    >
      <input
        id="addTask"
        v-model="taskTitle"
        placeholder="Write a task to add"
        type="text"
        class="flex-1 rounded border-none font-sans-serif text-sm ring-2 ring-slate-400 hover:ring-slate-900 focus:outline-none focus:ring-2 focus:ring-black"
        @keydown.enter="addTask"
      />
      <button class="" @click="addTask">
        <Icon
          icon="material-symbols:add-circle"
          class="h-10 w-10 rounded-full text-green-700 hover:text-green-600 active:text-green-500"
        />
      </button>
    </div>

    <div
      class="mt-8 flex w-11/12 items-center justify-center md:w-4/5 lg:w-4/6"
    >
      <TaskItem></TaskItem>
    </div>
  </main>
</template>
