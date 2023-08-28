<script setup>
import { useUserStore } from "@/stores/user"
import { ref } from "vue"
import { Icon } from "@iconify/vue"

const userStore = useUserStore()

const email = ref("")
const password = ref("")
</script>

<template>
  <section class="flex items-center justify-center">
    <div
      class="h-full w-72 rounded-md border bg-slate-50 px-8 pb-8 pt-4 shadow-2xl sm:w-96 sm:px-10 lg:w-[32rem] lg:px-14 lg:py-10"
    >
      <form @submit.prevent="userStore.handleLogin(email, password)">
        <h2
          class="mt-2 pb-2 text-center text-2xl font-bold tracking-wide text-secondary sm:mb-8"
        >
          Sign in to your account
        </h2>
        <div class="flex flex-col gap-6">
          <div class="peer relative flex flex-col">
            <input
              placeholder="Email"
              class="peer rounded border-none bg-slate-50 py-4 pl-4 tracking-wider placeholder-transparent ring-2 ring-slate-400 hover:rounded hover:border-b-transparent hover:ring-2 hover:ring-slate-600 focus:rounded focus:border-b-transparent focus:outline-none focus:ring-2 focus:ring-brand"
              id="email"
              name="email"
              type="text"
              v-model="email"
            />
            <label
              for="email"
              class="absolute -top-4 left-2 bg-slate-50 p-0.5 text-sm tracking-wider text-slate-400 transition-all peer-placeholder-shown:left-3.5 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-focus:-top-4 peer-focus:left-2 peer-focus:bg-slate-50 peer-focus:p-0.5 peer-focus:text-sm peer-focus:text-brand"
              >Email</label
            >
          </div>
          <div class="peer relative flex flex-col">
            <input
              placeholder="Password"
              class="peer rounded border-none bg-slate-50 py-4 pl-4 tracking-wider placeholder-transparent ring-2 ring-slate-400 hover:rounded hover:border-b-transparent hover:ring-2 hover:ring-slate-600 focus:rounded focus:border-b-transparent focus:outline-none focus:ring-2 focus:ring-brand"
              id="pass"
              name="pass"
              type="password"
              v-model="password"
              autocomplete="current-password"
            />
            <label
              for="pass"
              class="absolute -top-4 left-2 bg-slate-50 p-0.5 text-sm tracking-wider text-slate-400 transition-all peer-placeholder-shown:left-3.5 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-focus:-top-4 peer-focus:left-2 peer-focus:bg-slate-50 peer-focus:p-0.5 peer-focus:text-sm peer-focus:text-brand"
              >Password</label
            >
          </div>
          <button
            type="submit"
            class="group relative mt-6 flex w-64 items-center justify-center self-center rounded-md bg-brand-200 p-4 uppercase tracking-wider text-white transition duration-200 ease-out hover:bg-brand"
          >
            Login
            <Icon
              width="24"
              height="24"
              icon="iconamoon:arrow-up-2-bold"
              class="absolute right-20 rotate-90 transition-colors duration-200 ease-out group-hover:text-secondary"
            />
          </button>
          <RouterLink
            to="register"
            class="self-center text-base text-brand-200 hover:text-brand hover:underline hover:decoration-2 hover:underline-offset-[5px]"
          >
            Don't have an account? Sign Up!
          </RouterLink>
        </div>
      </form>
      <div class="mt-5 grid gap-2">
        <p class="text-center text-sm">Or continue with</p>
        <button
          class="mx-auto flex items-center gap-2 rounded bg-[#171515]/20 p-2 text-sm font-bold text-[#171515] hover:bg-[#171515]/10"
          @click="userStore.signInWithGitHub()"
        >
          <Icon
            width="1.2rem"
            height="1.2rem"
            class=""
            icon="akar-icons:github-fill"
          />
          GitHub
        </button>
      </div>
    </div>
  </section>
</template>
