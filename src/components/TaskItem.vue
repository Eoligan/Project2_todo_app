<script setup>
import { useTaskStore } from "@/stores/task"
import { computed, onMounted, nextTick, ref } from "vue"
import { Icon } from "@iconify/vue"
import errorMessage from "../lib/errors"

const taskStore = useTaskStore()
const editMode = ref(null)
let taskTitle = ref("")

onMounted(async () => {
  try {
    await taskStore.fetchTasks()
    editMode.value = Array(taskStore.tasks.length).fill(false)
  } catch (error) {
    console.error(error)
  }
})

const sortedTasks = computed(() => {
  const tasks = [...taskStore.tasks]
  tasks.sort((a, b) => a.id - b.id)
  return tasks
})

const toggleEditButton = (task) => {
  taskTitle = task.title

  if (editMode.value === task) {
    editMode.value = null
  } else {
    editMode.value = task

    nextTick(() => {
      const input = document.getElementById("editInput")
      input.focus()
      input.select()
    })
  }
}

const editTask = (id, title) => {
  if (title.length < 3) {
    errorMessage("edit")
  } else {
    taskStore.editTask(id, title)
  }
  editMode.value = null
}
</script>

<template>
  <div class="flex flex-wrap justify-center gap-4">
    <li
      class="flex w-3/5 items-center justify-between"
      v-for="task in sortedTasks"
      :key="task.id"
    >
      <div
        class="flex w-full items-center justify-between"
        v-if="editMode === task"
      >
        <input
          class="flex-1 rounded p-3"
          id="editInput"
          v-model="taskTitle"
          type="text"
          @keydown.enter="editTask(task.id, taskTitle)"
          @keydown.esc="toggleEditButton(task)"
        />
      </div>
      <p
        class="flex-1 cursor-pointer break-all rounded p-3 hover:ring-2"
        v-else
        @click="taskStore.completedTask(task.id, task.is_completed)"
        :class="{
          'bg-slate-50 text-slate-400/80 line-through shadow hover:ring-slate-200 active:bg-slate-200':
            task.is_completed,
          'bg-brand-100/50 shadow hover:ring-brand-200 active:bg-brand-200':
            !task.is_completed,
        }"
      >
        {{ task.title }}
      </p>

      <button
        v-if="editMode !== task"
        @click="toggleEditButton(task)"
        class="mx-3 rounded bg-slate-50 p-3 shadow hover:ring-2 hover:ring-slate-200 active:bg-slate-200"
      >
        <Icon icon="material-symbols:edit" class="h-6 w-6 text-yellow-400" />
      </button>
      <button
        v-else
        @click="editTask(task.id, taskTitle)"
        class="mx-3 rounded bg-green-700 p-3 shadow hover:bg-green-600 hover:ring-2 hover:ring-slate-200 active:bg-green-500"
      >
        <Icon
          class="-m-1 h-8 w-8 text-white"
          icon="material-symbols:done-rounded"
        />
      </button>
      <button
        v-if="editMode !== task"
        @click="taskStore.deleteTask(task.id)"
        class="rounded bg-slate-50 p-3 shadow hover:ring-2 hover:ring-slate-200 active:bg-slate-200"
      >
        <Icon class="h-6 w-6 text-red-700" icon="material-symbols:delete" />
      </button>
      <button
        v-else
        @click="toggleEditButton(task)"
        class="rounded bg-red-700 p-3 shadow hover:bg-red-600 hover:ring-2 hover:ring-slate-200 active:bg-red-500"
      >
        <Icon
          class="-m-1 h-8 w-8 text-white"
          icon="material-symbols:close-rounded"
        />
      </button>
    </li>
  </div>
</template>
