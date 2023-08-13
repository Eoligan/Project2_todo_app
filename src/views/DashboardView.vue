<script setup async>
import ProfileUser from "@/components/ProfileUser.vue"
import TasksLists from "../components/TasksLists.vue"
</script>

<template>
  <header class="mt-8 border-b border-secondary pb-8">
    <nav class="mx-auto flex max-w-6xl items-center justify-between">
      Logo title
      <Suspense>
        <ProfileUser></ProfileUser>
      </Suspense>
    </nav>
  </header>
  <main class="m-4 mx-auto max-w-6xl flex-col items-center justify-between">
    <TasksLists></TasksLists>
  </main>
</template>
