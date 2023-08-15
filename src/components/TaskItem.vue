<script setup>
import { useTaskStore } from "@/stores/task"
import { computed, onMounted, nextTick, ref } from "vue"
import { Icon } from "@iconify/vue";

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
  <div class="flex justify-center flex-wrap gap-4">
    <li class="flex items-center justify-between w-3/5" v-for="task in sortedTasks" :key="task.id">
      <div  class="flex items-center justify-between w-full" v-if="editingTask === task">
        <input class="flex-1 p-3 rounded" id="editInput" v-model="task.title" type="text" @keydown.enter="toggleEditing(task)" @keydown.esc="toggleEditing(task)"/>
      </div>
      <p class="p-3 rounded flex-1 cursor-pointer hover:ring-2"
        v-else
        @click="taskStore.completedTask(task.id, task.is_completed)"
        :class="{
          'bg-slate-50 line-through text-slate-400/80 shadow active:bg-slate-200 hover:ring-slate-200': task.is_completed,
          'bg-brand-100/50 shadow hover:ring-brand-200 active:bg-brand-200': !task.is_completed,
        }"
      >
        {{ task.title }}
      </p>
       
      <button
        v-if="editingTask !== task"
        @click="toggleEditing(task)"
        class="rounded mx-3 p-3 shadow bg-slate-50 hover:ring-2 hover:ring-slate-200 active:bg-slate-200"
      >
      <Icon icon="material-symbols:edit" class="w-6 h-6 text-yellow-400" />
      </button>
      <button
        v-else
        @click="toggleEditing(task)"
        class="rounded mx-3 p-3 shadow bg-green-700 hover:ring-2 hover:ring-slate-200 active:bg-slate-200"
      >
      <Icon class=" text-white w-8 h-8 -m-1" icon="material-symbols:done-rounded" />
      </button>
      <button
        @click="taskStore.deleteTask(task.id)"
        class="rounded shadow bg-slate-50 p-3 hover:ring-2 hover:ring-slate-200 active:bg-slate-200"
      >
      <Icon class="w-6 h-6 text-red-700" icon="material-symbols:delete" />
      </button>
    </li>
  </div>
</template>
