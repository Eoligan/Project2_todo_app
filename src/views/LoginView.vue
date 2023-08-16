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
      class="h-full w-72 rounded-md bg-slate-50 px-8 pb-8 pt-4 shadow sm:w-96 sm:px-10 lg:w-[32rem] lg:px-14 lg:py-10"
    >
      <h2
        class="mt-2 px-4 text-center text-3xl font-bold tracking-widest sm:mb-8"
      >
        Login
      </h2>
      <div class="peer flex flex-col gap-6">
        <input
          placeholder="Email"
          class="text-aver border-x-0 border-b-2 border-t-0 border-slate-400 bg-slate-50 py-4 pl-4 tracking-wider placeholder:font-normal placeholder:text-slate-400 hover:rounded hover:border-b-transparent hover:ring-2 hover:ring-slate-600 placeholder:hover:text-slate-600 focus:rounded focus:border-b-transparent focus:outline-none focus:ring-2 focus:ring-brand"
          id="email"
          name="email"
          type="text"
          v-model="email"
        />
        <input
          placeholder="Password"
          class="text-aver border-x-0 border-b-2 border-t-0 border-slate-400 bg-slate-50 py-4 pl-4 tracking-wider placeholder:font-normal placeholder:text-slate-400 hover:rounded hover:border-b-transparent hover:ring-2 hover:ring-slate-600 placeholder:hover:text-slate-600 focus:rounded focus:border-b-transparent focus:outline-none focus:ring-2 focus:ring-brand"
          id="pass"
          name="pass"
          type="password"
          v-model="password"
          autocomplete="current-password"
        />

        <button
          type="submit"
          class="mt-6 w-64 self-center rounded-md bg-brand-200 p-4 text-white transition duration-200 ease-out hover:bg-brand"
        >
          Login
        </button>
        <RouterLink
          to="register"
          class="self-center text-base text-brand-200 hover:text-brand hover:underline hover:decoration-2 hover:underline-offset-[5px]"
        >
          Don't have an account? Sign Up!
        </RouterLink>
      </div>
    </form>
  </section>
</template>
