import { ref } from "vue"
import { defineStore } from "pinia"
import supabase from "@/lib/supabase"

export const useCardStore = defineStore("cardStore", () => {
  const cards = ref([])

  const fetchCards = async () => {
    const { data, error } = await supabase.from("cards").select()

    if (error) console.log("Error: ", error)
    else {
      cards.value = data
    }
  }

  const addCard = async (user_id, title) => {
    const newCard = {
      user_id: user_id,
      title: title,
    }

    const { data, error } = await supabase
      .from("cards")
      .insert(newCard)
      .select()

    if (error) {
      console.log("Error: ", error.message)
      return false
    }

    cards.value.push(data[0])
    return true
  }

  const deleteCard = async (id) => {
    const removedIndex = cards.value.findIndex((card) => card.id === id)
    const removedTask = tasks.value.splice(removedIndex, 1)[0]

    const { error } = await supabase.from("cards").delete().eq("id", id)

    if (error) {
      console.log("Error: ", error)
      cards.value.splice(removedIndex, 0, removedTask)
    }
  }

  //   const editTask = async (id, title) => {
  //     const index = tasks.value.findIndex((task) => task.id === id)
  //     let previousTitle = ""

  //     previousTitle = tasks.value[index].title
  //     tasks.value[index].title = title

  //     const { error } = await supabase
  //       .from("tasks")
  //       .update({ title: title })
  //       .eq("id", id)

  //     if (error) {
  //       console.log("Error: ", error)
  //       tasks.value[index].title = previousTitle
  //       return false
  //     }

  //     return true
  //   }

  //   const completedTask = async (id, completed) => {
  //     const index = tasks.value.findIndex((task) => task.id === id)

  //     tasks.value[index].is_completed = !tasks.value[index].is_completed

  //     const { data, error } = await supabase
  //       .from("tasks")
  //       .update({ is_completed: !completed })
  //       .eq("id", id)
  //       .select()

  //     if (error) {
  //       console.log("Error: ", error)
  //       tasks.value[index].is_completed = !tasks.value[index].is_completed
  //     }
  //   }

  //   const updateTasksIndex = async (updatedTasks) => {
  //     for (const task of updatedTasks) {
  //       const { error } = await supabase
  //         .from("tasks")
  //         .update({ index: task.index })
  //         .eq("id", task.id)

  //       if (error) {
  //         console.log("Error updating task with ID", task.id, ":", error)
  //         return false
  //       }
  //     }

  //     return true
  //   }

  return {
    cards,
    fetchCards,
    addCard,
    deleteCard,
  }
})
