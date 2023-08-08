<script setup>
import { useUserStore } from "@/stores/user"
import { useTaskStore } from "@/stores/task"
import { ref } from "vue"

const userStore = useUserStore()
const taskStore = useTaskStore()

const email = ref("")
const password = ref("")

// const handleLogin = async () => {
//   try {
//     const { data, error } = await supabase.auth.signInWithPassword({
//       email: form.email,
//       password: form.password,
//     })
//     if (error) throw error
//     alert("Check your email for the login link!")
//   } catch (error) {
//     if (error instanceof Error) {
//       alert(error.message)
//     }
//   }
// }
</script>

<template>
  <!-- <section class="grid place-items-center">
    <form
      @submit.prevent="handleLogin"
      class="rounded-md bg-slate-300 px-8 pb-8 pt-4"
    >
      <h2 class="m-4 text-center text-xl font-bold">Login</h2>
      <div class="flex flex-col">
       
        <input
          placeholder=" Email"
          class="my-2 border-b-2 border-slate-800 bg-slate-300 pb-1 placeholder:text-slate-800"
          id="email"
          name="email"
          type="text"
          v-model="form.email"
        />
        <input
          placeholder=" Password"
          class="my-2 border-b-2 border-slate-800 bg-slate-300 pb-1 placeholder:text-slate-800"
          id="pass"
          name="pass"
          type="password"
          v-model="form.password"
        />

        <button class="mt-3 rounded-md bg-brand font-bold text-white">
          Login
        </button>
        <a class="mt-3 text-xs text-amber-600"
          >Don't have an account? Sign up</a
        >
      </div>
    </form>
  </section> -->
  <input placeholder="email..." v-model="email" />
  <input placeholder="password..." v-model="password" />
  <button @click="userStore.createNewUser(email, password)">
    Create new user
  </button>

  <br /><br />
  <button @click="taskStore.fetchTasks">fetch</button>
  <ul>
    <li v-for="task in taskStore.tasks">
      {{ task.title }}
    </li>
  </ul>
</template>
