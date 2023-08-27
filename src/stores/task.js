import { ref } from "vue"
import { defineStore } from "pinia"
import supabase from "@/lib/supabase"

export const useTaskStore = defineStore("taskStore", () => {
  const tasks = ref([])

  const fetchTasks = async () => {
    const { data, error } = await supabase.from("tasks").select()

    if (error) console.log("Error: ", error)
    else {
      tasks.value = data.sort((a, b) => a.index - b.index)
    }
  }

  const addTask = async (user_id, title) => {
    let index = 0
    if (tasks.value[tasks.value.length - 1]) {
      index = tasks.value[tasks.value.length - 1].index
      index++
    }

    const newTask = {
      user_id: user_id,
      title: title,
      is_completed: false,
      index: index,
    }

    const { data, error } = await supabase
      .from("tasks")
      .insert(newTask)
      .select()

    if (error) {
      console.log("Error: ", error.message)
      return false
    }

    tasks.value.push(data[0])
    return true
  }

  const deleteTask = async (id) => {
    const removedIndex = tasks.value.findIndex((task) => task.id === id)
    const removedTask = tasks.value.splice(removedIndex, 1)[0]

    const { error } = await supabase.from("tasks").delete().eq("id", id)

    if (error) {
      console.log("Error: ", error)
      tasks.value.splice(removedIndex, 0, removedTask)
    }
  }

  const editTask = async (id, title) => {
    const index = tasks.value.findIndex((task) => task.id === id)
    let previousTitle = ""

    previousTitle = tasks.value[index].title
    tasks.value[index].title = title

    const { error } = await supabase
      .from("tasks")
      .update({ title: title })
      .eq("id", id)

    if (error) {
      console.log("Error: ", error)
      tasks.value[index].title = previousTitle
      return false
    }

    return true
  }

  const completedTask = async (id, completed) => {
    const index = tasks.value.findIndex((task) => task.id === id)

    tasks.value[index].is_completed = !tasks.value[index].is_completed

    const { data, error } = await supabase
      .from("tasks")
      .update({ is_completed: !completed })
      .eq("id", id)
      .select()

    if (error) {
      console.log("Error: ", error)
      tasks.value[index].is_completed = !tasks.value[index].is_completed
    }
  }

  const updateTasksIndex = async (updatedTasks) => {
    for (const task of updatedTasks) {
      const { error } = await supabase
        .from("tasks")
        .update({ index: task.index })
        .eq("id", task.id)

      if (error) {
        console.log("Error updating task with ID", task.id, ":", error)
        return false
      }
    }

    return true
  }

  return {
    tasks,
    fetchTasks,
    addTask,
    deleteTask,
    editTask,
    completedTask,
    updateTasksIndex,
  }
})
