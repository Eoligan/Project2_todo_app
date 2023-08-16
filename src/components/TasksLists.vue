<script setup>
import { ref } from "vue"
import { useTaskStore } from "@/stores/task"
import { useUserStore } from "@/stores/user"
import TaskItem from "@/components/TaskItem.vue"
import errorMessage from "../lib/errors"

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
  <main class="font-averia">
    <h1 class="text-7xl">Task</h1>
    <input
      id="addTask"
      v-model="taskTitle"
      placeholder="Write a task to add"
      type="text"
    />
    <button class="rounded border bg-blue-500" @click="addTask">
      Add task
    </button>

    <ul>
      <TaskItem></TaskItem>
    </ul>
  </main>
</template>
