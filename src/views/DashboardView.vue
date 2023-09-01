<script setup async>
import NavBar from "@/components/NavBar.vue"
import TasksView from "./TasksView.vue"
</script>

<template>
  <header
    class="border-b border-secondary bg-slate-50 pb-8 pt-8 shadow-xl shadow-black/10"
  >
    <NavBar></NavBar>
  </header>
  <main
    class="mx-auto my-8 max-w-3xl flex-col items-center justify-between p-4"
  >
    <TasksView></TasksView>
  </main>
</template>
