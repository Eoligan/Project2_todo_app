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
      class="rounded-md shadow bg-slate-50 w-72 h-full sm:w-96 sm:px-10 lg:w-[32rem] lg:px-14 lg:py-10 px-8 pb-8 pt-4"
    >
      <h2 class="mb-8 mt-2 text-center p-4 text-3xl font-bold">Login</h2>
      <div class="flex flex-col">
        <input
          placeholder="Email"
          class="my-2 border-b-2 pl-4 py-4 placeholder:-translate-y-1.5 placeholder:text-slate-400 placeholder:font-bold  border-slate-400 bg-slate-50 pb-1 "
          id="email"
          name="email"
          type="text"
          v-model="email"
        />
        <input
          placeholder="Password"
          class="my-2 border-b-2 pl-4 py-4 placeholder:-translate-y-1.5  placeholder:text-slate-400  placeholder:font-bold border-slate-400 bg-slate-50 pb-1"
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
