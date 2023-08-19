<script setup>
import ProfileUser from "@/components/ProfileUser.vue"
</script>

<template>
  <nav class="mx-auto flex max-w-6xl items-center justify-between">
    <img class="w-32" src="../assets/logo/default-monochrome.svg" alt="" />
    <Suspense>
      <ProfileUser></ProfileUser>
    </Suspense>
  </nav>
</template>
