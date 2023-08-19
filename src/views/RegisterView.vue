<script setup>
import { useUserStore } from "@/stores/user"
import { ref } from "vue"

const userStore = useUserStore()

const name = ref("")
const email = ref("")
const password = ref("")
</script>

<template>
  <div
    class="absolute -top-4 -z-10 h-[calc(100vh-14rem)] w-full opacity-30 grayscale filter"
  >
    <img
      class="h-full w-full object-cover"
      src="../assets/logo/background.jpg"
    />
  </div>
  <section class="grid place-items-center">
    <form
      @submit.prevent="userStore.createNewUser(email, password, name)"
      class="h-full w-72 rounded-md border bg-slate-50 px-8 pb-8 pt-4 shadow-2xl sm:w-96 sm:px-10 lg:w-[32rem] lg:px-14 lg:py-10"
    >
      <h2
        class="mt-2 px-4 text-center text-3xl font-bold tracking-widest text-secondary sm:mb-8"
      >
        Sign Up
      </h2>
      <div class="flex flex-col gap-6">
        <div class="peer relative flex flex-col">
          <input
            placeholder="Name"
            class="peer rounded border-none bg-slate-50 py-4 pl-4 tracking-wider placeholder-transparent ring-2 ring-slate-400 hover:rounded hover:border-b-transparent hover:ring-2 hover:ring-slate-600 focus:rounded focus:border-b-transparent focus:outline-none focus:ring-2 focus:ring-brand"
            id="name"
            name="name"
            type="text"
            v-model="name"
          />
          <label
            for="name"
            class="absolute -top-4 left-2 bg-slate-50 p-0.5 text-sm tracking-wider text-slate-400 transition-all peer-placeholder-shown:left-3.5 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-focus:-top-4 peer-focus:left-2 peer-focus:bg-slate-50 peer-focus:p-0.5 peer-focus:text-sm peer-focus:text-brand"
            >Name</label
          >
        </div>

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
          class="mt-6 w-64 self-center rounded-md bg-brand-200 p-4 uppercase tracking-wider text-white transition duration-200 ease-out hover:bg-brand"
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
  </section>
</template>
