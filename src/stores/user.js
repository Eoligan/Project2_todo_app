import { ref } from "vue"
import { defineStore } from "pinia"
import supabase from "@/lib/supabase"
import { useRouter } from "vue-router"

export const useUserStore = defineStore("userStore", () => {
  const user = ref()
  const router = useRouter()

  const createNewUser = async (email, password, name) => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          name: name,
        },
      },
    })
    if (error) console.log("Error: ", error)
    else {
      user.value = data
    }
  }

  const getName = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    let nameMetadata = user.user_metadata.name
    console.log("in user: ", nameMetadata)
    return nameMetadata
  }

  const handleLogin = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      })
      if (error) {
        // console.log("Error: ", error)
        throw error
      } else {
        user.value = data
        router.push("dashboard")
      }
      // alert("Check your email for the login link!")
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    }
  }

  return { user, createNewUser, handleLogin, getName }
})
