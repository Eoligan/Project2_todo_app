import { ref } from "vue"
import { defineStore } from "pinia"
import supabase from "@/lib/supabase"

export const useUserStore = defineStore("userStore", () => {
  const user = ref()

  const createNewUser = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      // options: {
      //   data: {
      //     name: name,
      //   },
      // },
    })
    if (error) console.log("Error: ", error)
    else {
      console.log("Data: ", data)
      user.value = data
    }
  }

  const handleLogin = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      })
      if (error) {
        console.log("Error: ", error)
        // throw error
      } else {
        console.log("Data: ", data)
      }
      // alert("Check your email for the login link!")
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    }
  }

  return { user, createNewUser, handleLogin }
})
