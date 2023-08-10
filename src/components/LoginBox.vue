<script setup>
import { useUserStore } from "@/stores/user"
import { ref } from "vue"

const userStore = useUserStore()

const email = ref("")
const password = ref("")
</script>

<template>
  <section class="grid place-items-center">
    <form
      @submit.prevent="userStore.handleLogin(email, password)"
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
          v-model="email"
        />
        <input
          placeholder=" Password"
          class="my-2 border-b-2 border-slate-800 bg-slate-300 pb-1 placeholder:text-slate-800"
          id="pass"
          name="pass"
          type="password"
          v-model="password"
          autocomplete="current-password"
        />

        <button
          type="submit"
          class="mt-3 rounded-md bg-brand font-bold text-white"
        >
          Login
        </button>
        <RouterLink to="register" class="mt-3 text-xs text-amber-600">
          Don't have an account? Sign Up!
        </RouterLink>
      </div>
    </form>
  </section>
</template>
