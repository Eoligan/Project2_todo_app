import { ref } from "vue"
import { defineStore } from "pinia"
import supabase from "@/lib/supabase"
import { useRouter } from "vue-router"

export const useUserStore = defineStore(
  "userStore",
  () => {
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
      if (error) {
        console.log("Error: ", error)
        throw error
      } else {
        user.value = data
        router.push("dashboard")
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

    const handleSignOut = async () => {
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.log("Error: ", error)
        throw error
      } else {
        router.push("/login")
      }
    }

    return { user, createNewUser, handleLogin, handleSignOut }
  },
  {
    persist: {
      enabled: true,
    },
  }
)
