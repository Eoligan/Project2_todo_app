<script setup>
import { useTaskStore } from "@/stores/task"
import { onMounted, computed, nextTick, ref } from "vue"
import { Icon } from "@iconify/vue"
import draggable from "zhyswan-vuedraggable"
import { useRoute } from "vue-router"

const taskStore = useTaskStore()
const editMode = ref(null)
let taskTitle = ref("")

const isTasksEmpty = computed(() => {
  return taskStore.tasks.length > 0 ? false : true
})

const isLoading = ref(true)

const route = useRoute()

onMounted(async () => {
  try {
    await taskStore.fetchTasks(route.params.id)
    editMode.value = Array(taskStore.tasks.length).fill(false)
    isLoading.value = false
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
  <div
    v-if="isLoading"
    class="flex flex-col items-center justify-center font-sans-serif text-xl"
  >
    <Icon class="h-12 w-12 text-brand" icon="eos-icons:loading" />
    <p class="font-sans-serif font-bold">Loading</p>
  </div>
  <div
    v-else-if="!isTasksEmpty"
    class="flex w-full items-center justify-center"
  >
    <draggable
      class="relative w-full"
      v-model="taskStore.tasks"
      item-key="id"
      :component-data="{
        tag: 'ul',
        name: 'listTransition',
        type: 'transition-group',
        appear: true,
      }"
      :delay="200"
      :delay-on-touch-only="true"
      animation="200"
      ghost-class="ghost"
      tag="transition-group"
      @start="drag = true"
      @end="drag = false"
      @change="updateTasksIndex"
    >
      <template #item="{ element }" :key="element.id">
        <li class="group mb-4 flex w-full font-sans-serif">
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
                'bg-stone-200 text-stone-400/70 line-through hover:text-stone-400':
                  element.is_completed,
                'bg-brand-100/20 shadow hover:shadow-md': !element.is_completed,
              }"
              class="group flex flex-1 cursor-pointer items-center justify-between break-all rounded"
            >
              <input
                type="checkbox"
                name="is_completed"
                class="m-3 mx-2 h-6 w-6 cursor-pointer rounded-sm border-brand text-brand focus:ring-brand group-hover:bg-brand-100/30 group-hover:text-brand-300 checked:group-hover:bg-current"
                :checked="element.is_completed"
              />
              <label class="grow cursor-pointer px-2 py-3">
                {{ element.title }}
              </label>
              <button @click.stop="toggleEditButton(element)" class="relative">
                <Icon
                  width="1.5rem"
                  height="1.5rem"
                  icon="material-symbols:edit"
                  class="z-10 mr-2 text-yellow-500 hover:!text-yellow-400 group-hover:text-yellow-500 lg:text-transparent"
                />
              </button>
              <button
                @click.stop="taskStore.deleteTask(element.id)"
                class="relative"
              >
                <Icon
                  class="z-10 mr-2 h-6 w-6 text-red-700 hover:!text-red-600 group-hover:text-red-700 lg:text-transparent"
                  icon="material-symbols:delete"
                />
              </button>
            </div>

            <div
              class="focus: flex flex-1 items-center justify-between rounded ring-1 ring-black"
              v-else
            >
              <input
                class="flex-1 rounded border-none p-3 focus:ring-0"
                id="editInput"
                v-model="taskTitle"
                type="text"
                @keydown.enter="editTask(element.id, taskTitle)"
                @keydown.esc="toggleEditButton(element)"
              />
              <button
                @click="editTask(element.id, taskTitle)"
                class="mr-2 rounded bg-green-700 hover:bg-green-600 active:bg-green-500"
              >
                <Icon
                  class="-m-1 h-8 w-8 text-white"
                  icon="material-symbols:done-rounded"
                />
              </button>
              <button
                @click="toggleEditButton(element)"
                class="mr-2 rounded bg-red-700 hover:bg-red-600 active:bg-red-500"
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
  </div>
  <div v-else id="newTask" class="mt-4 font-sans-serif text-xl">
    Tasks list is empty!
    <span class="font-bold"> Add a new task </span>
    to start
  </div>
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
  background: hsl(36, 74%, 67%);
  text-decoration: none;
  color: white;
  border: 2px solid black;
}
</style>
