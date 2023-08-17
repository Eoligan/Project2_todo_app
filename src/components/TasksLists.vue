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
const userId = userStore.user.user.id

const addTask = async () => {
  const title = taskTitle.value
  taskTitle.value = ""
  if (title.length <= 3) {
    errorMessage("add")
    return
  }
  await taskStore.addTask(userId, title)
}
</script>

<template>
  <main class="flex flex-col items-center justify-center gap-6 font-averia">
    <h2
      class="relative text-6xl after:absolute after:bottom-1 after:left-0 after:-z-10 after:h-3 after:w-full after:bg-slate-400"
    >
      Task List
    </h2>
    <div class="flex w-3/5 items-center justify-between gap-2">
      <input
        id="addTask"
        v-model="taskTitle"
        placeholder="Write a task to add"
        type="text"
        class="flex-1 rounded border-none font-sans-serif text-sm ring-2 ring-slate-400 hover:ring-slate-900 focus:outline-none focus:ring-2 focus:ring-black"
      />
      <button class="" @click="addTask">
        <Icon
          icon="material-symbols:add-circle"
          class="h-10 w-10 rounded-full text-green-700 hover:text-green-600 active:text-green-500"
        />
      </button>
    </div>

    <ul class="mt-8 flex w-3/5 items-center justify-center">
      <TaskItem></TaskItem>
    </ul>
  </main>
</template>
