<script setup>
import { useTaskStore } from "@/stores/task"
import { onMounted, nextTick, ref } from "vue"
import { Icon } from "@iconify/vue"
import draggable from "zhyswan-vuedraggable"
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

const updateTasksIndex = (evt) => {
  const newIndex = evt.moved.newIndex

  let draggedItemNewIndex = 0
  if (taskStore.tasks[newIndex - 1]) {
    draggedItemNewIndex = taskStore.tasks[newIndex - 1].index
    draggedItemNewIndex++
  }

  taskStore.tasks[newIndex].index = draggedItemNewIndex

  for (let i = newIndex + 1; i < taskStore.tasks.length; i++) {
    draggedItemNewIndex++
    taskStore.tasks[i].index = draggedItemNewIndex
  }

  taskStore.updateTasksIndex(taskStore.tasks)
}
</script>

<template>
  <draggable
    class="relative w-full space-y-4"
    v-model="taskStore.tasks"
    item-key="id"
    :component-data="{
      tag: 'ul',
      name: 'listTransition',
      type: 'transition-group',
    }"
    ghost-class="ghost"
    tag="transition-group"
    @start="drag = true"
    @end="drag = false"
    @change="updateTasksIndex"
  >
    <template #item="{ element }" :key="element.id">
      <li class="group flex w-full font-sans-serif">
        <transition
          name="editionModeTransition"
          mode="out-in"
          @after-leave="focusOnEdit"
          appear
        >
          <div
            v-if="editMode !== element"
            @click="taskStore.completedTask(element.id, element.is_completed)"
            :class="{
              'bg-stone-100 line-through': element.is_completed,
              'bg-brand-100/10 shadow hover:shadow-md': !element.is_completed,
            }"
            class="group flex flex-1 cursor-pointer items-center justify-between break-all rounded"
          >
            <input
              type="checkbox"
              name="is_completed"
              class="m-3 mx-2 h-6 w-6 cursor-pointer rounded-sm border-brand text-brand group-hover:bg-brand group-hover:text-brand-300 checked:group-hover:bg-current"
              :checked="element.is_completed"
            />
            <label class="grow cursor-pointer px-2 py-3">
              {{ element.title }}
            </label>
            <button @click="toggleEditButton(element)" class="">
              <Icon
                width="1.5rem"
                height="1.5rem"
                icon="material-symbols:edit"
                class="m-2 text-transparent hover:!text-yellow-300 group-hover:text-yellow-500"
              />
            </button>
            <button @click="taskStore.deleteTask(element.id)" class="">
              <Icon
                class="mr-2 h-6 w-6 text-transparent hover:!text-red-500 group-hover:text-red-700"
                icon="material-symbols:delete"
              />
            </button>
          </div>

          <div class="flex flex-1 items-center justify-between" v-else>
            <input
              class="flex-1 rounded border-none p-3 focus:border-none"
              id="editInput"
              v-model="taskTitle"
              type="text"
              @keydown.enter="editTask(element.id, taskTitle)"
              @keydown.esc="toggleEditButton(element)"
            />
            <button
              @click="editTask(element.id, taskTitle)"
              class="rounded bg-green-700 shadow hover:bg-green-600 hover:ring-slate-200 active:bg-green-500"
            >
              <Icon
                class="-m-1 h-8 w-8 text-white"
                icon="material-symbols:done-rounded"
              />
            </button>
            <button
              @click="toggleEditButton(element)"
              class="rounded bg-red-700 p-3 hover:bg-red-600 active:bg-red-500"
            >
              <Icon
                class="-m-1 h-8 w-8 text-white"
                icon="material-symbols:close-rounded"
              />
            </button>
          </div>
        </transition>
      </li>
    </template>
  </draggable>
</template>

<style scoped>
.listTransition-enter-from,
.listTransition-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}
.listTransition-enter-active,
.listTransition-move,
.listTransition-leave-active {
  transition:
    transform 0.5s cubic-bezier(0.55, 0, 0.1, 1),
    opacity 0.5s cubic-bezier(0.55, 0, 0.1, 1);
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

.ghost div {
  opacity: 0.8;
  background: hsl(36, 66%, 58.4%);
}
</style>
