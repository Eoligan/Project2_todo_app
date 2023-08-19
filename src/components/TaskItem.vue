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
  <div class="flex flex-wrap w-full gap-4">
    <li
      class="group flex w-full font-sans-serif"
      v-for="task in sortedTasks"
      :key="task.id"
    >
      <div
        class="flex flex-1 items-center justify-between"
        v-if="editMode === task"
      >
        <input
          class="flex-1 rounded border-none p-3 ring-2 ring-slate-600 focus:border-none focus:ring-2 focus:ring-brand"
          id="editInput"
          v-model="taskTitle"
          type="text"
          @keydown.enter="editTask(task.id, taskTitle)"
          @keydown.esc="toggleEditButton(task)"
        />
      </div>

      <div
        v-else
        @click="taskStore.completedTask(task.id, task.is_completed)"
        :class="{
          ' bg-slate-200 text-slate-400/80 line-through shadow hover:text-slate-500/80 hover:ring-brand active:bg-slate-200':
            task.is_completed,
          'bg-brand-100/50 shadow hover:ring-brand-200 active:bg-brand-200':
            !task.is_completed,
        }"
        class="group flex-1 cursor-pointer items-center justify-between break-all rounded ring-2 ring-brand-200/50 hover:ring-2"
      >
        <input
          type="checkbox"
          name="is_completed"
          class="check m-3 mx-2 h-6 w-6 rounded-sm border-brand text-brand-100/70 focus:ring-brand group-hover:bg-slate-300 group-hover:text-brand-100 checked:group-hover:bg-current"
          :checked="task.is_completed"
        />
        <label class="py-3">
          {{ task.title }}
        </label>
      </div>

      <button
        v-if="editMode !== task"
        @click="toggleEditButton(task)"
        class="mx-3 rounded bg-slate-200 p-3 shadow ring-2 ring-brand-200/50 hover:ring-brand active:bg-slate-300"
      >
        <Icon icon="material-symbols:edit" class="h-6 w-6 text-yellow-500" />
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
        class="rounded bg-slate-200 p-3 shadow ring-2 ring-brand-200/50 hover:ring-brand active:bg-slate-300"
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
