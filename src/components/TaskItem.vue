<script setup>
import { useTaskStore } from "@/stores/task"
import { computed, onMounted, nextTick, ref } from "vue"

const taskStore = useTaskStore()
const editingTask = ref(null)

onMounted(async () => {
  try {
    await taskStore.fetchTasks()
    editingTask.value = Array(taskStore.tasks.length).fill(false)
  } catch (error) {
    console.error(error)
  }
})

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
  <li v-for="task in sortedTasks" :key="task.id">
    <div v-if="editingTask === task">
      <input id="editInput" v-model="task.title" type="text" @keydown.enter="toggleEditing(task)"/>
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
</template>
