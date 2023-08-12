<script setup async>
import { useUserStore } from "@/stores/user"
import { useTaskStore } from "@/stores/task"
import { onMounted, ref } from "vue"

const userStore = useUserStore()
const taskStore = useTaskStore()

const userName = userStore.user.user.user_metadata.name
const userId = userStore.user.user.id
let taskTitle = ref()

onMounted(async () => {
  taskStore.fetchTasks()
})

const addTask = async () => {
  const added = await taskStore.addTask(userId, taskTitle.value)
  if (added) {
    taskTitle.value = ""
  }
}
</script>

<template>
  <p class="bg-red-500">caracolaA!!</p>
  <Suspense>
    <p>User: {{ userName }}</p>
  </Suspense>
  <button class="rounded border bg-blue-500" @click="userStore.handleSignOut">
    Sign Out
  </button>

  <br /><br />

  <h1 class="text-7xl">Task</h1>

  <ul>
    <li
      @click="taskStore.completedTask(task.id, task.is_completed)"
      v-for="task in taskStore.tasks"
    >
      <p v-if="task.is_completed" class="bg-gray-100 text-slate-400 line-through">
        {{ task.title }} {{ task.is_completed }}
      </p>
      <p v-else class="bg-gray-100">{{ task.title }} {{ task.is_completed }}</p>
      <!-- <button
        @click="taskStore.editTask(task.id, title)"
        class="rounded bg-green-700 text-white"
      >
        edit
      </button> -->
      <button
        @click="taskStore.deleteTask(task.id)"
        class="rounded bg-red-700 text-white"
      >
        delete
      </button>
    </li>
  </ul>

  <input
    id="addTask"
    v-model="taskTitle"
    placeholder="Write a task to add"
    type="text"
  />
  <button class="rounded border bg-blue-500" @click="addTask">Add task</button>
</template>
