import { ref } from "vue"
import { defineStore } from "pinia"
import supabase from "@/lib/supabase"
import { useRouter } from "vue-router"

export const useUserStore = defineStore(
  "userStore",
  () => {
    const user = ref(null)
    const router = useRouter()

    const createNewUser = async (email, password, name) => {
      const { error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            user_name: name,
          },
        },
      })
      if (error) {
        console.log("Error: ", error)
        throw error
      } else {
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
          throw error
        } else {
          router.push("dashboard")
        }
      } catch (error) {
        console.log("Error: ", error)

        return error.message
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

    const signInWithGitHub = async () => {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "github",
      })

      if (error) {
        console.log("Error: ", error)
      }
    }

    supabase.auth.onAuthStateChange((event, session) => {
      const userdata = session?.user || null

      user.value = userdata
    })

    return {
      user,
      createNewUser,
      handleLogin,
      handleSignOut,
      signInWithGitHub,
    }
  },
  {
    persist: {
      enabled: true,
    },
  }
)
