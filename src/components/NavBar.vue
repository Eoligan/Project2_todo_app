<script setup>
import ProfileUser from "@/components/ProfileUser.vue"
</script>

<template>
  <nav class="mx-auto flex max-w-6xl items-center justify-between">
    <RouterLink :to="{ name: 'dashboard' }">
      <img
        class="mx-4 w-32 sm:mx-8"
        src="../assets/logo/default-monochrome.svg"
        alt=""
      />
    </RouterLink>
    <Suspense>
      <ProfileUser></ProfileUser>
    </Suspense>
  </nav>
</template>
