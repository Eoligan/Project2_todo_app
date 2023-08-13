import { ref } from "vue"
import { defineStore } from "pinia"
import supabase from "@/lib/supabase"

export const useTaskStore = defineStore("taskStore", () => {
  const tasks = ref([])

  const fetchTasks = async () => {
    const { data, error } = await supabase.from("tasks").select()

    if (error) console.log("Error: ", error)
    else {
      tasks.value = data
    }
  }

  const addTask = async (user_id, title) => {
    const newTask = { user_id: user_id, title: title, is_completed: false }
    tasks.value.push(newTask)

    const { data, error } = await supabase
      .from("tasks")
      .insert(newTask)
      .select()

    if (error) {
      console.log("Error: ", error)
      tasks.value.pop()
      return false
    }

    // Replace the added task with the response from the database
    tasks.value.splice(tasks.value.indexOf(newTask), 1, data[0])
    return true
  }

  const deleteTask = async (id) => {
    const filterValue = tasks.value.filter((task) => task.id !== id)
    tasks.value = filterValue

    const { error } = await supabase.from("tasks").delete().eq("id", id)

    if (error) {
      console.log("Error: ", error)
      tasks.value.push(filterValue)
    }
  }

  const editTask = async (id, title) => {
    const { data, error } = await supabase
      .from("tasks")
      .update({ title: title })
      .eq("id", id)
      .select()

    if (error) console.log("Error: ", error)
    else {
      const index = tasks.value.findIndex((task) => task.id === id)
      if (index !== -1) {
        tasks.value[index].title = title
      }

      return true
    }
  }

  const completedTask = async (id, completed) => {
    const index = tasks.value.findIndex((task) => task.id === id)
    if (index !== -1) {
      tasks.value[index].is_completed = !tasks.value[index].is_completed
    }

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

  return { tasks, fetchTasks, addTask, deleteTask, editTask, completedTask }
})
