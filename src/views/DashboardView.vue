<script setup async>
import TasksLists from "@/components/TasksLists.vue"
import NavBar from "@/components/NavBar.vue"
</script>

<template>
  <header class="border-b border-secondary bg-slate-50 pb-8 pt-8 shadow-xl shadow-black/10">
    <NavBar></NavBar>
  </header>
  <main class="mx-auto p-4 my-8 max-w-3xl flex-col items-center justify-between">
    <TasksLists></TasksLists>
  </main>
</template>
