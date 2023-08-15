<script setup>
import { useTaskStore } from "@/stores/task"
import { computed, onMounted, nextTick, ref } from "vue"
import { Icon } from "@iconify/vue"

const taskStore = useTaskStore()
const editingTask = ref(null)
let prevTask = ref(null)

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

const toggleEditing = (task, cancel) => {
  console.log(cancel)
  if (!cancel) {
    prevTask = task
  }

  if (editingTask.value === task) {
    if (!cancel) {
      taskStore.editTask(task.id, task.title)
    } else {
      console.log("prevtask", prevTask.title)
      console.log("currenttask", task.title)
      taskStore.editTask(task.id, prevTask.title)
    }
    editingTask.value = null
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
  <div class="flex flex-wrap justify-center gap-4">
    <li
      class="flex w-3/5 items-center justify-between"
      v-for="task in sortedTasks"
      :key="task.id"
    >
      <div
        class="flex w-full items-center justify-between"
        v-if="editingTask === task"
      >
        <input
          class="flex-1 rounded p-3"
          id="editInput"
          v-model="task.title"
          type="text"
          @keydown.enter="toggleEditing(task, false)"
          @keydown.esc="toggleEditing(task, false)"
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
        v-if="editingTask !== task"
        @click="toggleEditing(task, false)"
        class="mx-3 rounded bg-slate-50 p-3 shadow hover:ring-2 hover:ring-slate-200 active:bg-slate-200"
      >
        <Icon icon="material-symbols:edit" class="h-6 w-6 text-yellow-400" />
      </button>
      <button
        v-else
        @click="toggleEditing(task, false)"
        class="mx-3 rounded bg-green-700 p-3 shadow hover:bg-green-600 hover:ring-2 hover:ring-slate-200 active:bg-green-500"
      >
        <Icon
          class="-m-1 h-8 w-8 text-white"
          icon="material-symbols:done-rounded"
        />
      </button>
      <button
        v-if="editingTask !== task"
        @click="taskStore.deleteTask(task.id)"
        class="rounded bg-slate-50 p-3 shadow hover:ring-2 hover:ring-slate-200 active:bg-slate-200"
      >
        <Icon class="h-6 w-6 text-red-700" icon="material-symbols:delete" />
      </button>
      <button
        v-else
        @click="toggleEditing(task, true)"
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
