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
      // console.log("tasks: ", tasks.value)
    }
  }

  const addTask = async (user_id, title) => {
    const { data, error } = await supabase
      .from("tasks")
      .insert({ user_id: user_id, title: title, is_completed: false })
      .select()

    if (error) console.log("Error: ", error)
    else {
      tasks.value.push(data[0])

      return true
    }
  }

  const deleteTask = async (id) => {
    const { error } = await supabase.from("tasks").delete().eq("id", id)

    if (error) console.log("Error: ", error)
    else {
      tasks.value = tasks.value.filter((task) => task.id !== id)

      return true
    }
  }

  return { tasks, fetchTasks, addTask, deleteTask }
})
