<script setup async>
import { useUserStore } from "@/stores/user"
import { useTaskStore } from "@/stores/task"
import { onMounted, ref, computed, nextTick } from "vue"
import UserComponent from "@/components/UserComponent.vue"

const userStore = useUserStore()
const taskStore = useTaskStore()

const userName = userStore.user.user.user_metadata.name
const userId = userStore.user.user.id

let taskTitle = ref("")
const editingTask = ref(null)

onMounted(async () => {
  try {
    await taskStore.fetchTasks()
    editingTask.value = Array(taskStore.tasks.length).fill(false)
  } catch (error) {
    console.error(error)
  }
})

const errorMessage = (errorStr) => {
  if (errorStr === "add") alert("The task must longer than 3 characters")
}

const addTask = async () => {
  const title = taskTitle.value
  taskTitle.value = ""
  if (title.length <= 3) {
    errorMessage("add")
    return
  }
  await taskStore.addTask(userId, title)
}

const sortedTasks = computed(() => {
  const tasks = [...taskStore.tasks]
  tasks.sort((a, b) => a.id - b.id)

  return tasks
})

const toggleEditing = (task) => {
  if (editingTask.value === task) {
    editingTask.value = null
    taskStore.editTask(task.id, task.title)
  } else {
    editingTask.value = task

    nextTick(() => {
      const input = document.getElementById("editInput")
      input.focus()
      input.select()
    })
  }
}
</script>

<template>
  <Suspense>
    <UserComponent></UserComponent>
  </Suspense>

  <h1 class="text-7xl">Task</h1>

  <ul>
    <li v-for="task in sortedTasks" :key="task.id">
      <div v-if="editingTask === task">
        <input id="editInput" v-model="task.title" type="text" />
      </div>
      <p
        v-else
        @click="taskStore.completedTask(task.id, task.is_completed)"
        :class="{
          'bg-gray-100 text-slate-400 line-through': task.is_completed,
          'bg-gray-400': !task.is_completed,
        }"
      >
        {{ task.title }}
      </p>
      <button
        v-if="editingTask !== task"
        @click="toggleEditing(task)"
        class="rounded bg-amber-400 text-black"
      >
        edit
      </button>
      <button
        v-else
        @click="toggleEditing(task)"
        class="rounded bg-green-700 text-white"
      >
        ok
      </button>
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
