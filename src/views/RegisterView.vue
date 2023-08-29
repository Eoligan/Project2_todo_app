<script setup>
import { useUserStore } from "@/stores/user"
import { ref } from "vue"

const userStore = useUserStore()

const name = ref("")
const email = ref("")
const password = ref("")
</script>

<template>
  <section class="flex grow items-center justify-center">
    <div
      class="w-80 rounded-md border bg-slate-50 px-8 pb-8 pt-4 shadow-2xl sm:w-[30rem] sm:px-10 lg:w-[30rem] lg:py-10"
    >
      <form @submit.prevent="userStore.createNewUser(email, password, name)">
        <h2
          class="mb-8 mt-2 text-center text-lg font-bold tracking-wide text-secondary sm:mb-10 md:text-2xl lg:mb-12"
        >
          Sign Up
        </h2>
        <div class="flex flex-col gap-6">
          <div class="peer relative flex flex-col">
            <input
              placeholder="Name"
              class="peer rounded border-none bg-slate-50 py-2 pl-2 tracking-wider placeholder-transparent ring-2 ring-slate-400 hover:rounded hover:border-b-transparent hover:ring-2 hover:ring-slate-600 focus:rounded focus:border-b-transparent focus:outline-none focus:ring-2 focus:ring-brand sm:py-4 sm:pl-4"
              id="name"
              name="name"
              type="text"
              v-model="name"
            />
            <label
              for="name"
              class="absolute -top-4 left-2 bg-slate-50 p-0.5 text-sm tracking-wider text-slate-400 transition-all peer-placeholder-shown:left-3.5 peer-placeholder-shown:top-1.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-focus:-top-4 peer-focus:left-2 peer-focus:bg-slate-50 peer-focus:p-0.5 peer-focus:text-sm peer-focus:text-brand sm:peer-placeholder-shown:top-3.5 sm:peer-focus:-top-4 sm:peer-focus:left-2"
              >Name</label
            >
          </div>

          <div class="peer relative flex flex-col">
            <input
              placeholder="Email"
              class="peer rounded border-none bg-slate-50 py-2 pl-2 tracking-wider placeholder-transparent ring-2 ring-slate-400 hover:rounded hover:border-b-transparent hover:ring-2 hover:ring-slate-600 focus:rounded focus:border-b-transparent focus:outline-none focus:ring-2 focus:ring-brand sm:py-4 sm:pl-4"
              id="email"
              name="email"
              type="text"
              v-model="email"
            />
            <label
              for="email"
              class="absolute -top-4 left-2 bg-slate-50 p-0.5 text-sm tracking-wider text-slate-400 transition-all peer-placeholder-shown:left-3.5 peer-placeholder-shown:top-1.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-focus:-top-4 peer-focus:left-2 peer-focus:bg-slate-50 peer-focus:p-0.5 peer-focus:text-sm peer-focus:text-brand sm:peer-placeholder-shown:top-3.5 sm:peer-focus:-top-4 sm:peer-focus:left-2"
              >Email</label
            >
          </div>
          <div class="peer relative flex flex-col">
            <input
              placeholder="Password"
              class="peer rounded border-none bg-slate-50 py-2 pl-2 tracking-wider placeholder-transparent ring-2 ring-slate-400 hover:rounded hover:border-b-transparent hover:ring-2 hover:ring-slate-600 focus:rounded focus:border-b-transparent focus:outline-none focus:ring-2 focus:ring-brand sm:py-4 sm:pl-4"
              id="pass"
              name="pass"
              type="password"
              v-model="password"
              autocomplete="current-password"
            />
            <label
              for="pass"
              class="absolute -top-4 left-2 bg-slate-50 p-0.5 text-sm tracking-wider text-slate-400 transition-all peer-placeholder-shown:left-3.5 peer-placeholder-shown:top-1.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-focus:-top-4 peer-focus:left-2 peer-focus:bg-slate-50 peer-focus:p-0.5 peer-focus:text-sm peer-focus:text-brand sm:peer-placeholder-shown:top-3.5 sm:peer-focus:-top-4 sm:peer-focus:left-2"
              >Password</label
            >
          </div>

          <button
            class="group relative mt-6 flex h-8 w-full items-center justify-center self-center rounded-md bg-brand-200 p-4 uppercase tracking-wider text-white ring-2 ring-brand-200 transition duration-200 ease-out hover:bg-brand hover:ring-brand"
          >
            Sign Up
          </button>
          <RouterLink
            to="login"
            class="self-center text-base text-brand-200 hover:text-brand hover:underline hover:decoration-2 hover:underline-offset-[5px]"
          >
            Already have an account? Sign In!
          </RouterLink>
        </div>
      </form>
    </div>
  </section>
</template>
