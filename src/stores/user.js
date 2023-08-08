import { ref } from "vue"
import { defineStore } from "pinia"
import supabase from "@/lib/supabase"

export const useUserStore = defineStore("userStore", () => {
  const user = ref()

  const createNewUser = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) console.log("Error: ", error)
    else {
      "Data: ", console.log(data)
      user.value = data
    }
  }
  return { user, createNewUser }
})
