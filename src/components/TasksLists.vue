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
<!-- after:absolute after:-left-0 after:bottom-1 after:-z-10 after:h-5 after:-skew-x-12 after:rounded-b after:bg-gradient-to-t after:from-slate-300 after:via-slate-100 after:to-transparent sm:after:w-60 -->
<template>
  <main class="flex flex-col items-center justify-center gap-6 font-averia">
    <h2
      class="relative place-self-start font-averia-bold text-5xl text-secondary after:w-48 sm:text-6xl sm:after:h-6"
    >
      Task List
    </h2>
    <div class="group flex w-full items-center gap-2 rounded">
      <input
        id="addTask"
        v-model="taskTitle"
        placeholder="Write a task to add"
        type="text"
        class="flex-1 border-none font-sans-serif ring-0 focus:border-none focus:outline-none focus:ring-0"
        @keydown.enter="addTask"
      />
      <span>
        <button class="" @click="addTask">
          <Icon
            icon="material-symbols:add"
            class="h-10 w-10 rounded-r bg-secondary text-white ring-2 ring-secondary hover:bg-secondary/80 hover:ring-secondary/80 active:bg-secondary/60 active:ring-secondary/60"
          />
        </button>
      </span>
    </div>

    <div class="mt-8 flex w-full items-center justify-center">
      <TaskItem></TaskItem>
    </div>
  </main>
</template>
