<script setup async>
import NavBar from "@/components/NavBar.vue"
</script>

<template>
  <header
    class="border-b border-secondary bg-slate-50 pb-8 pt-8 shadow-xl shadow-black/10"
  >
    <NavBar></NavBar>
  </header>
  <main
    class="mx-auto mb-8 max-w-3xl flex-col items-center justify-between mt-16"
  >
    <RouterView></RouterView>
  </main>
</template>
