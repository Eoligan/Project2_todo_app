<script setup>
import { useUserStore } from "@/stores/user"
import { useTaskStore } from "@/stores/task"
import { ref } from "vue"

const userStore = useUserStore()
const taskStore = useTaskStore()

const name = ref("")
const email = ref("")
const password = ref("")
</script>

<template>
  <section class="grid place-items-center">
    <form
      @submit.prevent="userStore.createNewUser(email, password, name)"
      class="rounded-md bg-slate-300 px-8 pb-8 pt-4"
    >
      <h2 class="m-4 text-center text-xl font-bold">Register</h2>
      <div class="flex flex-col">
        <input
          placeholder=" Name"
          class="my-2 border-b-2 border-slate-800 bg-slate-300 pb-1 placeholder:text-slate-800"
          id="name"
          name="name"
          type="text"
          v-model="name"
        />
        <input
          placeholder=" Email"
          class="my-2 border-b-2 border-slate-800 bg-slate-300 pb-1 placeholder:text-slate-800"
          id="email"
          name="email"
          type="email"
          v-model="email"
        />
        <input
          placeholder=" Password"
          class="my-2 border-b-2 border-slate-800 bg-slate-300 pb-1 placeholder:text-slate-800"
          id="pass"
          name="pass"
          type="password"
          v-model="password"
          autocomplete="new-password"
        />

        <button class="mt-3 rounded-md bg-brand font-bold text-white">
          Register
        </button>
        <RouterLink to="login" class="mt-3 text-xs text-amber-600">
          Already have an account? Sign In!
        </RouterLink>
      </div>
    </form>
  </section>
  <!-- <input placeholder="email..." v-model="email" />
  <input placeholder="password..." v-model="password" />
  <button @click="userStore.createNewUser(email, password)">
    Create new user
  </button> -->

  <!-- <br /><br />
  <button @click="taskStore.fetchTasks">fetch</button>
  <ul>
    <li v-for="task in taskStore.tasks">
      {{ task.title }}
    </li>
  </ul> -->
</template>
