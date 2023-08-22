<script setup>
import { useTaskStore } from "@/stores/task"
import { computed, onMounted, nextTick, ref } from "vue"
import { Icon } from "@iconify/vue"
import draggable from "vuedraggable"
import errorMessage from "@/lib/errors"

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

const dragOptions = computed(() => {
  return {
    animation: 200,
    group: "transition-group",
    disabled: false,
    ghostClass: "ghost",
  }
})

const toggleEditButton = (task) => {
  taskTitle = task.title

  if (editMode.value === task) {
    editMode.value = null
  } else {
    editMode.value = task
  }
}

const focusOnEdit = () => {
  const input = document.getElementById("editInput")
  if (input) {
    nextTick(() => {
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
  <ul class="relative w-full space-y-4">
    <li
      v-for="element in sortedTasks"
      :key="element.id"
      class="group flex w-full font-sans-serif"
    >
      <transition
        name="editionModeTransition"
        mode="out-in"
        @after-leave="focusOnEdit"
        appear
      >
        <div
          class="flex flex-1 items-center justify-between"
          v-if="editMode === element"
        >
          <input
            class="flex-1 rounded border-none p-3 ring-2 ring-slate-600 focus:border-none focus:ring-2 focus:ring-brand"
            id="editInput"
            v-model="taskTitle"
            type="text"
            @keydown.enter="editTask(element.id, taskTitle)"
            @keydown.esc="toggleEditButton(element)"
          />
        </div>

        <div
          v-else
          @click="taskStore.completedTask(element.id, element.is_completed)"
          :class="{
            ' bg-slate-200 text-slate-400/80 line-through shadow shadow-black/10 hover:text-slate-500/80 hover:ring-brand active:bg-slate-200':
              element.is_completed,
            'bg-brand-100/50 shadow-black/30 hover:ring-brand-200 active:bg-brand-200':
              !element.is_completed,
          }"
          class="group flex-1 cursor-pointer items-center justify-between break-all rounded shadow-lg ring-2 ring-brand-200/50 hover:ring-2"
        >
          <input
            type="checkbox"
            name="is_completed"
            class="m-3 mx-2 h-6 w-6 cursor-pointer rounded-sm border-brand text-brand-100/70 focus:ring-brand group-hover:bg-slate-300 group-hover:text-brand-100 checked:group-hover:bg-current"
            :checked="element.is_completed"
          />
          <label class="cursor-pointer py-3">
            {{ element.title }} {{ element.id }}
          </label>
        </div>
      </transition>
      <transition name="editionModeTransition" mode="out-in">
        <button
          v-if="editMode !== element"
          @click="toggleEditButton(element)"
          class="mx-3 rounded bg-slate-200 p-3 shadow-lg shadow-black/30 ring-2 ring-brand-200/50 hover:ring-brand active:bg-slate-300"
        >
          <Icon icon="material-symbols:edit" class="h-6 w-6 text-yellow-500" />
        </button>
        <button
          v-else
          @click="editTask(element.id, taskTitle)"
          class="mx-3 rounded bg-green-700 p-3 shadow hover:bg-green-600 hover:ring-2 hover:ring-slate-200 active:bg-green-500"
        >
          <Icon
            class="-m-1 h-8 w-8 text-white"
            icon="material-symbols:done-rounded"
          />
        </button>
      </transition>
      <transition name="editionModeTransition" mode="out-in">
        <button
          v-if="editMode !== element"
          @click="taskStore.deleteTask(element.id)"
          class="rounded bg-slate-200 p-3 shadow-lg shadow-black/30 ring-2 ring-brand-200/50 hover:ring-brand active:bg-slate-300"
        >
          <Icon class="h-6 w-6 text-red-700" icon="material-symbols:delete" />
        </button>
        <button
          v-else
          @click="toggleEditButton(element)"
          class="rounded bg-red-700 p-3 hover:bg-red-600 hover:ring-2 hover:ring-slate-200 active:bg-red-500"
        >
          <Icon
            class="-m-1 h-8 w-8 text-white"
            icon="material-symbols:close-rounded"
          />
        </button>
      </transition>
    </li>
  </ul>
</template>

<style>
.listTransition-enter-from,
.listTransition-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}
.listTransition-enter-active,
.listTransition-move,
.listTransition-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
.listTransition-leave-active {
  position: absolute;
}

.editionModeTransition-enter-active,
.editionModeTransition-leave-active {
  transition: all 150ms ease;
}
.editionModeTransition-enter-from,
.editionModeTransition-leave-to {
  opacity: 0;
}
.editionModeTransition-leave-from,
.editionModeTransition-enter-to {
  opacity: 100;
}

.ghost {
  background-color: white;
}
</style>
